<template>
  <div class="card">
    <DataTable
      :value="arrayOfKpiDataObjects"
      rowGroupMode="subheader"
      groupRowsBy="subcategoryKey"
      dataKey="subcategoryKey"
      :sortField="sortBySubcategoryKey ? 'subcategoryKey' : undefined"
      :sortOrder="sortBySubcategoryKey ? 1 : undefined"
      sortMode="single"
      :expandableRowGroups="true"
      :headerInputStyle="headerInputStyle"
      v-model:expandedRowGroups="expandedRowGroups"
    >
      <Column
        bodyClass="headers-bg"
        headerClass="horizontal-headers-size"
        :headerStyle="headerInputStyle"
        field="kpiKey"
        header="KPIs"
      >
        <template #body="slotProps">
          <span class="table-left-label" :data-test="slotProps.data.kpiKey">{{ slotProps.data.kpiLabel }}</span>
          <em
            v-if="slotProps.data.kpiDescription"
            class="material-icons info-icon"
            aria-hidden="true"
            :title="slotProps.data.kpiLabel ? slotProps.data.kpiLabel : ''"
            v-tooltip.top="{
              value: slotProps.data.kpiDescription ? slotProps.data.kpiDescription : '',
            }"
            >info</em
          >
        </template>
      </Column>
      <Column
        v-for="reportingPeriodWithDataId of listOfReportingPeriodsWithDataId"
        headerClass="horizontal-headers-size"
        :headerStyle="headerInputStyle"
        :field="reportingPeriodWithDataId.dataId"
        :header="reportingPeriodWithDataId.reportingPeriod"
        :key="reportingPeriodWithDataId.dataId"
      >
        <template #body="slotProps">
          <template
            v-if="
              slotProps.data.content[reportingPeriodWithDataId.dataId] !== undefined &&
              slotProps.data.content[reportingPeriodWithDataId.dataId] !== null
            "
          >
            <span
              :data-test="`${reportingPeriodWithDataId.reportingPeriod}_${slotProps.data.categoryKey}_${slotProps.data.kpiKey}`"
            >
              <template
                v-if="
                  slotProps.data.content[reportingPeriodWithDataId.dataId] &&
                  isModal(slotProps.data.kpiFormFieldComponent)
                "
              >
                <ModalsComponent
                  :component-name="slotProps.data.kpiFormFieldComponent"
                  :data="{
                    dataId: reportingPeriodWithDataId.dataId,
                    ...slotProps.data,
                    columnHeaders: modalColumnHeaders,
                  }"
                />
              </template>

              <template
                v-else-if="
                  Array.isArray(slotProps.data.content[reportingPeriodWithDataId.dataId]) &&
                  slotProps.data.content[reportingPeriodWithDataId.dataId].length
                "
              >
                <ModalsComponent
                  :data="{
                    dataId: reportingPeriodWithDataId.dataId,
                    ...slotProps.data,
                    columnHeaders: modalColumnHeaders,
                  }"
                />
              </template>
              <span
                v-else-if="
                  slotProps.data.kpiFormFieldComponent === 'PercentageFormField' &&
                  slotProps.data.content[reportingPeriodWithDataId.dataId] !== ''
                "
              >
                {{ slotProps.data.content[reportingPeriodWithDataId.dataId] }}</span
              >
              <span
                v-else-if="
                  typeof slotProps.data.content[reportingPeriodWithDataId.dataId] === 'object' &&
                  slotProps.data.content[reportingPeriodWithDataId.dataId]?.value !== undefined
                "
              >
                <span
                  v-if="
                    isYesNo(slotProps.data.content[reportingPeriodWithDataId.dataId].value) &&
                    hasDocument(slotProps.data.content[reportingPeriodWithDataId.dataId])
                  "
                >
                  <DocumentLink
                    :label="yesLabelMap.get(isCertificate(slotProps.data.kpiLabel))"
                    :download-name="slotProps.data.content[reportingPeriodWithDataId.dataId].dataSource.name"
                    :reference="slotProps.data.content[reportingPeriodWithDataId.dataId].dataSource.reference"
                    show-icon
                  />
                </span>
                <span
                  v-else-if="
                    isYesNo(slotProps.data.content[reportingPeriodWithDataId.dataId].value) &&
                    isCertificate(slotProps.data.kpiLabel)
                  "
                >
                  {{
                    slotProps.data.content[reportingPeriodWithDataId.dataId].value === YesNo.Yes
                      ? yesLabelMap.get(true)
                      : noLabelMap.get(true)
                  }}
                </span>
                <span v-else>{{ slotProps.data.content[reportingPeriodWithDataId.dataId].value }}</span>
              </span>
              <span v-else style="white-space: pre-wrap">{{
                slotProps.data.content[reportingPeriodWithDataId.dataId]
              }}</span>
            </span>
          </template>
        </template>
      </Column>

      <Column field="subcategoryKey"></Column>
      <template #groupheader="slotProps">
        <span
          :data-test="slotProps.data.subcategoryKey"
          :data-table-id="dataTableIdentifier"
          :id="slotProps.data.subcategoryKey"
          data-row-header-click
          style="cursor: pointer"
        >
          {{ slotProps.data.subcategoryLabel ? slotProps.data.subcategoryLabel : slotProps.data.subcategoryKey }}
        </span>
      </template>
    </DataTable>
  </div>
