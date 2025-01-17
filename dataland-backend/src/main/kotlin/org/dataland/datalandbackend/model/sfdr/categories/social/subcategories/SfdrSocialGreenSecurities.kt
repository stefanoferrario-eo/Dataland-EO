package org.dataland.datalandbackend.model.sfdr.categories.social.subcategories

import org.dataland.datalandbackend.model.DataPointOneValue
import org.dataland.datalandbackend.model.enums.commons.YesNo

/**
 * --- API model ---
 * Fields of the subcategory "Green securities" belonging to the category "Social" of the sfdr framework.
 */
data class SfdrSocialGreenSecurities(
    val securitiesNotCertifiedAsGreen: DataPointOneValue<YesNo>? = null,
)
