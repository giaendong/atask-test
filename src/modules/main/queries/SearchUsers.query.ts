import {useQuery, QueryObserverResult} from 'react-query';
import { SearchUserParams, SearchUserResponse } from '../Types.main';
import { CommonErrorCodeType } from '../../../commons/Types.common';

export const useSearchUsersQueryKey = 'useSearchUsersQueryKey';

export function useSearchUsersQuery(params: SearchUserParams): QueryObserverResult<SearchUserResponse, CommonErrorCodeType> {
  return useQuery(
    [
      useSearchUsersQueryKey,
      params.q,
      params.page,
      params.per_page
    ],
    async () => {
      const response = await fetch(`${process.env.REACT_APP_API_HOST}/search/users?q=${params.q}+in:user&per_page=${params.per_page}&page=${params.page}`, {
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
      enabled: !!params.q,
      refetchOnWindowFocus: false,
      useErrorBoundary: true
    },
  );
}
