import React from 'react';
import Loading from '../../molecules/Loader';

const LoadingScreen: React.FC = () => {
  return (
    <div className='flex items-center justify-center w-screen h-screen bg-neutral-800'>
      <div className='flex justify-center items-center rounded-xl bg-opacity-50 w-24 h-24'>
        <Loading />
      </div>
    </div>
  );
};

export default LoadingScreen;
