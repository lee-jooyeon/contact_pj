import React from 'react';
import { MdOutlineArrowBackIosNew, MdAdd } from 'react-icons/md';

export default function Header({headerLeft, headerRight, handleMain, handleLeftButton, handleRightButton}) {
  return (
    <header className='py-4 px-2.5 flex justify-center'>
      {headerLeft && (
        <span className='absolute left-1 self-center cursor-pointer' onClick={handleLeftButton}>
        <MdOutlineArrowBackIosNew className='text-white w-5 h-5' />
      </span>
      )}
      <div className='leading-8 text-lg font-medium uppercase text-white self-center' onClick={handleMain}>
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
