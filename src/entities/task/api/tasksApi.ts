import { baseApi } from "shared/api/index";

import type { Task } from "../model/types";

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<Task[], void>({
      query: () => "todos",
      transformResponse: (response: Task[]) =>
        response.slice(0, 30).map((t) => ({
          id: String(t.id),
          title: t.title,
          completed: t.completed,
        })),
      providesTags: ["Tasks"],
    }),
  }),
});

export const { useGetTasksQuery } = tasksApi;
