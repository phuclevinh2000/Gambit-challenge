import { useDispatch, useSelector } from 'react-redux';

import './NavBar.scss';
import { RootState } from '../../redux/store';
import { logout } from '../../redux/features/userSlice';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

const NavBar = () => {
  const user: any = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  if (user)
    return (
      <div className='navbar'>
        <img
          className='navbar-logo'
          src='./assets/icons/gambit-logo.svg'
          alt='gambit logo'
        />
        <div className='navbar-right'>
          <p className='navbar-right-user'>
            <PersonIcon />: {user.email}
          </p>
          <div
            onClick={() => dispatch(logout())}
            className='navbar-right-button'
          >
            <LogoutIcon />
          </div>
        </div>
      </div>
    );
  else return <></>;
};

export default NavBar;
