import { configureStore, Dispatch } from "@reduxjs/toolkit";
import { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";

export const Store = configureStore({
    reducer: {},
});

// Определяем тип, возвращаемый стором
export type RootStateType = ReturnType<typeof Store.getState>;
// Определяем тип dispatch, зависимый от стора. С any хак чтобы асинхронные экшены работали из коробки
export type AppDispatchType = typeof Store.dispatch & Dispatch<any>;
export type GetStateFuncType = () => RootStateType;

// Создаем типизированные версии `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;
