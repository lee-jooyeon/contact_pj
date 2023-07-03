import React from 'react';
import Lottie from 'react-lottie';
import Loading from '../lottie/loading.json';
import ContactItem from '../components/ContactItem';
import ErrorPage from './ErrorPage';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getLists } from '../api/firebase';

export default function Contact() {
  const navigate = useNavigate();
  const {isLoading, error, data} = useQuery(['useGetContact'], () => getLists(), {staleTime: 1000 * 60});

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
    </>
  );
}
