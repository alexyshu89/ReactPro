import { baseApi } from "shared/api/index";

import type { GetTasksResponse, Task } from "../model/types";

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<Task[], void>({
      query: () => "todos",
      transformResponse: (response: GetTasksResponse) => response.todos,
      providesTags: ["Tasks"],
    }),
  }),
});

export const { useGetTasksQuery } = tasksApi;
