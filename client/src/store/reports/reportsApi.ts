import { Report, Project } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { notification } from "antd";
import { ReportRowType } from "../../../../common/types/ReportRowType";
import { QueryType } from "../../../../common/types/reports/grammarMapper";
import { QueryResponse } from "../../../../common/types/reports/QueryResponse";
import { Config } from "../../config";

export type CreateReportProps = {
    projectId: Project["id"] | null;
    report: Partial<Report>;
};

export type GetPreviewProps = {
    projectId: Project["id"] | null;
    query: {
        type: ReportRowType;
        query: QueryType;
    };
};

export const reportsApi = createApi({
    reducerPath: "reportsApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${Config.ApiUrl}/` }),
    tagTypes: ["Reports", "Report"],
    endpoints: (builder) => ({
        getReport: builder.query<Report, Report["id"]>({
            query: (reportId) => `/reports/${reportId}`,
            providesTags: ["Report"],
        }),

        getAllReports: builder.query<Report[], Project["id"] | null>({
            query: (projectId) => `/projects/${projectId}/reports`,
            providesTags: ["Reports"],
        }),

        createReport: builder.mutation<Report, CreateReportProps>({
            query(props) {
                return {
                    url: `/projects/${props.projectId}/reports`,
                    method: "POST",
                    body: props.report,
                };
            },
            invalidatesTags: ["Reports"],
            async onQueryStarted(_, { queryFulfilled }) {
                queryFulfilled.then(() => {
                    notification.success({
                        message: "Успешно",
                    });
                });
            },
        }),

        upsertReport: builder.mutation<Report, CreateReportProps>({
            query(props) {
                return {
                    url: `/projects/${props.projectId}/reports`,
                    method: "PUT",
                    body: props.report,
                };
            },
            invalidatesTags: ["Reports", "Report"],
            async onQueryStarted(_, { queryFulfilled }) {
                queryFulfilled.then(() => {
                    notification.success({
                        message: "Успешно",
                    });
                });
            },
        }),

        removeReport: builder.mutation<Report, Report["id"]>({
            query(id) {
                return {
                    url: `/reports`,
                    method: "DELETE",
                    body: {
                        id,
                    },
                };
            },
            invalidatesTags: ["Reports", "Report"],
            async onQueryStarted(_, { queryFulfilled }) {
                queryFulfilled.then(() => {
                    notification.success({
                        message: "Успешно",
                    });
                });
            },
        }),

        getPreviewData: builder.mutation<QueryResponse, GetPreviewProps>({
            query({ query, projectId }) {
                return {
                    url: `/projects/${projectId}/query`,
                    method: "POST",
                    body: query,
                };
            },
        }),
    }),
});

export const {
    useGetReportQuery,
    useGetAllReportsQuery,
    useGetPreviewDataMutation,
    useCreateReportMutation,
    useRemoveReportMutation,
    useUpsertReportMutation,
} = reportsApi;
