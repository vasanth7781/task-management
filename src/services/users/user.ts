import { API_ROOT, GET_REQUEST_NAME,API_KEY,AUTH_HEADER_NAME } from 'constant';
import Request, {
  setHeaders,
  setMethod,
  setParams,
  setURL,
} from 'services/requests';

export const listAllUsers = () =>
Request(
    setURL(`${API_ROOT}/tasks/listusers`),
    setMethod(GET_REQUEST_NAME),
    setHeaders({ [AUTH_HEADER_NAME]: API_KEY })
    );