import client from './client';
import { DOCUMENT_INDEX_NAME } from '../consts';

export interface DocumentSchema {
  id: string;
  title: string;
  description: string;
  image: string;
}

export const indexDocument = client.index<DocumentSchema>(DOCUMENT_INDEX_NAME);
