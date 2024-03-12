import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavermapsProvider } from 'react-naver-maps';
import { PostContextProvider } from './context/PostContext';


const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavermapsProvider ncpClientId={process.env.REACT_APP_NAVERMAP_ID}
        submodules={['panorama', 'geocoder']} >
        <Navbar />
        <PostContextProvider>
          <Outlet />
        </PostContextProvider>
      </NavermapsProvider >
    </QueryClientProvider>
  )
}