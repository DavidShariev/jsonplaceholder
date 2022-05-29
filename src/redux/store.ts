import { configureStore } from "@reduxjs/toolkit";
import commentsSlice from "./slices/commentsSlice";
import postsSlice from "./slices/postsSlice";
import usersSlice from "./slices/usersSlice";
import visibilitySlice from "./slices/visibilitySlice";

export const store = configureStore({
    reducer: {
        visibilitySlice,
        usersSlice,
        postsSlice,
        commentsSlice
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;