import { Metric, Project } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { notification } from "antd";
import { Config } from "../../config";

export type CreateMetricProps = {
    projectId: Project["id"];
    metric: Partial<Metric>;
};

export const metricsApi = createApi({
    reducerPath: "metricsApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${Config.ApiUrl}/` }),
    tagTypes: ["Metrics"],
    endpoints: (builder) => ({
        getAllMetrics: builder.query<Metric[], Project["id"]>({
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
    }),
});

export const {
    useGetAllMetricsQuery,
    useCreateMetricMutation,
    useRemoveMetricMutation,
} = metricsApi;
