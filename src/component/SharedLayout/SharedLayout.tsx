import { Outlet } from 'react-router-dom';

import './SharedLayout.scss';
import NavBar from '../NavBar/NavBar';

const SharedLayout = () => {
  return (
    <main className='dashboard'>
      <NavBar />
      <div className='dashboard-page'>
        <Outlet />
      </div>
    </main>
  );
};

export default SharedLayout;
