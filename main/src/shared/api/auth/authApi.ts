import { baseApi } from "shared/api/index";

import type { LoginRequest, LoginResponse } from "../model/types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    authLogin: build.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useAuthLoginMutation } = authApi;
