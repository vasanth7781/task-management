import { useState } from 'react';
import { listAllUsers } from 'services/users/user';
import { LIST_USERS } from 'hooks/constant';

/**
 * taskServiceCalls - mapped service calls for users
 */

const userSerivceCalls = {
  [LIST_USERS]: listAllUsers
};

/**
 * usercall - will be returnes as function ,that can called with typeof activity,
 * data can be send as we send it in higher order function
 */

export default () => {
  const userCall = (userActivity: 'listUsers') => userSerivceCalls[userActivity];
  return { userCall };
};
