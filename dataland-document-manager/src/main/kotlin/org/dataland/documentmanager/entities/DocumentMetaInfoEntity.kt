package org.dataland.documentmanager.entities

import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import org.dataland.datalandbackendutils.model.QaStatus
import org.dataland.documentmanager.model.DocumentMetaInfo

/**
 * The entity storing the document meta info
 */
@Entity
@Table(name = "document_meta_info")
data class DocumentMetaInfoEntity(
    @Id
    val documentId: String,
    val uploaderId: String,
    val uploadTime: Long,
    var qaStatus: QaStatus,
) {
    constructor(documentMetaInfo: DocumentMetaInfo) :
        this(
            documentId = documentMetaInfo.documentId,
            uploaderId = documentMetaInfo.uploaderId,
            uploadTime = documentMetaInfo.uploadTime,
            qaStatus = documentMetaInfo.qaStatus,
        )
}
