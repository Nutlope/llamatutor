import Image from 'next/image';
import React, { FC } from 'react';
import InputArea from './InputArea';
import { suggestions } from './data';

type THeroProps = {
  promptValue: string;
  setPromptValue: React.Dispatch<React.SetStateAction<string>>;
  handleDisplayResult: () => void;
};

const Hero: FC<THeroProps> = ({
  promptValue,
  setPromptValue,
  handleDisplayResult,
}) => {
  const handleClickSuggestion = (value: string) => {
    setPromptValue(value);
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <a
        className='inline-flex h-7 items-center gap-[9px] shrink-0 bg-white shadow-[0px_1px_1px_0px_rgba(0,0,0,0.25)] px-2.5 py-1 rounded-[50px] border-[0.5px] border-solid border-[#E6E6E6] mb-4'
        href='https://www.together.ai/'
        target='_blank'
      >
        <Image src='/img/together-ai.png' alt='hero' width={18} height={18} />
        <span className='text-[#1B1B16] text-center text-base   font-light leading-[normal]'>
          Powered by Together AI
        </span>
      </a>
      <h2 className='text-center text-3xl lg:text-[64px] font-semibold leading-[normal] bg-custom-gradient bg-clip-text pb-7 pt-2 '>
        Search smarter & faster
      </h2>

      {/* input section */}
      <div className='max-w-[708px] w-full pb-6 '>
        <InputArea
          promptValue={promptValue}
          setPromptValue={setPromptValue}
          handleDisplayResult={handleDisplayResult}
        />
      </div>

      {/* Suggestions section */}
      <div className='flex flex-wrap lg:flex-nowrap items-center gap-2.5 pb-[30px] sm:justify-normal justify-center '>
        {suggestions.map((item) => (
          <div
            className='rounded border flex cursor-pointer bg-[#EDEDEA] border-solid border-[#C1C1C1] h-[35px] justify-center items-center gap-[5px] px-2.5 py-2'
            onClick={() => handleClickSuggestion(item?.name)}
            key={item.id}
          >
            <Image
              src={item.icon}
              alt={item.name}
              width={18}
              height={16}
              className='w-[18px]'
            />
            <span className='text-[#1B1B16] text-sm   font-light leading-[normal]'>
              {item.name}
            </span>
          </div>
        ))}
      </div>

      {/* Github link section */}
      <p className='text-[#1B1B16] text-center text-sm   font-light leading-[normal]'>
        Fully open source!{' '}
        <span className='text-sm font-medium underline'>
          <a
            href='https://github.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            Star it on github.
          </a>
        </span>
      </p>
    </div>
  );
};

export default Hero;
