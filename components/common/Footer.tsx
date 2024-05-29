import Image from 'next/image';
import Link from 'next/link';

const Footer = ({ onReset }: { onReset: () => void }) => {
  return (
    <>
      <div className=' container px-4 lg:px-0 min-h-[72px] lg:py-5 pt-5 flex justify-between items-center border-t border-[#D2D2D2] lg:min-h-[72px] pb-3'>
        <a
          href='/'
          className='flex items-center gap-2.5'
          // onClick={(e) => {
          //   let isUnmodifiedLeftClick = !e.ctrlKey && !e.metaKey;
          //   if (isUnmodifiedLeftClick) {
          //     e.preventDefault();
          //     onReset();
          //   }
          // }}
        >
          <Image src='/img/logo.svg' alt='footer' width={31} height={30} />
          <span className='text-base   font-medium leading-[normal]'>
            TurboSeek.io
          </span>
        </a>
        <div className='flex items-center gap-3'>
          <Link href={'https://x.com/nutlope'} target='_blank'>
            <Image src='/img/x.svg' alt='twitter' width={15} height={15} />
          </Link>
          <Link href={'https://github.com/nutlope/turboseek'} target='_blank'>
            <Image
              src={'/img/github-footer.svg'}
              alt='facebook'
              width={16}
              height={16}
            />{' '}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Footer;
