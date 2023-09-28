package org.dataland.datalandbackend.repositories.utils

/**
 * A filter class used in the searchCompanies()-Method which allows
 * convenient usage of SEPL instructions in the query
 */
data class StoredCompanySearchFilter(
    var dataTypeFilter: List<String>,
    val countryCodeFilter: List<String>,
    val sectorFilter: List<String>,
    val searchString: String,
    val nameOnlyFilter: Boolean,
    val uploaderId: String,
) {
    val dataTypeFilterSize: Int
        get() = dataTypeFilter.size

    val countryCodeFilterSize: Int
        get() = countryCodeFilter.size

    val sectorFilterSize: Int
        get() = sectorFilter.size

    val searchStringLength: Int
        get() = searchString.length

    val searchStringLower: String
        get() = searchString.lowercase()

    val uploaderIdLength: Int
        get() = uploaderId.length
}