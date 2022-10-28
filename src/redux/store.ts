import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import { listenerMiddleware } from './middleware';

const userData = JSON.parse(localStorage.getItem('user') || 'null');

export const store = configureStore({
  preloadedState: {
    user: userData,
  },
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    listenerMiddleware.middleware,
  ],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
