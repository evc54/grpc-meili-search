import { createServer } from 'nice-grpc';
import {
  searchDocumentService,
  SearchDocumentServiceDefinition,
  searchQueryService,
  SearchQueryServiceDefinition,
  searchTaskService,
  SearchTaskServiceDefinition,
} from './services';
import { HOST, PORT } from './consts';

const server = createServer();

server.add(SearchDocumentServiceDefinition, searchDocumentService);
server.add(SearchQueryServiceDefinition, searchQueryService);
server.add(SearchTaskServiceDefinition, searchTaskService);

process.once('SIGTERM', () => {
  server.shutdown().catch(console.error);
});

server.listen(`${HOST}:${PORT}`)
  .then(() => console.log(`Listening on ${PORT}`))
  .catch(console.error);
