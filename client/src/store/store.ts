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
import { projectsApi } from "./projects/projectsApi";
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
        context: contextReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(notificator)
            .concat([projectsApi.middleware, resourcesApi.middleware]),
});

// Определяем тип, возвращаемый стором
export type RootStateType = ReturnType<typeof store.getState>;
// Определяем тип dispatch, зависимый от стора. С any хак чтобы асинхронные экшены работали из коробки
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AppDispatchType = typeof store.dispatch & Dispatch<any>;
export type GetStateFuncType = () => RootStateType;

// Создаем типизированные версии `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;
