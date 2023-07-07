import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet } from 'react-router-dom';
import { AuthContextProvider } from '../components/context/AuthContext';

const queryClient = new QueryClient();

export default function Root() {

  return (
    <div className='relative h-screen w-full overflow-y-scroll bg-[#22223a] px-[1.5rem]'>
      <QueryClientProvider client={queryClient}> 
        <AuthContextProvider>
          <Outlet />
        </AuthContextProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}
