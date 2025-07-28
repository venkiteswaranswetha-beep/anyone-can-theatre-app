import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SceneGenerator } from '../../services/SceneGenerator';

// Async thunk for generating scenes
export const generateScene = createAsyncThunk(
  'scene/generateScene',
  async ({ mode, theme, emotion, customPrompt }, { rejectWithValue }) => {
    try {
      const scene = await SceneGenerator.generateScene(mode, theme, emotion, customPrompt);
      return scene;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for getting daily challenge
export const getDailyChallenge = createAsyncThunk(
  'scene/getDailyChallenge',
  async (_, { rejectWithValue }) => {
    try {
      const challenge = await SceneGenerator.getDailyChallenge();
      return challenge;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  currentScene: null,
  sceneHistory: [],
  favoriteScenes: [],
  dailyChallenge: null,
  preferences: {
    mode: 'solo',
    difficulty: 'beginner',
    themes: [],
    duration: 90,
  },
  loading: false,
  error: null,
  generationCount: 0,
  lastGenerated: null,
};

const sceneSlice = createSlice({
  name: 'scene',
  initialState,
  reducers: {
    setCurrentScene: (state, action) => {
      state.currentScene = action.payload;
    },
    addToHistory: (state, action) => {
      state.sceneHistory.unshift(action.payload);
      // Keep only last 50 scenes in history
      if (state.sceneHistory.length > 50) {
        state.sceneHistory = state.sceneHistory.slice(0, 50);
      }
    },
    addToFavorites: (state, action) => {
      const scene = action.payload;
      const exists = state.favoriteScenes.find(s => s.id === scene.id);
      if (!exists) {
        state.favoriteScenes.push(scene);
      }
    },
    removeFromFavorites: (state, action) => {
      const sceneId = action.payload;
      state.favoriteScenes = state.favoriteScenes.filter(s => s.id !== sceneId);
    },
    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
    incrementGenerationCount: (state) => {
      state.generationCount += 1;
      state.lastGenerated = new Date().toISOString();
    },
  },
  extraReducers: (builder) => {
    builder
      // Generate Scene
      .addCase(generateScene.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateScene.fulfilled, (state, action) => {
        state.loading = false;
        state.currentScene = action.payload;
        state.sceneHistory.unshift(action.payload);
        state.generationCount += 1;
        state.lastGenerated = new Date().toISOString();
        
        // Keep only last 50 scenes in history
        if (state.sceneHistory.length > 50) {
          state.sceneHistory = state.sceneHistory.slice(0, 50);
        }
      })
      .addCase(generateScene.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Daily Challenge
      .addCase(getDailyChallenge.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDailyChallenge.fulfilled, (state, action) => {
        state.loading = false;
        state.dailyChallenge = action.payload;
      })
      .addCase(getDailyChallenge.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setCurrentScene,
  addToHistory,
  addToFavorites,
  removeFromFavorites,
  updatePreferences,
  clearError,
  incrementGenerationCount,
} = sceneSlice.actions;

// Selectors
export const selectCurrentScene = (state) => state.scene.currentScene;
export const selectSceneHistory = (state) => state.scene.sceneHistory;
export const selectFavoriteScenes = (state) => state.scene.favoriteScenes;
export const selectDailyChallenge = (state) => state.scene.dailyChallenge;
export const selectScenePreferences = (state) => state.scene.preferences;
export const selectSceneLoading = (state) => state.scene.loading;
export const selectSceneError = (state) => state.scene.error;
export const selectGenerationCount = (state) => state.scene.generationCount;

export default sceneSlice.reducer;