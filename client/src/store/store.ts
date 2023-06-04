import {
    configureStore,
    Dispatch,
    isRejectedWithValue,
    Middleware,
} from "@reduxjs/toolkit";
import { notification } from "antd";
import { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { contextReducer } from "./context/contextSlice";
import { metricsApi } from "./metrics/metricsApi";
import { projectsApi } from "./projects/projectsApi";
import { reportsApi } from "./reports/reportsApi";
import { resourcesApi } from "./resources/resourcesApi";

export const notificator: Middleware = () => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        notification.error({
            message: action?.payload?.data?.message ?? "Что-то пошло не так",
        });
    }

    return next(action);
};

export const store = configureStore({
    reducer: {
        [projectsApi.reducerPath]: projectsApi.reducer,
        [resourcesApi.reducerPath]: resourcesApi.reducer,
        [metricsApi.reducerPath]: metricsApi.reducer,
        [reportsApi.reducerPath]: reportsApi.reducer,
        context: contextReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(notificator)
            .concat([
                projectsApi.middleware,
                resourcesApi.middleware,
                metricsApi.middleware,
                reportsApi.middleware,
            ]),
});

export type RootStateType = ReturnType<typeof store.getState>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AppDispatchType = typeof store.dispatch & Dispatch<any>;
export type GetStateFuncType = () => RootStateType;

// Создаем типизированные версии `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;
