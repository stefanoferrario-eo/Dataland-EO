package org.dataland.datalandbackend.model.lksg.categories.general.subcategories.production

import com.fasterxml.jackson.annotation.JsonProperty
import org.dataland.datalandbackend.model.generics.Address
import org.dataland.datalandbackend.model.generics.ProductionSiteBase

/**
 * --- API model ---
 * Production Sites for Lksg framework
 */
data class LksgProductionSite(
    override val nameOfProductionSite: String?,

    @field:JsonProperty(required = true)
    override val addressOfProductionSite: Address,

    val listOfGoodsOrServices: List<String>?,
) : ProductionSiteBase(nameOfProductionSite, addressOfProductionSite)
