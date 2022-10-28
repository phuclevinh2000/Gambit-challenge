import { useState } from 'react';
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/userSlice';
import { login } from '../../redux/features/userSlice';
import { useNavigate } from 'react-router-dom';
import './Login.scss';

function Login() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const loginToApp = (e: any) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
          })
        );
      })
      .catch((err) => {
        alert(err);
      });
  };

  const register = () => {
    console.log('register the user');

    createUserWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        // @ts-ignore
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
          })
        );
      })
      .catch((err) => {
        alert(err);
      });
  };

  if (user) {
    navigate('/');
  }

  return (
    <div className='login'>
      <div className='login-leftpanel'>
        <div className='login-info'>
          <h2 className='login-leftpanel-title'>TUF-2000M</h2>
          <p className='login-leftpanel-description'>
            Login to see the modbus data return from ultrasonic energy meter
            TUF-2000M
          </p>
          <form className='login-leftpanel-form'>
            <div className='login-form-element'>
              <p className='login-form-title'>Username</p>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Your login email account'
                type='email'
              />
            </div>
            <div className='login-form-element'>
              <p className='login-form-title'>Password</p>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Your login password'
                type={passwordShown ? 'text' : 'password'}
              />
            </div>

            <div className='login-show-password'>
              <input
                onClick={() => setPasswordShown(!passwordShown)}
                type='checkbox'
              />
              <label>Show password</label>
              <br></br>
            </div>

            <button
              className='login-form-submit-button'
              type='submit'
              onClick={loginToApp}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
      <img
        className='modbus-login-rightpanel'
        src='./assets/images/gambit-login-background.jpg'
        alt='login background'
      />
    </div>
  );
}

export default Login;
