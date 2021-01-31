import { useState } from 'react';
import { listAllUsers } from 'services/users/user';

const userSerivceCalls = {
  listUsers: listAllUsers
};

export default () => {
  const userCall = (userActivity: 'listUsers') => userSerivceCalls[userActivity];
  return { userCall };
};
