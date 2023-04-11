import { Outlet } from 'react-router-dom';
import NavBar from '../NavBar';

export default function Layout() {
  return (
    <div>
      <NavBar />
      {/* 해당하는 부분만 라우팅하고 싶다면 (변경하고싶다면) 원하는 자식 루트는 outlet에다가 위치할 수 있다 */}
      <Outlet />
    </div>
  );
}