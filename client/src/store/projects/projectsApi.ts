import { Project } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { notification } from "antd";
import { Config } from "../../config";

export const projectsApi = createApi({
    reducerPath: "projectsApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${Config.ApiUrl}/projects` }),
    tagTypes: ["Projects"],
    endpoints: (builder) => ({
        getAllProjects: builder.query<Project[], void>({
            query: () => `/`,
            providesTags: ["Projects"],
        }),

        createProject: builder.mutation<Project, Partial<Project>>({
            query(body) {
                return {
                    url: `/`,
                    method: "POST",
                    body,
                };
            },
            invalidatesTags: ["Projects"],
            async onQueryStarted(_, { queryFulfilled }) {
                queryFulfilled.then(() => {
                    notification.success({
                        message: "Успешно",
                    });
                });
            },
        }),

        removeProject: builder.mutation<Project, Project["id"]>({
            query(id) {
                return {
                    url: `/`,
                    method: "DELETE",
                    body: {
                        id,
                    },
                };
            },
            invalidatesTags: ["Projects"],
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
    useGetAllProjectsQuery,
    useCreateProjectMutation,
    useRemoveProjectMutation,
} = projectsApi;
