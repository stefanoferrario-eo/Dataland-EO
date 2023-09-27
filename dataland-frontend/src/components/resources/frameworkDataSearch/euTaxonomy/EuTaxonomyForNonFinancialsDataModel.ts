import { type Category } from "@/utils/GenericFrameworkTypes";
import { DropdownDatasetIdentifier, getDataset } from "@/utils/PremadeDropdownDatasets";

export const euTaxonomyForNonFinancialsDataModel = [
  {
    name: "general",
    label: "General",
    color: "orange",
    showIf: (): boolean => true,
    subcategories: [
      {
        name: "general",
        label: "General",
        fields: [
          {
            name: "fiscalYearDeviation",
            label: "Fiscal Year Deviation",
            description: "Does the fiscal year deviate from the calender year?",
            unit: "",
            component: "RadioButtonsFormField",
            evidenceDesired: false,
            options: [
              {
                label: "Deviation",
                value: "Deviation",
              },
              {
                label: "No Deviation",
                value: "NoDeviation",
              },
            ],
            required: false,
            showIf: (): boolean => true,
          },
          {
            name: "fiscalYearEnd",
            label: "Fiscal Year End",
            description: "The date the fiscal year ends",
            unit: "",
            component: "DateFormField",
            evidenceDesired: false,
            required: true,
            showIf: (): boolean => true,
            validation: "required",
          },
          {
            name: "referencedReports",
            label: "Referenced Reports",
            description: "Please upload all relevant reports for this dataset in the PDF format.",
            unit: "",
            component: "UploadReports",
            evidenceDesired: false,
            required: false,
            showIf: (): boolean => true,
          },
          {
            name: "scopeOfEntities",
            label: "Scope Of Entities",
            description:
              "Does a list of legal entities covered by Sust./Annual/Integrated/ESEF report match with a list of legal entities covered by Audited Consolidated Financial Statement ",
            unit: "",
            component: "YesNoNaFormField",
            evidenceDesired: false,
            required: false,
            showIf: (): boolean => true,
            certificateRequiredIfYes: false,
          },
          {
            name: "euTaxonomyActivityLevelReporting",
            label: "EU Taxonomy Activity Level Reporting",
            description: "Activity Level disclosure",
            unit: "",
            component: "YesNoFormField",
            evidenceDesired: false,
            required: false,
            showIf: (): boolean => true,
            certificateRequiredIfYes: false,
          },
          {
            name: "numberOfEmployees",
            label: "Number Of Employees",
            description: "Total number of employees (including temporary workers with assignment duration >6 months)",
            unit: "",
            component: "NumberFormField",
            evidenceDesired: false,
            required: false,
            showIf: (): boolean => true,
            validation: "min:0",
          },
          {
            name: "nfrdMandatory",
            label: "NFRD Mandatory",
            description: "Is the NFRD mandatory for your company?",
            unit: "",
            component: "YesNoFormField",
            evidenceDesired: false,
            required: false,
            showIf: (): boolean => true,
            certificateRequiredIfYes: false,
          },
          {
            name: "assurance",
            label: "Assurance",
            description:
              "Level of Assurance of the EU Taxonomy disclosure (Reasonable Assurance, Limited Assurance, None)",
            unit: "",
            component: "AssuranceFormField",
            evidenceDesired: true,
            required: false,
            showIf: (): boolean => true,
          },
        ],
      },
    ],
  },
  {
    name: "revenue",
    label: "Revenue",
    color: "green",
    showIf: (): boolean => true,
    subcategories: [
      {
        name: "revenue",
        label: "Revenue",
        fields: [
          {
            name: "totalAmount",
            label: "Total Revenue",
            description:
              "Total Revenue for the financial year. I.e. income arising in the course of an entity's ordinary activities., the amounts derived from the sale of products and the provision of services after deducting sales rebates and value added tax and other taxes directly linked to turnover. Overall turnover is equivalent to a firm's total revenues over some period of time",
            unit: "",
            component: "DataPointFormField",
            evidenceDesired: true,
            options: getDataset(DropdownDatasetIdentifier.CurrencyCodes),
            required: false,
            showIf: (): boolean => true,
          },
          {
            name: "eligibleShare",
            label: "Eligible Revenue",
            description:
              "Absolute value and share of the revenue that is part of a plan to meet the DNSH criteria and make substantial contribution to any environmental objective",
            unit: "",
            component: "FinancialShareFormField",
            evidenceDesired: false,
            required: false,
            showIf: (): boolean => true,
          },
          {
            name: "alignedShare",
            label: "Aligned Revenue",
            description:
              "Absolute value and share of the revenue that is taxonomy-aligned, i.e., generated by an eligible economic activity that is making a substantial contribution to at least one of the climate and environmental objectives, while also doing no significant harm to the remaining objectives and meeting minimum standards on human rights and labour standards",
            unit: "",
            component: "FinancialShareFormField",
            evidenceDesired: false,
            required: false,
            showIf: (): boolean => true,
          },
          {
            name: "substantialContributionToClimateChangeMitigationInPercent",
            label: "Substantial Contribution to Climate Change Mitigation",
            description: "Grade of the substantial contribution criterion fulfillment",
            unit: "Percent",
            component: "PercentageFormField",
            evidenceDesired: false,
            required: false,
            showIf: (): boolean => true,
          },
          {
            name: "substantialContributionToClimateChangeAdaptionInPercent",
            label: "Substantial Contribution to Climate Change Adaption",
            description: "Grade of the substantial contribution criterion fulfillment",
            unit: "Percent",
            component: "PercentageFormField",
            evidenceDesired: false,
            required: false,
            showIf: (): boolean => true,
          },
          {
            name: "substantialContributionToSustainableUseAndProtectionOfWaterAndMarineResourcesInPercent",
            label: "Substantial Contribution to Sustainable Use and Protection of Water and Marine Resources",
            description: "Grade of the substantial contribution criterion fulfillment",
            unit: "Percent",
            component: "PercentageFormField",
            evidenceDesired: false,
            required: false,
            showIf: (): boolean => true,
          },
          {
            name: "substantialContributionToTransitionToACircularEconomyInPercent",
            label: "Substantial Contribution to Transition to a Circular Economy",
            description: "Grade of the substantial contribution criterion fulfillment",
            unit: "Percent",
            component: "PercentageFormField",
            evidenceDesired: false,
            required: false,
            showIf: (): boolean => true,
          },
          {
            name: "substantialContributionToPollutionPreventionAndControlInPercent",
            label: "Substantial Contribution to Pollution Prevention and Control",
            description: "Grade of the substantial contribution criterion fulfillment",
            unit: "Percent",
            component: "PercentageFormField",
            evidenceDesired: false,
            required: false,
            showIf: (): boolean => true,
          },
          {
            name: "substantialContributionToProtectionAndRestorationOfBiodiversityAndEcosystemsInPercent",
            label: "Substantial Contribution to Protection and Restoration of Biodiversity and Ecosystems",
            description: "Grade of the substantial contribution criterion fulfillment",
            unit: "Percent",
            component: "PercentageFormField",
            evidenceDesired: false,
            required: false,
            showIf: (): boolean => true,
          },
          {
            name: "alignedActivities",
            label: "Aligned Revenue per Activity",
            description:
              "Absolute value and share of the revenue per activity that is taxonomy-aligned, i.e., generated by an eligible economic activity that is making a substantial contribution to at least one of the climate and environmental objectives, while also doing no significant harm to the remaining objectives and meeting minimum standards on human rights and labour standards",
            unit: "",
            component: "AlignedActivitiesFormField",
            evidenceDesired: false,
            required: false,
            showIf: (): boolean => true,
          },
          {
            name: "nonAlignedShare",
            label: "Non-Aligned Revenue",
            description:
              "Absolute value and share of the revenue that is associated with non taxonomy-aligned but eligible activities",
            unit: "",
            component: "FinancialShareFormField",
            evidenceDesired: false,
            required: false,
            showIf: (): boolean => true,
          },
          {
            name: "nonAlignedActivities",
            label: "Non-Aligned Revenue per Activity",
            description:
              "Absolute value and share of the revenue per activity that is not taxonomy-aligned but eligible",
            unit: "",
            component: "NonAlignedActivitiesFormField",
            evidenceDesired: false,
            required: false,
            showIf: (): boolean => true,
          },
          {
            name: "nonEligibleShare",
            label: "Non-Eligible Revenue",
            description:
              "Absolute value and share of the revenue that is not part of a plan to meet the DNSH criteria and make substantial contrubution to any environmental objective",
            unit: "",
            component: "FinancialShareFormField",
            evidenceDesired: false,
            required: false,
            showIf: (): boolean => true,
          },
          {
            name: "enablingShareInPercent",
            label: "Enabling Revenue",
            description:
              "Share of the taxonomy-aligned revenue from total aligned revenue that is linked to activities that enable reduction of GHG in other sectors",
            unit: "Percent",
            component: "PercentageFormField",
            evidenceDesired: false,
            required: false,
            showIf: (): boolean => true,
          },
          {
            name: "transitionalShareInPercent",
            label: "Transitional Revenue",
            description:
              "Share of the taxonomy-aligned revenue from total aligned revenue that is linked to activities with significantly lower GHG emissions than the sector or industry average",
            unit: "Percent",
            component: "PercentageFormField",
            evidenceDesired: false,
            required: false,
            showIf: (): boolean => true,
          },
        ],
      },
    ],
  },
  {
    name: "capex",
    label: "CapEx",
    color: "yellow",
    showIf: (): boolean => true,
    subcategories: [
      {
        name: "capex",
        label: "CapEx",
        fields: [
          {
            name: "totalAmount",
            label: "Total CapEx",
            description:
              "Total CapEx for the reported year. Capital expenditures are non-consumable investments, e.g. for acquiring, upgrading, and maintaining physical assets such as property, plants, buildings, technology ",
            unit: "",
            component: "DataPointFormField",
            evidenceDesired: true,
            options: getDataset(DropdownDatasetIdentifier.CurrencyCodes),
            required: false,
            showIf: (): boolean => true,
          },
          {
            name: "eligibleShare",
            label: "Eligible CapEx",
            description:
              "Absolute value and share of the CapEx that is part of a plan to meet the DNSH criteria and make substantial contribution to any environmental objective",
            unit: "",
            component: "FinancialShareFormField",
            evidenceDesired: false,
            required: false,
            showIf: (): boolean => true,
          },
          {
            name: "alignedShare",
            label: "Aligned CapEx",
            description:
              "Absolute value and share of the CapEx that is either already taxonomy-aligned or is part of a credible plan to extend or reach taxonomy alignment, i.e., an eligible economic activity that is making a substantial contribution to at least one of the climate and environmental objectives, while also doing no significant harm to the remaining objectives and meeting minimum standards on human rights and labour standards",
            unit: "",
            component: "FinancialShareFormField",
            evidenceDesired: false,
            required: false,
            showIf: (): boolean => true,
          },
          {
            name: "substantialContributionToClimateChangeMitigationInPercent",
            label: "Substantial Contribution to Climate Change Mitigation",
            description: "Grade of the substantial contribution criterion fulfillment",
            unit: "Percent",
            component: "PercentageFormField",
            evidenceDesired: false,
            required: false,
            showIf: (): boolean => true,
          },
          {
            name: "substantialContributionToClimateChangeAdaptionInPercent",
            label: "Substantial Contribution to Climate Change Adaption",
            description: "Grade of the substantial contribution criterion fulfillment",
            unit: "Percent",
            component: "PercentageFormField",
            evidenceDesired: false,
            required: false,
            showIf: (): boolean => true,
          },
          {
            name: "substantialContributionToSustainableUseAndProtectionOfWaterAndMarineResourcesInPercent",
            label: "Substantial Contribution to Sustainable Use and Protection of Water and Marine Resources",
            description: "Grade of the substantial contribution criterion fulfillment",
            unit: "Percent",
            component: "PercentageFormField",
            evidenceDesired: false,
            required: false,
            showIf: (): boolean => true,
          },
          {
            name: "substantialContributionToTransitionToACircularEconomyInPercent",
            label: "Substantial Contribution to Transition to a Circular Economy",
            description: "Grade of the substantial contribution criterion fulfillment",
            unit: "Percent",
            component: "PercentageFormField",
            evidenceDesired: false,
            required: false,
            showIf: (): boolean => true,
          },
          {
            name: "substantialContributionToPollutionPreventionAndControlInPercent",
            label: "Substantial Contribution to Pollution Prevention and Control",
            description: "Grade of the substantial contribution criterion fulfillment",
            unit: "Percent",
            component: "PercentageFormField",
            evidenceDesired: false,
            required: false,
            showIf: (): boolean => true,
          },
          {
            name: "substantialContributionToProtectionAndRestorationOfBiodiversityAndEcosystemsInPercent",
            label: "Substantial Contribution to Protection and Restoration of Biodiversity and Ecosystems",
            description: "Grade of the substantial contribution criterion fulfillment",
            unit: "Percent",
            component: "PercentageFormField",
            evidenceDesired: false,
            required: false,
            showIf: (): boolean => true,
          },
          {
            name: "alignedActivities",
            label: "Aligned CapEx per Activity",
            description:
              "Absolute value and share of the CapEx per activity that is taxonomy-aligned, i.e., generated by an eligible economic activity that is making a substantial contribution to at least one of the climate and environmental objectives, while also doing no significant harm to the remaining objectives and meeting minimum standards on human rights and labour standards",
            unit: "",
            component: "AlignedActivitiesFormField",
            evidenceDesired: false,
            required: false,
            showIf: (): boolean => true,
          },
          {
            name: "nonAlignedShare",
            label: "Non-Aligned CapEx",
            description:
              "Absolute value and share of the CapEx that is associated with non taxonomy-aligned but eligible activities",
            unit: "",
            component: "FinancialShareFormField",
            evidenceDesired: false,
            required: false,
            showIf: (): boolean => true,
          },
          {
            name: "nonAlignedActivities",
            label: "Non-Aligned CapEx per Activity",
            description: "Absolute value and share of the CapEx per activity that is not taxonomy-aligned but eligible",
            unit: "",
            component: "NonAlignedActivitiesFormField",
            evidenceDesired: false,
            required: false,
            showIf: (): boolean => true,
          },
          {
            name: "nonEligibleShare",
            label: "Non-Eligible CapEx",
            description:
              "Absolute value and share of the CapEx that is not part of a plan to meet the DNSH criteria and make substantial contribution to any environmental objective",
            unit: "",
            component: "FinancialShareFormField",
            evidenceDesired: false,
            required: false,
            showIf: (): boolean => true,
          },
          {
            name: "enablingShareInPercent",
            label: "Enabling CapEx",
            description:
              "Share of the taxonomy-aligned CapEx from total aligned CapEx that is linked to activities that enable reduction of GHG in other sectors",
            unit: "Percent",
            component: "PercentageFormField",
            evidenceDesired: false,
            required: false,
            showIf: (): boolean => true,
          },
          {
            name: "transitionalShareInPercent",
            label: "Transitional CapEx",
            description:
              "Share of the taxonomy-aligned CapEx from total aligned CapEx that is linked to activities with significantly lower GHG emissions than the sector or industry average",
            unit: "Percent",
            component: "PercentageFormField",
            evidenceDesired: false,
            required: false,
            showIf: (): boolean => true,
          },
        ],
      },
    ],
  },
  {
    name: "opex",
    label: "OpEx",
    color: "blue",
    showIf: (): boolean => true,
    subcategories: [
      {
        name: "opex",
        label: "OpEx",
        fields: [
          {
            name: "totalAmount",
            label: "Total OpEx",
            description:
              "Total OpEx for the financial year. Operating expenses (OpEx) are shorter term expenses required to meet the ongoing operational costs of running a business.",
            unit: "",
            component: "DataPointFormField",
            evidenceDesired: true,
            options: getDataset(DropdownDatasetIdentifier.CurrencyCodes),
            required: false,
            showIf: (): boolean => true,
          },
          {
            name: "eligibleShare",
            label: "Eligible OpEx",
            description:
              "Absolute value and share of the OpEx that is part of a plan to meet the DNSH criteria and make substantial contribution to any environmental objective",
            unit: "",
            component: "FinancialShareFormField",
            evidenceDesired: false,
            required: false,
            showIf: (): boolean => true,
          },
          {
            name: "alignedShare",
            label: "Aligned OpEx",
            description:
              "Absolute value and share of the OpEx that is associated with taxonomy-aligned activities. i.e., for an eligible economic activity that is making a substantial contribution to at least one of the climate and environmental objectives, while also doing no significant harm to the remaining objectives and meeting minimum standards on human rights and labour standards",
            unit: "",
            component: "FinancialShareFormField",
            evidenceDesired: false,
            required: false,
            showIf: (): boolean => true,
          },
          {
            name: "substantialContributionToClimateChangeMitigationInPercent",
            label: "Substantial Contribution to Climate Change Mitigation",
            description: "Grade of the substantial contribution criterion fulfillment",
            unit: "Percent",
            component: "PercentageFormField",
            evidenceDesired: false,
            required: false,
            showIf: (): boolean => true,
          },
          {
            name: "substantialContributionToClimateChangeAdaptionInPercent",
            label: "Substantial Contribution to Climate Change Adaption",
            description: "Grade of the substantial contribution criterion fulfillment",
            unit: "Percent",
            component: "PercentageFormField",
            evidenceDesired: false,
            required: false,
            showIf: (): boolean => true,
          },
          {
            name: "substantialContributionToSustainableUseAndProtectionOfWaterAndMarineResourcesInPercent",
            label: "Substantial Contribution to Sustainable Use and Protection of Water and Marine Resources",
            description: "Grade of the substantial contribution criterion fulfillment",
            unit: "Percent",
            component: "PercentageFormField",
            evidenceDesired: false,
            required: false,
            showIf: (): boolean => true,
          },
          {
            name: "substantialContributionToTransitionToACircularEconomyInPercent",
            label: "Substantial Contribution to Transition to a Circular Economy",
            description: "Grade of the substantial contribution criterion fulfillment",
            unit: "Percent",
            component: "PercentageFormField",
            evidenceDesired: false,
            required: false,
            showIf: (): boolean => true,
          },
          {
            name: "substantialContributionToPollutionPreventionAndControlInPercent",
            label: "Substantial Contribution to Pollution Prevention and Control",
            description: "Grade of the substantial contribution criterion fulfillment",
            unit: "Percent",
            component: "PercentageFormField",
            evidenceDesired: false,
            required: false,
            showIf: (): boolean => true,
          },
          {
            name: "substantialContributionToProtectionAndRestorationOfBiodiversityAndEcosystemsInPercent",
            label: "Substantial Contribution to Protection and Restoration of Biodiversity and Ecosystems",
            description: "Grade of the substantial contribution criterion fulfillment",
            unit: "Percent",
            component: "PercentageFormField",
            evidenceDesired: false,
            required: false,
            showIf: (): boolean => true,
          },
          {
            name: "alignedActivities",
            label: "Aligned OpEx per Activity",
            description:
              "Absolute value and share of the OpEx per activity that is taxonomy-aligned, i.e., generated by an eligible economic activity that is making a substantial contribution to at least one of the climate and environmental objectives, while also doing no significant harm to the remaining objectives and meeting minimum standards on human rights and labour standards",
            unit: "",
            component: "AlignedActivitiesFormField",
            evidenceDesired: false,
            required: false,
            showIf: (): boolean => true,
          },
          {
            name: "nonAlignedShare",
            label: "Non-Aligned OpEx",
            description:
              "Absolute value and share of the OpEx that is associated with non taxonomy-aligned but eligible activities",
            unit: "",
            component: "FinancialShareFormField",
            evidenceDesired: false,
            required: false,
            showIf: (): boolean => true,
          },
          {
            name: "nonAlignedActivities",
            label: "Non-Aligned OpEx per Activity",
            description: "Absolute value and share of the opex per activity that is not taxonomy-aligned but eligible",
            unit: "",
            component: "NonAlignedActivitiesFormField",
            evidenceDesired: false,
            required: false,
            showIf: (): boolean => true,
          },
          {
            name: "nonEligibleShare",
            label: "Non-Eligible OpEx",
            description:
              "Absolute value and share of the OpEx that is not part of a plan to meet the DNSH criteria and make substantial contribution to any environmental objective",
            unit: "",
            component: "FinancialShareFormField",
            evidenceDesired: false,
            required: false,
            showIf: (): boolean => true,
          },
          {
            name: "enablingShareInPercent",
            label: "Enabling OpEx",
            description:
              "Share of the taxonomy-aligned OpEx from total aligned OpEx that is linked to activities that enable reduction of GHG in other sectors",
            unit: "Percent",
            component: "PercentageFormField",
            evidenceDesired: false,
            required: false,
            showIf: (): boolean => true,
          },
          {
            name: "transitionalShareInPercent",
            label: "Transitional OpEx",
            description:
              "Share of the taxonomy-aligned OpEx from total aligned OpEx that is linked to activities with significantly lower GHG emissions than the sector or industry average",
            unit: "Percent",
            component: "PercentageFormField",
            evidenceDesired: false,
            required: false,
            showIf: (): boolean => true,
          },
        ],
      },
    ],
  },
] as Array<Category>;
