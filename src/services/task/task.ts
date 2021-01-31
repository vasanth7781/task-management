import { API_ROOT, GET_REQUEST_NAME, POST_REQUEST_NAME, API_KEY, AUTH_HEADER_NAME, PUT_REQUEST_NAME } from 'constant';
import Request, {setData, setHeaders, setMethod, setParams, setURL } from 'services/requests';

export const listAllTask = () =>
  Request(setURL(`${API_ROOT}/tasks/list`), setMethod(GET_REQUEST_NAME), setHeaders({ [AUTH_HEADER_NAME]: API_KEY }));

export const createTask = (taskData: any) =>
  Request(
    setURL(`${API_ROOT}/tasks/create`),
    setMethod(POST_REQUEST_NAME),
    setHeaders({ [AUTH_HEADER_NAME]: API_KEY }),
    setData(taskData),
  );

export const updateTask = (taskData: any) =>
  Request(
    setURL(`${API_ROOT}/tasks/update`),
    setMethod(POST_REQUEST_NAME),
    setData(taskData),
    setHeaders({ [AUTH_HEADER_NAME]: API_KEY })
  );

export const deleteTask = (taskId: any) =>
  Request(
    setURL(`${API_ROOT}/tasks/delete`),
    setMethod(POST_REQUEST_NAME),
    setData(taskId),
    setHeaders({ [AUTH_HEADER_NAME]: API_KEY })
  );
