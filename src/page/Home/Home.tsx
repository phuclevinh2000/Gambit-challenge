import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from '../../redux/features/userSlice';
import { auth, onAuthStateChanged } from '../../firebase';
import Login from '../Login/Login';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
  }
  return (
    <div className='app__body'>
      <button onClick={() => dispatch(logout())}>Log out</button>
    </div>
  );
};

export default Home;
