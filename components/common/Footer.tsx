import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <>
      <div className=' container px-4 lg:px-0 min-h-[72px] lg:py-5 pt-5 flex justify-between items-center border-t border-[#D2D2D2] lg:min-h-[72px] pb-3'>
        <Link
          href={'https://turboSeek.io'}
          target='_blank'
          className='flex items-center gap-2.5'
        >
          <Image src='/img/logo.svg' alt='footer' width={31} height={30} />
          <span className='text-base   font-medium leading-[normal]'>
            TurboSeek.io
          </span>
        </Link>
        {/* <div className='hidden lg:block'>
          <p className='text-[#1B1B16]/70 text-sm   font-light leading-[normal]'>
            Powered by Together.ai, Llama-3, and Bing
          </p>
        </div> */}
        <div className='flex items-center gap-3'>
          <Link href={'https://x.com/home?lang=en'} target='_blank'>
            <Image src='/img/x.svg' alt='twitter' width={15} height={15} />
          </Link>
          <Link href={'https://github.com/'} target='_blank'>
            <Image
              src={'/img/github-footer.svg'}
              alt='facebook'
              width={16}
              height={16}
            />{' '}
          </Link>
        </div>
      </div>
      {/* <p className='text-[#1B1B16]/70 text-sm pb-5 lg:hidden block  text-center font-light leading-[normal]'>
    Powered by Together.ai, Llama-3, and Bing
   </p> */}
    </>
  );
};

export default Footer;
