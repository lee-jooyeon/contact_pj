import React from 'react';
import { MdOutlineArrowBackIosNew, MdAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export default function Header({headerLeft, headerRight, handleLeftButton, handleRightButton}) {
  const navigate = useNavigate();

  return (
    <header className='py-4 px-2.5 flex justify-center'>
      {headerLeft && (
        <span className='absolute left-1 self-center cursor-pointer' onClick={handleLeftButton}>
        <MdOutlineArrowBackIosNew className='text-white w-5 h-5' />
      </span>
      )}
      <div className='leading-8 text-lg font-medium uppercase font-semibold text-white self-center cursor-pointer' onClick={() => navigate('/')}>
        Contacts
      </div>
      {headerRight && (
        <span className='absolute right-1 self-center cursor-pointer' onClick={handleRightButton}>
          <MdAdd className='text-white w-8 h-8' />
        </span>
      )}
    </header>
  );
}
