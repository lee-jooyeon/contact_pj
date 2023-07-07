import React from "react";
import { useAuthContext } from "../components/context/AuthContext";
import { Navigate } from "react-router-dom";
import Loading from '../lottie/loading.json';
import Lottie from "react-lottie";

export default function ProtectedRoute({children}){
  const {user} = useAuthContext();
  console.log(user);

  if (user === undefined) {
    return (
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
    </div>
    )
  } else if(!user) {
    return <Navigate to='/' replace />
  }
  return children;
}