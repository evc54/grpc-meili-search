import { DOCUMENT_INDEX_NAME } from '../../consts';
import client from '../../meili/client';
import { indexDocument } from '../../meili/index_document';
import { SearchDocumentServiceImplementation } from './service';

export const searchDocumentService: SearchDocumentServiceImplementation = {
  addDocument: async (request, _context) => {
    const task = await indexDocument.addDocuments([request]);

    return {
      taskId: task.taskUid,
    };
  },

  createIndex: async (_request, _context) => {
    await client.deleteIndexIfExists(DOCUMENT_INDEX_NAME);

    const task = await client.createIndex(DOCUMENT_INDEX_NAME, {
      primaryKey: 'id',
    });
  
    return {
      taskId: task.taskUid,
    };
  },

  deleteIndex: async (_request, _context) => {
    await client.deleteIndexIfExists(DOCUMENT_INDEX_NAME);

    return {};
  },
};
