import { RootState } from '../store';
export const getUser = (state: RootState) => state.auth.user;
export const getUserToken = (state: RootState) => state.auth.token;
