import './SharedLayout.scss';
import { Outlet } from 'react-router-dom';
import BigSideBar from '../BigSideBar/BigSideBar';

const SharedLayout = () => {
  return (
    <main className='dashboard'>
      {/* <SmallSidebar /> */}
      <BigSideBar />
      <div className='dashboard-page'>
        <Outlet />
      </div>
    </main>
  );
};

export default SharedLayout;
