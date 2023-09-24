import { GrpcClient } from './client';
import { SearchDocumentAddRequest } from '../services/document/service';
import {
  isInProgress,
  isSucceded,
  wait,
} from './utils';

const addDocument = async ({
  searchDocumentClient,
  searchTaskClient,
  document,
}: GrpcClient & {
  document: SearchDocumentAddRequest;
}) => {
  console.log('Adding document', document.id);

  const queued = await searchDocumentClient.addDocument(document);
  console.log('Received task id:', queued.taskId);

  let status: string = '';
  let error;
  do {
    if (status) {
      await wait(500);
    }

    console.log(`[${queued.taskId}] Querying task status...`);
    const task = await searchTaskClient.getTask(queued);
    status = task.status;
    error = task.error;
    console.log(`[${queued.taskId}] Received task status:`, status);
  } while (isInProgress(status));

  if (isSucceded(status)) {
    console.log(`[${queued.taskId}] Added`);
  } else {
    console.log(`[${queued.taskId}] Failed:`, error);
  }
};

export const addDocuments = async (client: GrpcClient) => {
  console.log('Adding documents...');

  await Promise.all([
    addDocument({
      ...client,
      document: {
        id: 'avatar-2009',
        title: 'Avatar',
        description: 'A paraplegic marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.',
        image: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjEyOTYyMzUxNl5BMl5BanBnXkFtZTcwNTg0MTUzNA@@._V1_SX1500_CR0,0,1500,999_AL_.jpg',
      },
    }),

    addDocument({
      ...client,
      document: {
        id: 'i-am-legend-2007',
        title: 'I Am Legend',
        description: 'Years after a plague kills most of humanity and transforms the rest into monsters, the sole survivor in New York City struggles valiantly to find a cure.',
        image: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTI0NTI4NjE3NV5BMl5BanBnXkFtZTYwMDA0Nzc4._V1_.jpg',
      },
    }),

    addDocument({
      ...client,
      document: {
        id: 'interstellar-2014',
        title: 'Interstellar',
        description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
        image: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjA3NTEwOTMxMV5BMl5BanBnXkFtZTgwMjMyODgxMzE@._V1_SX1500_CR0,0,1500,999_AL_.jpg',
      },
    }),
  ]);

  console.log('Added');
};
