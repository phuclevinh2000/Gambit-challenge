import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { login, logout } from './features/userSlice';
import { RootState } from './store';

export const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  matcher: isAnyOf(login, logout),
  effect: (action, listenerApi) =>
    localStorage.setItem(
      'user',
      JSON.stringify((listenerApi.getState() as RootState).user)
    ),
});
