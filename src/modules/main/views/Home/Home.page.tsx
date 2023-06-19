import React, { ChangeEvent, Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Input from '../../../../components/atoms/Input';
import { debounce } from 'lodash';
import Button from '../../../../components/atoms/Button';
import { useSearchUsersQuery, useSearchUsersQueryKey } from '../../queries/SearchUsers.query';
import { useQueryClient } from 'react-query';
import Loader from '../../../../components/molecules/Loader/Loader.molecule';
import { useGetUserRepositoriesQuery } from '../../queries/GetUserRepositories.query';

const Home: React.FC = (() => {
  const queryClient = useQueryClient();
  const [searchText, setSearchText] = useState('');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isTabActive, setIsTabActive] = useState(false);

  // TODO: update with pagination if needed
  const page = 1;
  const per_page = 5;

  const {data, isError, isLoading} = useSearchUsersQuery({q: searchText, page, per_page});
  const users = useMemo(() => data?.items, [data?.items]);

  const userRepositoriesQuery = useGetUserRepositoriesQuery({username: activeId});
  const repositories = useMemo(() => userRepositoriesQuery.data, [userRepositoriesQuery.data]);

  // We are using useRef to prevent function recreated on every render
  const debouncedSearch = useRef(
    debounce(value => {
      setSearchText(value)
    }, 1000)
  ).current;

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  // we are using debounce for auto search
  const handleSearchText = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value)
  }, [debouncedSearch])

  // Button only used for refetching
  const handleSearchButton = useCallback(() => {
    queryClient.refetchQueries([useSearchUsersQueryKey, searchText, page, per_page])
  }, [queryClient, searchText])

  const handleExpand = useCallback((username: string) => {
    if (activeId !== username) {
      setActiveId(username);
      setIsTabActive(true)
    } else {
      setIsTabActive(!isTabActive);
    }
  }, [activeId, isTabActive])

  const renderUser = useMemo(() => 
    users?.map((user) => {
      const isActive = user.login === activeId && isTabActive
      return (
        <Fragment key={user.id}>
          <div className='flex flex-row w-full bg-neutral-200 justify-between items-center p-3 cursor-pointer rounded' role='button' onClick={() => handleExpand(user.login)}>
            <span>{user.login}</span>
            <span>{isActive ? <span>&#x25B2;</span> : <span>&#x25BC;</span>}</span>
          </div>
          {
            isActive && repositories && repositories.length > 0 &&
              repositories?.map((repo) => 
                <div className='flex flex-col w-11/12 self-end bg-neutral-300 p-3 rounded' key={repo.id}>
                  <div className='flex flex-row items-center justify-between font-bold'>
                    <h3><a href={repo.html_url} target="_blank" rel="noreferrer" className='decoration-inherit no-underline'>{repo.name}</a></h3>
                    <span>{repo.stargazers_count} &#9733;</span>
                  </div>
                  <span className='text-sm'>{repo.description}</span>
                </div>
              )
          }
          {
            isActive && userRepositoriesQuery.isLoading && <Loader />
          }
          {
            isActive && !userRepositoriesQuery.isLoading && repositories && repositories.length === 0 && <span className='text-xs text-neutral-600 text-center'>This user has no repositories exist.</span>
          }
        </Fragment>
      )
    })
  ,[activeId, handleExpand, isTabActive, repositories, userRepositoriesQuery.isLoading, users])

  return (
    <div className='w-screen flex justify-center p-3'>
      <div className='w-full lg:w-1/3 flex flex-col items-center gap-3'>
        <Input placeholder='Enter username (live search)' onChange={handleSearchText} className='w-full'/>
        <Button buttonType='filled' onClick={handleSearchButton} disabled={!searchText} className='w-full'>Search (refetch)</Button>
        {
          isLoading && <Loader />
        }
        {
          ((!isLoading && searchText && (!users || users.length === 0)) || isError) && 
          <span className='text-xs text-red-400 text-center'>
            {
              isError ?
                'Something Went Wrong' :
                'The listed users cannot be searched either because the users do not exist or you do not have permission to view the users.'
            }
          </span>
        }
        {
          renderUser
        }
      </div>
    </div>
  )
});

export default Home;