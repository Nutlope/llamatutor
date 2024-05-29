import Image from 'next/image';

const Answer = ({ answer }: { answer: string }) => {
  return (
    <div className='container w-full flex gap-4 h-auto shrink-0 border bg-white rounded-lg border-solid border-[#C2C2C2] p-5 lg:p-10'>
      <div className='hidden lg:block'>
        <Image src='/img/Info.svg' alt='footer' width={24} height={24} />
      </div>
      <div className='w-full'>
        <div className='flex justify-between items-center pb-3'>
          <div className='flex gap-4'>
            <Image
              src='/img/Info.svg'
              alt='footer'
              width={24}
              height={24}
              className='block lg:hidden'
            />
            <h3 className='text-black text-base font-bold  uppercase'>
              Answer:{' '}
            </h3>
          </div>
          {answer && (
            <div className='flex gap-3 items-center'>
              <Image
                src='/img/link.svg'
                alt='footer'
                width={20}
                height={20}
                className='cursor-pointer'
              />
              <Image
                src='/img/copy.svg'
                alt='footer'
                width={20}
                height={20}
                className='cursor-pointer'
              />
              <Image
                src='/img/share.svg'
                alt='footer'
                width={20}
                height={20}
                className='cursor-pointer'
              />
            </div>
          )}
        </div>
        <div className='flex items-center content-center gap-[15px] flex-wrap'>
          <div className='text-black w-full text-base font-light leading-[152.5%] whitespace-pre-wrap'>
            {answer ? (
              answer
            ) : (
              <div className='flex flex-col gap-2 w-full'>
                <div className='animate-pulse rounded-md bg-gray-300 w-full h-6' />
                <div className='animate-pulse rounded-md bg-gray-300 w-full h-6' />
                <div className='animate-pulse rounded-md bg-gray-300 w-full h-6' />
                <div className='animate-pulse rounded-md bg-gray-300 w-full h-6' />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Answer;
