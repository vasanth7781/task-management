import { useState } from 'react';
import { createTask, deleteTask, listAllTask, updateTask } from 'services/task/task';

const taskServiceCalls = {
  taskCreate: createTask,
  taskUpdate: updateTask,
  taskDelete: deleteTask,
  listTasks: listAllTask
};

export default () => {
  const taskCall = (taskActivity: 'taskCreate' | 'taskUpdate' | 'taskDelete' | 'listTasks') =>
    taskServiceCalls[taskActivity];
  return { taskCall };
};
