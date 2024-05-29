import Image from 'next/image';

const SourceCard = ({ source }: { source: { name: string; url: string } }) => {
  return (
    <div className='flex items-center gap-2.5 w-full md:w-auto rounded border bg-neutral-50 px-1.5 py-1 h-[79px]  border-solid border-[#C1C1C1]'>
      <div className=''>
        <Image
          src={`https://www.google.com/s2/favicons?domain=${source.url}&sz=128`}
          alt={source.url}
          className='p-1'
          width={44}
          height={44}
        />
      </div>
      <div className='flex flex-col justify-center gap-[7px]  max-w-[192px]'>
        <h6 className='text-[#1B1B16] text-sm font-light leading-[normal] line-clamp-2'>
          {source.name}
        </h6>
        <a
          target='_blank'
          rel='noopener noreferrer'
          href={source.url}
          className=' text-[#1B1B16]/30 text-sm font-light truncate'
        >
          {source.url}
        </a>
      </div>
    </div>
  );
};

export default SourceCard;
