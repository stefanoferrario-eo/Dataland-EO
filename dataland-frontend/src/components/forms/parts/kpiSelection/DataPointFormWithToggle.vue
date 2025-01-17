<template>
  <DataPointHeader :name="kpiNameMappings[name]" />
  <div data-test="dataPointToggle" class="form-field vertical-middle">
    <InputSwitch
      data-test="dataPointToggleButton"
      inputId="dataPointIsAvailableSwitch"
      @click="dataPointAvailableToggle"
      v-model="dataPointIsAvailable"
    />
    <h5 data-test="dataPointToggleTitle" class="ml-2">
      {{ dataPointIsAvailable ? "Data point is available" : "Data point is not available" }}
    </h5>
  </div>
  <div v-show="dataPointIsAvailable">
    <div class="form-field" v-if="dataPointIsAvailable">
      <div v-if="valueType === 'percent' && showSecondInput" class="p-0">
        <div class="next-to-each-other">
          <div class="p-0">
            <UploadFormHeader
              :label="valueType === 'percent' ? `${kpiNameMappings[name]} (%)` : `${kpiNameMappings[name]}`"
              :description="kpiInfoMappings[name] ?? ''"
            />
            <FormKit
              :disabled="!dataPointIsAvailable"
              type="number"
              name="valueAsPercentage"
              validation-label=""
              v-model="currentPercentageValue"
              :placeholder="valueType === 'percent' ? 'Value %' : 'Value'"
              step="any"
              min="0"
              :validation="valueType === 'percent' ? 'number|between:0,100' : 'number'"
              :inner-class="{
                short: false,
              }"
            />
          </div>
          <div>
            <UploadFormHeader
              :label="`${kpiNameMappings[name]}`"
              :description="kpiInfoMappings[`${name}Amount`] ?? ''"
            />
            <FormKit
              :disabled="!dataPointIsAvailable"
              type="number"
              name="valueAsAbsolute"
              validation-label=""
              v-model="currentAmountValue"
              :placeholder="'Value'"
              step="any"
              min="0"
              :validation="'number'"
              :inner-class="{
                short: false,
              }"
            />
          </div>
        </div>
      </div>
      <div v-else>
        <UploadFormHeader
          :label="valueType === 'percent' ? `${kpiNameMappings[name]} (%)` : `${kpiNameMappings[name]}`"
          :description="kpiInfoMappings[name] ?? ''"
        />
        <FormKit
          :disabled="!dataPointIsAvailable"
          type="number"
          name="value"
          validation-label=""
          v-model="currentAmountValue"
          :placeholder="'Value'"
          step="any"
          min="0"
          :validation="'number'"
          :inner-class="{
            short: true,
          }"
        />
      </div>
    </div>
    <div class="form-field">
      <FormKit type="group" v-if="dataPointIsAvailable" name="dataSource">
        <h4 class="mt-0">Data source</h4>
        <div class="next-to-each-other">
          <div class="flex-1">
            <UploadFormHeader :label="kpiNameMappings.report ?? ''" :description="kpiInfoMappings.report ?? ''" />
            <FormKit
              type="select"
              name="report"
              :disabled="!dataPointIsAvailable"
              v-model="currentReportValue"
              placeholder="Select a report"
              :options="['None...', ...reportsName]"
              :plugins="[selectNothingIfNotExistsFormKitPlugin]"
            />
          </div>
          <div>
            <UploadFormHeader :label="kpiNameMappings.page ?? ''" :description="kpiInfoMappings.page ?? ''" />
            <FormKit
              outer-class="w-100"
              :disabled="!dataPointIsAvailable"
              v-model="currentPageValue"
              type="number"
              name="page"
              placeholder="Page"
              validation-label="Page"
              step="1"
              min="0"
              validation="min:0"
            />
          </div>
        </div>
      </FormKit>
    </div>

    <!-- Data quality -->
    <div class="form-field">
      <UploadFormHeader
        label="Data quality"
        description="The level of confidence associated to the value."
        :is-required="true"
      />
      <div class="md:col-6 col-12 p-0">
        <FormKit
          :disabled="!dataPointIsAvailable"
          type="select"
          v-model="currentQualityValue"
          name="quality"
          :validation="dataPointIsAvailable ? 'required' : ''"
          validation-label="Data quality"
          placeholder="Data quality"
          :options="qualityOptions"
        />
      </div>
    </div>
  </div>
  <div class="form-field">
    <FormKit
      type="textarea"
      name="comment"
      placeholder="(Optional) Add comment that might help Quality Assurance to approve the datapoint. "
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import InputSwitch from "primevue/inputswitch";
import UploadFormHeader from "@/components/forms/parts/elements/basic/UploadFormHeader.vue";
import { FormKit } from "@formkit/vue";
import { QualityOptions } from "@clients/backend";
import DataPointHeader from "@/components/forms/parts/kpiSelection/DataPointHeader.vue";
import { selectNothingIfNotExistsFormKitPlugin } from "@/utils/FormKitPlugins";

export default defineComponent({
  name: "DataPointFormWithToggle",
  components: { DataPointHeader, UploadFormHeader, FormKit, InputSwitch },
  emits: ["dataPointAvailableToggle"],
  data: () => ({
    dataPointIsAvailable: true,
    qualityOptions: Object.values(QualityOptions).map((qualityOption: string) => ({
      label: qualityOption,
      value: qualityOption,
    })),
    currentAmountValue: "",
    currentPercentageValue: "",
    currentReportValue: "",
    currentPageValue: "",
    currentQualityValue: "",
    qualityValueBeforeDataPointWasDisabled: "",
  }),
  watch: {
    dataPointIsAvailable(newValue: boolean) {
      if (!newValue) {
        this.qualityValueBeforeDataPointWasDisabled = this.currentQualityValue;
        this.currentQualityValue = "NA";
      } else {
        this.currentQualityValue = this.qualityValueBeforeDataPointWasDisabled;
      }
    },
  },
  props: {
    name: {
      type: String,
    },
    kpiInfoMappings: {
      type: Object,
      default: null,
    },
    kpiNameMappings: {
      type: Object,
      default: null,
    },
    valueType: {
      type: String as () => "percent" | "number",
      default: "percent",
    },
    reportsName: {
      type: Array,
      default: () => [],
    },
    showSecondInput: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    selectNothingIfNotExistsFormKitPlugin,
    /**
     * Toggle dataPointIsAvailable variable value and emit event
     *
     */
    dataPointAvailableToggle(): void {
      this.dataPointIsAvailable = !this.dataPointIsAvailable;
    },
  },
});
</script>
