import {useQuery, QueryObserverResult} from 'react-query';
import { GetUserRepositoriesParams, GetUserRepositoriesResponse } from '../Types.main';
import { CommonErrorCodeType } from '../../../commons/Types.common';

export const useGetUserRepositoriesQueryKey = 'useGetUserRepositoriesQueryKey';

export function useGetUserRepositoriesQuery(params: GetUserRepositoriesParams): QueryObserverResult<GetUserRepositoriesResponse, CommonErrorCodeType> {
  return useQuery(
    [
      useGetUserRepositoriesQueryKey,
      params.username,
    ],
    async () => {
      const response = await fetch(`${process.env.REACT_APP_API_HOST}/users/${params.username}/repos`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`
        },
      });
      if (response.ok) {
        return response.json();
      }
    },
    {
      enabled: !!params.username,
      refetchOnWindowFocus: false,
      useErrorBoundary: true
    },
  );
}
