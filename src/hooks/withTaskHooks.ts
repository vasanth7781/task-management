import { useState } from 'react';
import { createTask, deleteTask, listAllTask, updateTask } from 'services/task/task';
import {CREATE_TASK,UPDATE_TASK,DELETE_TASK,LIST_TASKS} from 'hooks/constant'

/**
 * taskServiceCalls - mapped service calls for tasks
 */
const taskServiceCalls = {
  [CREATE_TASK]: createTask,
  [UPDATE_TASK]: updateTask,
  [DELETE_TASK]: deleteTask,
  [LIST_TASKS]: listAllTask
};
/**
 * taskCall - will be returnes as function ,that can called with typeof activity,
 * datacan be send as we send it in higher order function
 */
export default () => {
  const taskCall = (taskActivity: 'taskCreate' | 'taskUpdate' | 'taskDelete' | 'listTasks') =>
    taskServiceCalls[taskActivity];
  return { taskCall };
};
