import { Result } from "antd";
import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { useGetAllReportsQuery } from "../../store/reports/reportsApi";
import { useAppSelector } from "../../store/store";

import { CreateReportPage } from "./CreateReportPage";

const UpdateReportPage: React.FC = () => {
    const { reportId } = useParams();
    const project = useAppSelector((state) => state.context.project);

    const { data: reports, isLoading } = useGetAllReportsQuery(project);

    const memoReport = useMemo(
        () => reports?.find((report) => report.id === Number(reportId)) || null,
        [reports, reportId]
    );

    if (isLoading) {
        return <Loader />;
    }

    if (!memoReport) {
        return <Result status="error" title="Отчет не найден" />;
    }

    return <CreateReportPage initialValues={memoReport} />;
};

export default UpdateReportPage;
