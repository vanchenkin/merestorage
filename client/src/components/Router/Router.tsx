import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Loader } from "../Loader/Loader";

const MainPage = lazy(() => import("../../pages/Main/MainPage"));
const ResourcesPage = lazy(() => import("../../pages/Resources/ResourcesPage"));
const CreateResourcePage = lazy(
    () => import("../../pages/CreateResource/CreateResourcePage")
);
const MetricsPage = lazy(() => import("../../pages/MetricsPage"));
const ReportsPage = lazy(() => import("../../pages/ReportsPage"));

export const Router: React.FC = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="resources">
                    <Route path="" element={<ResourcesPage />} />
                    <Route path="create" element={<CreateResourcePage />} />
                </Route>
                <Route path="reports" element={<ReportsPage />} />
                <Route path="metrics" element={<MetricsPage />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Suspense>
    );
};