</template>

<script lang="ts">
import DocumentLink from "@/components/resources/frameworkDataSearch/DocumentLink.vue";
import { type KpiDataObject } from "@/components/resources/frameworkDataSearch/KpiDataObject";
import {
  type ReportingPeriodOfDataSetWithId,
  mountRowHeaderClickEventListeners,
  unmountRowHeaderClickEventListeners,
} from "@/utils/DataTableDisplay";
import { type BaseDataPointYesNo, YesNo } from "@clients/backend";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import Tooltip from "primevue/tooltip";
import { defineComponent, type PropType } from "vue";
import ModalsComponent, { isModal } from "@/components/general/ModalsComponent.vue";

export default defineComponent({
  name: "TwoLayerDataTable",
  components: {
    DataTable,
    Column,
    DocumentLink,
    ModalsComponent,
  },
  directives: {
    tooltip: Tooltip,
  },
  data() {
    return {
      expandedRowGroups: ["_masterData", "_general", "_basicInformation"],
      yesLabelMap: new Map<boolean, string>([
        [true, "Certified"],
        [false, "Yes"],
      ]),
      noLabelMap: new Map<boolean, string>([
        [true, "Uncertified"],
        [false, "No"],
      ]),
      YesNo,
      rowClickHandlersMap: new Map() as Map<Element, EventListener>,
      dataTableIdentifier: "" as string,
      isModal: isModal as (componentName: string) => boolean,
    };
  },
  props: {
    arrayOfKpiDataObjects: {
      type: Array as PropType<Array<KpiDataObject>>,
      default: () => [],
    },
    headerInputStyle: {
      type: String,
    },
    listOfReportingPeriodsWithDataId: {
      type: Array as PropType<Array<ReportingPeriodOfDataSetWithId>>,
      default: () => [],
    },
    modalColumnHeaders: {
      type: Object,
      default: () => ({}),
    },
    sortBySubcategoryKey: {
      type: Boolean,
      default: true,
    },
    unfoldSubcategories: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    if (this.unfoldSubcategories) {
      this.expandedRowGroups = this.arrayOfKpiDataObjects?.map((kpiDataObject) => kpiDataObject.subcategoryKey) ?? [];
    }
    this.dataTableIdentifier = (Math.random() + 1).toString(36).substring(2);
    setTimeout(() => {
      this.rowClickHandlersMap = mountRowHeaderClickEventListeners(
        this.dataTableIdentifier,
        () => this.expandedRowGroups,
        (expandedRowGroups) => (this.expandedRowGroups = expandedRowGroups),
      );
    });
  },
  unmounted() {
    unmountRowHeaderClickEventListeners(this.rowClickHandlersMap);
    this.rowClickHandlersMap = new Map();
  },
  methods: {
    /**
     * Checks if the BaseDataPoint holds a document reference
     * @param dataPoint the object to check for a reference
     * @returns true if the data point contains a document reference and has the appropriate value
     */
    hasDocument(dataPoint: BaseDataPointYesNo): boolean {
      return (
        dataPoint?.value === YesNo.Yes &&
        dataPoint?.dataSource?.reference != undefined &&
        dataPoint.dataSource.reference.length > 0
      );
    },
    /**
     * Checks if a label belongs to a certificate
     * @param label the label to check
     * @returns true if the label belongs to a certificate
     */
    isCertificate(label: string): boolean {
      const lowerCaseLabel = label.toLowerCase();
      return lowerCaseLabel.includes("certificate") || lowerCaseLabel.includes("certification");
    },
    /**
     * Checks if a string is 'Yes' or 'No'
     * @param value the string to check
     * @returns true if the string is 'Yes' or 'No'
     */
    isYesNo(value: string) {
      return Object.values(YesNo).includes(value as YesNo);
    },
  },
});
</script>

<style lang="scss" scoped>
.p-rowgroup-footer td {
  font-weight: 500;
}

::v-deep(.p-rowgroup-header) {
  span {
    font-weight: 500;
  }

  .p-row-toggler {
    vertical-align: middle;
    margin-right: 0.25rem;
    float: right;
    cursor: pointer;
  }
}
</style>
