import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query';
import { ACCESS_TOKEN_KEY } from '../../../../constants';

const baseQueryWithAuth =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' },
  ): BaseQueryFn<
    FetchArgs,
    unknown,
    FetchBaseQueryError,
    Record<string, unknown>,
    FetchBaseQueryMeta
  > =>
  async (args, api, extraOptions) => {
    const query = fetchBaseQuery({
      baseUrl: `${import.meta.env.VITE_API_BASE_URL}/${baseUrl}`,
      prepareHeaders: (headers) => {
        const token = window.localStorage.getItem(ACCESS_TOKEN_KEY);
        if (token) {
          headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
      },
    });
    const result = await query(args, api, extraOptions);
    const error = result.error;
    if (error && (error.status === 401 || error.status === 403)) {
      window.localStorage.removeItem(ACCESS_TOKEN_KEY);
      window.location.href = window.location.href;
    }
    return result;
  };

export default baseQueryWithAuth;
