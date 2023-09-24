import client from '../../meili/client';
import { SearchTaskServiceImplementation } from './service';

export const searchTaskService: SearchTaskServiceImplementation = {
  getTask: async (request, _context) => {
    const task = await client.getTask(request.taskId);

    return {
      ...task,
      error: task.error || undefined,
      enqueuedAt: task.enqueuedAt.toISOString(),
      startedAt: task.startedAt.toISOString(),
      finishedAt: task.finishedAt.toISOString(),
    };
  },
};
