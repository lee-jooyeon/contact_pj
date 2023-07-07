import React from 'react';
import Lottie from 'react-lottie';
import Loading from '../lottie/loading.json';
import ContactItem from '../components/ContactItem';
import ErrorPage from './ErrorPage';
import Header from '../components/Header';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import useGetContact from '../hooks/queries/useGetContacts';
import { useAuthContext } from '../components/context/AuthContext';

export default function Contact() {
  const {logout} = useAuthContext();
  const navigate = useNavigate();
  const {isLoading, error, data} = useGetContact();

  if (isLoading) return 
    <div className='mt-40'>
      <Lottie 
        options={{
        loop: true,
        autoplay: true,
        animationData: Loading,
        rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
        },
      }}/>
    </div>;
  if (error) return <ErrorPage />;

  return (
    <>
      <Header 
        headerLeft 
        headerRight 
        handleLeftButton={() => navigate(-1)} 
        handleRightButton={() => navigate('/newcontact')}
        />
      <ul>
        {data && data.map(data => <ContactItem key={data.id} list={data} />)}
      </ul>
      <button onClick={logout}><FiLogOut className='absolute bottom-12 right-4 w-9 h-10 text-white' /></button>
    </>
  );
}
