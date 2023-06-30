import React from 'react';
import Lottie from 'react-lottie';
import Loading from '../lottie/loading.json';
import ContactItem from '../components/ContactItem';
import ErrorPage from './ErrorPage';
import useContact from '../hooks/useContact';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

export default function Contact() {
  const navigate = useNavigate();
  const {
    contactQuery: { isLoading, error, data: lists },
  } = useContact();

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
        {lists && lists.map(list => <ContactItem key={list.id} list={list} />)}
      </ul>
    </>
  );
}
