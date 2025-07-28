import { configureStore } from '@reduxjs/toolkit';
import sceneReducer from './slices/sceneSlice';
import userReducer from './slices/userSlice';
import recordingReducer from './slices/recordingSlice';
import communityReducer from './slices/communitySlice';
import coachingReducer from './slices/coachingSlice';

export const store = configureStore({
  reducer: {
    scene: sceneReducer,
    user: userReducer,
    recording: recordingReducer,
    community: communityReducer,
    coaching: coachingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['recording/setRecordingUri'],
        ignoredPaths: ['recording.recordingUri'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;