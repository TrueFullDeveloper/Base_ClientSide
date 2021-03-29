import { SHOW_LOADER, USER_LOGIN, USER_LOGOUT } from '../types';

const handlers = {
  [SHOW_LOADER]: state => ({ ...state, loading: true }),
  [USER_LOGIN]: (state, { payload }) => ({
    ...state,
    token: payload.token,
    userId: payload.id,
    password: payload.password,
    loading: false,
  }),
  [USER_LOGOUT]: state => ({
    ...state,
    token: null,
    userId: null,
    password: null,
    loading: false,
  }),

  DEFAULT: state => state,
};

export const authReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
