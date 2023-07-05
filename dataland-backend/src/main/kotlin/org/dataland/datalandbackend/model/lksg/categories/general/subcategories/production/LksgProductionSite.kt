package org.dataland.datalandbackend.model.lksg.categories.general.subcategories.production

import com.fasterxml.jackson.annotation.JsonProperty

/**
 * --- API model ---
 * Production Sites for Lksg framework
 */
data class LksgProductionSite(
    val nameOfProductionSite: String?,

    @field:JsonProperty(required = true)
    val addressOfProductionSite: LksgAddress,

    val listOfGoodsOrServices: List<String>?,
)