import Image from 'next/image';

const SimilarTopics = ({
  similarQuestions,
  handleDisplayResult,
  reset,
}: {
  similarQuestions: string[];
  handleDisplayResult: (item: string) => void;
  reset: () => void;
}) => {
  return (
    <div className='container w-full flex gap-4 h-auto shrink-0 border bg-white rounded-lg border-solid border-[#C2C2C2] lg:p-10 p-5'>
      <div className='hidden lg:block'>
        <Image
          src='/img/similarTopics.svg'
          alt='footer'
          width={24}
          height={24}
        />
      </div>
      <div className='divide-y divide-[#E5E5E5] flex-1'>
        <div className='flex gap-4 pb-3'>
          <Image
            src='/img/similarTopics.svg'
            alt='footer'
            width={24}
            height={24}
            className='block lg:hidden'
          />
          <h3 className='text-black text-base font-bold  uppercase'>
            Similar topics:{' '}
          </h3>
        </div>

        <div className=' max-w-[890px] divide-y divide-[#E5E5E5] space-y-[15px]'>
          {similarQuestions.length > 0 ? (
            similarQuestions.map((item) => (
              <button
                className='flex items-center gap-4 pt-3.5 cursor-pointer'
                key={item}
                onClick={() => {
                  reset();
                  handleDisplayResult(item);
                }}
              >
                <div className='flex items-center'>
                  <Image
                    src='/img/arrow-circle-up-right.svg'
                    alt='footer'
                    width={24}
                    height={24}
                  />
                </div>
                <p className='text-[#1B1B16] [leading-trim:both] [text-edge:cap] text-sm font-light leading-[normal]'>
                  {item}
                </p>
              </button>
            ))
          ) : (
            <>
              <div className='animate-pulse rounded-md bg-gray-300 max-w-sm w-[260px] h-20' />
              <div className='animate-pulse rounded-md bg-gray-300 max-w-sm w-[260px] h-20' />
              <div className='animate-pulse rounded-md bg-gray-300 max-w-sm w-[260px] h-20' />
              <div className='animate-pulse rounded-md bg-gray-300 max-w-sm w-[260px] h-20' />
              <div className='animate-pulse rounded-md bg-gray-300 max-w-sm w-[260px] h-20' />
              <div className='animate-pulse rounded-md bg-gray-300 max-w-sm w-[260px] h-20' />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimilarTopics;
