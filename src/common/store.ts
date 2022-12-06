import gameSlice from '../module/game/store/slice';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    [gameSlice.name]: gameSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store;
