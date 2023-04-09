import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Loader } from "../Loader/Loader";

const MainPage = lazy(() => import("../../pages/Main/MainPage"));
const ResourcesPage = lazy(() => import("../../pages/Resources/ResourcesPage"));
const CreateResourcePage = lazy(
    () => import("../../pages/CreateResource/CreateResourcePage")
);
const CreateMetricPage = lazy(
    () => import("../../pages/CreateMetric/CreateMetricPage")
);
const UpdateMetricPage = lazy(
    () => import("../../pages/CreateMetric/UpdateMetricPage")
);
const MetricsPage = lazy(() => import("../../pages/Metrics/MetricsPage"));
const ReportsPage = lazy(() => import("../../pages/Reports/ReportsPage"));
const CreateReportPage = lazy(
    () => import("../../pages/CreateReport/CreateReportPage")
);
const UpdateReportPage = lazy(
    () => import("../../pages/CreateReport/UpdateReportPage")
);
const TestReportPage = lazy(() => import("../../pages/Test/TestReportPage"));
const ReportPage = lazy(() => import("../../pages/Report/ReportPage"));

export const Router: React.FC = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="resources">
                    <Route path="" element={<ResourcesPage />} />
                    <Route path="create" element={<CreateResourcePage />} />
                </Route>
                <Route path="reports">
                    <Route path="" element={<ReportsPage />} />
                    <Route path=":reportId">
                        <Route path="" element={<UpdateReportPage />} />
                        <Route path="view" element={<ReportPage />} />
                    </Route>
                    <Route path="create" element={<CreateReportPage />} />
                </Route>
                <Route path="metrics">
                    <Route path="" element={<MetricsPage />} />
                    <Route path=":metricId" element={<UpdateMetricPage />} />
                    <Route path="create" element={<CreateMetricPage />} />
                </Route>
                <Route path="test/report" element={<TestReportPage />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Suspense>
    );
};
