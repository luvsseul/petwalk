import { useQuery } from '@tanstack/react-query';
import React, { createContext, useContext } from 'react';
import { getPost } from '../api/firebase';

const PostContext = createContext();

export function PostContextProvider({ children }) {
    const { isLoading, error, data: post } = useQuery({
        queryKey: ['post'],
        queryFn: getPost,
        staleTime: 1000 * 60 * 5,
        retry: 2,
      });

  return (
    <PostContext.Provider value={{ isLoading, error, post }}>
      {children}
    </PostContext.Provider>
  );
}

export function usePostContext() {
  return useContext(PostContext);
}