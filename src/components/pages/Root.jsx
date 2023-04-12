import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import NavBar from '../NavBar';

const queryClient = new QueryClient();

export default function Root() {
  return (
    <div>
      <NavBar />
      {/* 해당하는 부분만 라우팅하고 싶다면 (변경하고싶다면) 원하는 자식 루트는 outlet에다가 위치할 수 있다 */}
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </div>
  );
}
