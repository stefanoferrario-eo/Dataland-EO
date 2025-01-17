package org.dataland.datalandbackend.model.lksg.categories.general.subcategories.production

import com.fasterxml.jackson.annotation.JsonProperty
import org.dataland.datalandbackend.model.generics.ProductBase

/**
 * --- API model ---
 * Fields of the LKSG questionnaire regarding a single product for the "Most Important Products" field
 */
data class LksgProduct(
    @field:JsonProperty(required = true)
    override val name: String,

    val productionSteps: List<String>?,

    val relatedCorporateSupplyChain: String?,
) : ProductBase(name)
