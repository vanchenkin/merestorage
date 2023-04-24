import { Metric, MetricData, Project } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { notification } from "antd";
import { Config } from "../../config";

export type CreateMetricProps = {
    projectId: Project["id"] | null;
    metric: Partial<Metric>;
};

export type MetricDataProps = {
    id: Metric["id"];
    page?: number;
    pageCount?: number;
};

export const metricsApi = createApi({
    reducerPath: "metricsApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${Config.ApiUrl}/` }),
    tagTypes: ["Metrics", "MetricData"],

    endpoints: (builder) => ({
        getAllMetrics: builder.query<Metric[], Project["id"] | null>({
            query: (projectId) => `/projects/${projectId}/metrics`,
            providesTags: ["Metrics"],
        }),

        createMetric: builder.mutation<Metric, CreateMetricProps>({
            query(props) {
                return {
                    url: `/projects/${props.projectId}/metrics`,
                    method: "POST",
                    body: props.metric,
                };
            },
            invalidatesTags: ["Metrics"],
            async onQueryStarted(_, { queryFulfilled }) {
                queryFulfilled.then(() => {
                    notification.success({
                        message: "Успешно",
                    });
                });
            },
        }),

        upsertMetric: builder.mutation<Metric, CreateMetricProps>({
            query(props) {
                return {
                    url: `/projects/${props.projectId}/metrics`,
                    method: "PUT",
                    body: props.metric,
                };
            },
            invalidatesTags: ["Metrics"],
            async onQueryStarted(_, { queryFulfilled }) {
                queryFulfilled.then(() => {
                    notification.success({
                        message: "Успешно",
                    });
                });
            },
        }),

        removeMetric: builder.mutation<Metric, Metric["id"]>({
            query(id) {
                return {
                    url: `/metrics`,
                    method: "DELETE",
                    body: {
                        id,
                    },
                };
            },
            invalidatesTags: ["Metrics"],
            async onQueryStarted(_, { queryFulfilled }) {
                queryFulfilled.then(() => {
                    notification.success({
                        message: "Успешно",
                    });
                });
            },
        }),

        getMetricData: builder.query<
            { data: MetricData[]; total: number },
            MetricDataProps
        >({
            query: ({ id, page = 1, pageCount = 20 }) =>
                `/metrics/${id}/data?page=${page}&pageCount=${pageCount}`,
            providesTags: (result) =>
                result
                    ? [
                          ...result.data.map(({ id }) => ({
                              type: "MetricData" as const,
                              id,
                          })),
                          { type: "MetricData", id: "PARTIAL-LIST" },
                      ]
                    : [{ type: "MetricData", id: "PARTIAL-LIST" }],
        }),

        collectMetric: builder.mutation<MetricData, Metric["id"]>({
            query(id) {
                return {
                    url: `/metrics/collect`,
                    method: "POST",
                    body: {
                        id,
                    },
                };
            },
            invalidatesTags: (_result, _error, id) => [
                { type: "MetricData", id },
                { type: "MetricData", id: "PARTIAL-LIST" },
            ],
            async onQueryStarted(_, { queryFulfilled }) {
                queryFulfilled.then(() => {
                    notification.success({
                        message: "Успешно",
                    });
                });
            },
        }),

        removeMetricData: builder.mutation<void, Metric["id"]>({
            query(id) {
                return {
                    url: `/metrics/data`,
                    method: "DELETE",
                    body: {
                        id,
                    },
                };
            },
            invalidatesTags: (_result, _error, id) => [
                { type: "MetricData", id },
                { type: "MetricData", id: "PARTIAL-LIST" },
            ],
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
    useGetAllMetricsQuery,
    useCreateMetricMutation,
    useRemoveMetricMutation,
    useUpsertMetricMutation,
    useCollectMetricMutation,
    useGetMetricDataQuery,
    useRemoveMetricDataMutation,
} = metricsApi;
