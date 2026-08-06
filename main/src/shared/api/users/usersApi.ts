import { baseApi } from "shared/api/index";

import type { UserProfileResponse } from "../model/types";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<UserProfileResponse, void>({
      query: () => "users/me",
    }),
  }),
});

export const { useGetMeQuery } = usersApi;
