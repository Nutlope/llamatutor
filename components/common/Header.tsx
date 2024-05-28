import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <div className='container h-[60px] lg:h-[80px] px-4 lg:px-0'>
      <div className='grid grid-cols-12 h-full'>
        <div className='col-span-5'></div>
        <div className='col-span-2 flex justify-center items-center'>
          <Image
            src='/img/logo.svg'
            alt='logo'
            width={40}
            height={39}
            className='w-[35px] h-[33px] lg:w-10 lg:h-10'
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
