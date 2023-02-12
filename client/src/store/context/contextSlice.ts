import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type StateType = {
    project: number | null;
};

const initialState: StateType = {
    project: Number(localStorage.getItem("project")) || null,
};

const contextSlice = createSlice({
    name: "context",
    initialState,
    reducers: {
        selectProject: (state, action: PayloadAction<number>) => {
            state.project = action.payload;
            localStorage.setItem("project", String(action.payload));
        },
    },
});

export const { selectProject } = contextSlice.actions;
export const contextReducer = contextSlice.reducer;
