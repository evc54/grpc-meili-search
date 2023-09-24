import { MeiliSearch } from 'meilisearch';
import {
  MEILISEARCH_API_KEY,
  MEILISEARCH_URL,
} from '../consts';

const client = new MeiliSearch({
  host: MEILISEARCH_URL,
  apiKey: MEILISEARCH_API_KEY,
})

export default client;
