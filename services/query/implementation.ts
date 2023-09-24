import { indexDocument } from '../../meili/index_document';
import { SearchQueryServiceImplementation } from './service';

export const searchQueryService: SearchQueryServiceImplementation = {
  query: async (request, _context) => {
    const { hits } = await indexDocument.search(request.query);

    return { hits };
  },
};
