import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from './slices/authSlice'


const store = configureStore({
    reducer: {
        auth: authSliceReducer,
    },
    devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;