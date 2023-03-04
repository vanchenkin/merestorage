import { Project, Resource } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { notification } from "antd";
import { Config } from "../../config";

export type CreateResourceProps = {
    projectId: Project["id"];
    resource: Partial<Resource>;
};

export const resourcesApi = createApi({
    reducerPath: "resourcesApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${Config.ApiUrl}/` }),
    tagTypes: ["Resources"],
    endpoints: (builder) => ({
        getAllResources: builder.query<Resource[], Project["id"]>({
            query: (projectId) => `/projects/${projectId}/resources`,
            providesTags: ["Resources"],
        }),
        createResource: builder.mutation<Resource, CreateResourceProps>({
            query(props) {
                return {
                    url: `/projects/${props.projectId}/resources`,
                    method: "POST",
                    body: props.resource,
                };
            },
            invalidatesTags: ["Resources"],
            async onQueryStarted(_, { queryFulfilled }) {
                queryFulfilled.then(() => {
                    notification.success({
                        message: "Успешно",
                    });
                });
            },
        }),
        removeResource: builder.mutation<Resource, Resource["id"]>({
            query(id) {
                return {
                    url: `/resources`,
                    method: "DELETE",
                    body: {
                        id,
                    },
                };
            },
            invalidatesTags: ["Resources"],
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
    useGetAllResourcesQuery,
    useCreateResourceMutation,
    useRemoveResourceMutation,
} = resourcesApi;
