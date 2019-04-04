import { SET_AUTHENTICATE_STATUS } from './actionTypes';

export const setAuthenticate = (authenticateStatus) => ({
  type: SET_AUTHENTICATE_STATUS,
  authenticateStatus
});

