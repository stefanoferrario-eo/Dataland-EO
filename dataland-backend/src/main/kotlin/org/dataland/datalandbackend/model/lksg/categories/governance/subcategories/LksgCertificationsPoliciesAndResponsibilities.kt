package org.dataland.datalandbackend.model.lksg.categories.governance.subcategories

import org.dataland.datalandbackend.model.enums.commons.YesNo

/**
 * --- API model ---
 * Fields of the LKSG questionnaire regarding the impact topic "Certifications, policies & responsibilities"
 */
data class LksgCertificationsPoliciesAndResponsibilities(
    val sa8000Certification: YesNo?,

    val smetaSocialAuditConcept: YesNo?,

    val betterWorkProgramCertificate: YesNo?,

    val iso45001Certification: YesNo?,

    val iso14000Certification: YesNo?,

    val emasCertification: YesNo?,

    val iso37001Certification: YesNo?,

    val iso37301Certification: YesNo?,

    val riskManagementSystemCertification: YesNo?,

    val amforiBsciAuditReport: YesNo?,

    val responsibleBusinessAssociationCertification: YesNo?,

    val fairLaborAssociationCertification: YesNo?,

    val additionalAudits: String?,

    val codeOfConduct: YesNo?,

    val codeOfConductTraining: YesNo?,

    val supplierCodeOfConduct: YesNo?,

    val policyStatement: YesNo?,

    val humanRightsStrategy: String?,

    val environmentalImpactPolicy: YesNo?,

    val fairWorkingConditionsPolicy: YesNo?,
)