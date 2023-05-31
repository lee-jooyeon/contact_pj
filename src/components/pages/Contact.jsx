import React from 'react';
import Lottie from "react-lottie";
import ContactItem from '../ContactItem';
import ErrorPage from './ErrorPage';
import Loading from '../../lottie/loading.json';
import useContact from "../../hooks/useContact";

export default function Contact() {
  const {
    contactQuery: { isLoading, error, data: lists },
  } = useContact();

  console.log(lists && lists);

  if (isLoading) return <div className="mt-40">
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
    <ul>
      {lists && lists.map(list => <ContactItem key={list.id} list={list} />)}
    </ul>
  );
}
