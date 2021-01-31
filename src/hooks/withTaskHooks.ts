import { useState } from 'react';
import { createTask, deleteTask, listAllTask, updateTask } from 'services/task/task';
import {CREATE_TASK,UPDATE_TASK,DELETE_TASK,LIST_TASKS} from 'hooks/constant'

const taskServiceCalls = {
  [CREATE_TASK]: createTask,
  [UPDATE_TASK]: updateTask,
  [DELETE_TASK]: deleteTask,
  [LIST_TASKS]: listAllTask
};

export default () => {
  const taskCall = (taskActivity: 'taskCreate' | 'taskUpdate' | 'taskDelete' | 'listTasks') =>
    taskServiceCalls[taskActivity];
  return { taskCall };
};
