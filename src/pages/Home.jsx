import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../components/context/AuthContext';

export default function Home() {
  const {user, login} = useAuthContext();
  const publicUrl = process.env.PUBLIC_URL;
  const navigate = useNavigate();

  const useLogin = () => {
    login().then(() => {
      setTimeout(() => {
        navigate('/contacts')
      }, 500);
    });
  }

  return (
    <div className='absolute left-2/4 top-2/4 -translate-x-1/2 -translate-y-1/2'>
      {user ? <img src={user?.photoURL} alt='user' className='w-24- h-40 mx-auto my-0 rounded-full'/> :
        <img
          src={`${publicUrl}/images/emoji_.png`}
          alt='image'
          className='w-24- h-40 mx-auto my-0'
        /> 
      }
      {!user && <button className='contact_btn' onClick={useLogin}>LOGIN</button>}
      {user && <button className='contact_btn' onClick={() => navigate('/contacts')}>{user?.displayName}</button>}
    </div>
  );
}
