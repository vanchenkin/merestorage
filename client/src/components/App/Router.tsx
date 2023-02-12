import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Loader } from "../Loader/Loader";

const MainPage = lazy(() => import("../../pages/Main/MainPage"));
const ResourcesPage = lazy(() => import("../../pages/ResourcesPage"));
const MetricsPage = lazy(() => import("../../pages/MetricsPage"));
const ReportsPage = lazy(() => import("../../pages/ReportsPage"));

export const Router: React.FC = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/resources" element={<ResourcesPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/metrics" element={<MetricsPage />} />
            </Routes>
        </Suspense>
    );
};
