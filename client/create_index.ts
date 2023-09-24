import { GrpcClient } from './client';
import {
  isInProgress,
  isSucceded,
  wait,
} from './utils';

export const createIndex = async ({
  searchDocumentClient,
  searchTaskClient,
}: GrpcClient) => {
  console.log('Creating index...');

  const queued = await searchDocumentClient.createIndex({});
  console.log('Received task id:', queued.taskId);

  let status: string = '';
  do {
    if (status) {
      await wait(500);
    }

    console.log(`[${queued.taskId}]`, 'Querying task status...');
    const task = await searchTaskClient.getTask(queued);
    status = task.status;
    console.log(`[${queued.taskId}]`, 'Received task status:', status);
  } while (isInProgress(status));

  if (isSucceded(status)) {
    console.log(`[${queued.taskId}] Created`);
  } else {
    console.log(`[${queued.taskId}] Failed`);
  }
};
