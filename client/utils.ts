import { TaskStatus } from 'meilisearch';

export const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export const isInProgress = (status: string): boolean => (
  status === TaskStatus.TASK_ENQUEUED ||
  status === TaskStatus.TASK_PROCESSING
);

export const isSucceded = (status: string): boolean => (
  status === TaskStatus.TASK_SUCCEEDED
);
