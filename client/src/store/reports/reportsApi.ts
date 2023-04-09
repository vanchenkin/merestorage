import { Report, Project } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { notification } from "antd";
import { ReportRowType } from "../../../../common/types/ReportRow/ReportRowType";
import { Config } from "../../config";

export type CreateReportProps = {
    projectId: Project["id"] | null;
    report: Partial<Report>;
};

export type GetPreviewProps = {
    projectId: Project["id"] | null;
    query: {
        string: string;
        type: ReportRowType;
    };
};

export type GetPreviewResponse = {
    hit: any;
    type: ReportRowType;
};

export const reportsApi = createApi({
    reducerPath: "reportsApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${Config.ApiUrl}/` }),
    tagTypes: ["Reports"],
    endpoints: (builder) => ({
        getAllReports: builder.query<Report[], Project["id"] | null>({
            query: (projectId) => `/projects/${projectId}/reports`,
            providesTags: ["Reports"],
        }),
        getPreviewData: builder.mutation<GetPreviewResponse, GetPreviewProps>({
            query({ query, projectId }) {
                return {
                    url: `/projects/${projectId}/query`,
                    method: "POST",
                    body: query,
                };
            },
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
            invalidatesTags: ["Reports"],
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
            invalidatesTags: ["Reports"],
            async onQueryStarted(_, { queryFulfilled }) {
                queryFulfilled.then(() => {
                    notification.success({
                        message: "Успешно",
                    });
                });
            },
        }),
    }),
});

export const {
    useGetAllReportsQuery,
    useGetPreviewDataMutation,
    useCreateReportMutation,
    useRemoveReportMutation,
    useUpsertReportMutation,
} = reportsApi;
