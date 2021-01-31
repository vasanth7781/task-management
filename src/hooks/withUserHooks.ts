import { useState } from 'react';
import { listAllUsers } from 'services/users/user';
import { LIST_USERS } from 'hooks/constant';

const userSerivceCalls = {
  [LIST_USERS]: listAllUsers
};

export default () => {
  const userCall = (userActivity: 'listUsers') => userSerivceCalls[userActivity];
  return { userCall };
};
