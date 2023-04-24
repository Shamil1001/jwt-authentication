import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../../features/auth/authSlice";

interface BaseProps {
  auth: {
    token: string;
  };
}

const baseQuery = fetchBaseQuery({
  baseUrl: "",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (
  args: string,
  api: any,
  extraOptions: string
) => {
  let result = await baseQuery(args, api, extraOptions);
  if(result?error?.originalStatus===403){
        console.log('sending refresh token')
        const refreshResult=await baseQuery('/refresh', api, extraOptions)
        console.log(refreshResult)
        if(refreshResult?.data){
            const user=api.getState().auth.user
            api.dispath(setCredentials({...refreshResult.data, user}))
            result =await baseQuery(args, api, extraOptions)
        }
        else{
            api.dispath(logOut())
        }

  }
  else{

  }
};
