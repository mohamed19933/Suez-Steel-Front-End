import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetLogInUserData, ErrorToast, SuccessToast } from "../rtk/authSlice";
import { baseUrl } from "../../Api";

export const authAPI = createApi({
  reducerPath: "Auth",
  tagTypes: ["Auth"],
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    onQueryStarted: ({
      queryFulfilled,
      requestId,
      endpoint,
      baseQueryMeta,
    }) => {
      console.log("Request started for endpoint:", endpoint.name);
      console.log("Request headers:", baseQueryMeta.requestHeaders); // Log the headers
    },
  }),
  endpoints: (builder) => ({
    PostActions: builder.mutation({
      query: ({
        credentials,
        dispatch,
        successMessage,
        errorMessage,
        getUrl,
        loginpage,
      }) => ({
        url: getUrl,
        method: "POST",
        body: credentials,
        validateStatus: (response, result) => {
          if (response.status === 200) {
            if (loginpage) {
              GetLogInUserData(dispatch, result, successMessage);
            } else {
              SuccessToast(dispatch, successMessage);
            }
            let status = response.status;
            return { result, status };
          } else {
            ErrorToast(dispatch, errorMessage);
            throw new Error("Failed to log in");
          }
        },
      }),
    }),

    getData: builder.query({
      query: (url) => ({
        url: url,
        method: "GET",
      }),
      validateStatus: (response, result) => {
        if (response.status >= 200 && response.status < 300) {
          return result;
        } else {
          console.log("Result = ", result);
          console.log("response = ", response);

          throw new Error("Failed to fetch actions data");
        }
      },
    }),
  }),
});

export const { usePostActionsMutation, useGetDataQuery } = authAPI;
