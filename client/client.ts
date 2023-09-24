import {
  createChannel,
  createClient,
} from 'nice-grpc';
import {
  HOST,
  PORT,
} from '../consts';
import {
  SearchDocumentServiceClient,
  SearchDocumentServiceDefinition,
  SearchQueryServiceClient,
  SearchQueryServiceDefinition,
  SearchTaskServiceClient,
  SearchTaskServiceDefinition,
} from '../services';
import { createIndex } from './create_index';
import { addDocuments } from './add_documents';
import { query } from './query';

export interface GrpcClient {
  searchDocumentClient: SearchDocumentServiceClient;
  searchQueryClient: SearchQueryServiceClient;
  searchTaskClient: SearchTaskServiceClient;
}

const channel = createChannel(`${HOST}:${PORT}`);

const client: GrpcClient = {
  searchDocumentClient: createClient(SearchDocumentServiceDefinition, channel),
  searchQueryClient: createClient(SearchQueryServiceDefinition, channel),
  searchTaskClient: createClient(SearchTaskServiceDefinition, channel),
};

const run = async () => {
  await createIndex(client);
  await addDocuments(client);
  await query(client);
};

run().catch(console.error);
