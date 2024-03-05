import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavermapsProvider } from 'react-naver-maps';


const queryClient = new QueryClient();

export default function App() {
  return (
    <NavermapsProvider ncpClientId={process.env.REACT_APP_NAVERMAP_ID}
      submodules={['panorama', 'geocoder']} >
      <Navbar />
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </NavermapsProvider >
  )
}