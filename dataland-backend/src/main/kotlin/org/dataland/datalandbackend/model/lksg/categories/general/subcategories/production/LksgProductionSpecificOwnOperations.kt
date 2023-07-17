package org.dataland.datalandbackend.model.lksg.categories.general.subcategories.production

import io.swagger.v3.oas.annotations.media.Schema
import org.dataland.datalandbackend.model.enums.lksg.ProcurementCategoryType
import org.dataland.datalandbackend.utils.JsonExampleFormattingConstants

/**
 * --- API model ---
 * Fields of the LKSG questionnaire regarding the impact topic "Production Specific"
 */
data class LksgProductionSpecificOwnOperations(

    val mostImportantProducts: List<LksgProduct>?,

    @field:Schema(example = JsonExampleFormattingConstants.PROCUREMENT_CATEGORIES_DEFAULT_VALUE)
    val procurementCategories: Map<ProcurementCategoryType, LksgProcurementCategory>?,
)
