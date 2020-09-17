let baseUrl = 'https://api.revvsales.com'

export const API = {
  ENDPOINTS: {
    LOGIN: `${baseUrl}/api/auth/initiate-auth`,
    REFRESH_TOKEN: `${baseUrl}/api/auth/initiate-auth`,
    GET_ALL_DOCUMENTS: `${baseUrl}/api/docstemplate/?page_num=<PAGE_NUM>&status=ACTIVE`,
    GET_ALL_DOC: `${baseUrl}/api/folders/?page_num=<PAGE_NUM>&sort_by_doc_num=true`,
    NEW_DOCUMENT: `${baseUrl}/api/docs`,
    CLONE_DOCUMENT: `${baseUrl}/api/documents/<DOCUMENT_ID>/clone`,
    DOCUMENT_ACCEPTER: `${baseUrl}/api/v2/doc-acceptors/<DOCUMENT_ID>`,
    DOCUMENT_ACCEPTANCE: `${baseUrl}/api/shared/documents/1/<DOCUMENT_HASH>/doc-acceptance/accept`,
    DOCUMENT_REJECTION: `${baseUrl}/api/shared/documents/1/<DOCUMENT_HASH>/doc-acceptance/reject`,
    GENERATE_LINK: `${baseUrl}/api/perma-link`,
  }
}