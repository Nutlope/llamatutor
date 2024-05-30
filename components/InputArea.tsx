import Image from 'next/image';
import { FC } from 'react';
import TypeAnimation from './TypeAnimation';

type TInputAreaProps = {
  promptValue: string;
  setPromptValue: React.Dispatch<React.SetStateAction<string>>;
  handleDisplayResult: () => void;
  disabled?: boolean;
  reset?: () => void;
};

const InputArea: FC<TInputAreaProps> = ({
  promptValue,
  setPromptValue,
  handleDisplayResult,
  disabled,
  reset,
}) => {
  return (
    <form
      className='border bg-white shadow-[2px_2px_38px_0px_rgba(0,0,0,0.25),0px_-2px_4px_0px_rgba(0,0,0,0.25)_inset,1px_2px_4px_0px_rgba(0,0,0,0.25)_inset] rounded-lg h-[66px] w-full flex justify-between items-center px-3 mx-auto'
      onSubmit={(e) => {
        e.preventDefault();
        if (reset) reset();
        handleDisplayResult();
      }}
    >
      <input
        type='text'
        placeholder='Ask anything'
        className=' focus-visible::outline-0 focus-visible:ring-offset-0 focus-visible:ring-0 outline-none my-1 text-[#1B1B16]/30 text-xl not-italic font-light leading-[normal] w-full pl-5 text-black'
        disabled={disabled}
        value={promptValue}
        required
        onChange={(e) => setPromptValue(e.target.value)}
      />
      <button
        disabled={disabled}
        type='submit'
        className='w-[50px] h-[50px] shrink-0 bg-[linear-gradient(154deg,#1B1B16_23.37%,#565646_91.91%)] rounded-[3px] flex justify-center items-center relative disabled:pointer-events-none disabled:opacity-75'
      >
        {disabled && (
          <div className='absolute inset-0 flex justify-center items-center'>
            <TypeAnimation />
          </div>
        )}

        <Image
          src={'/img/arrow-narrow-right.svg'}
          alt='search'
          width={24}
          height={24}
          className={disabled ? 'invisible' : ''}
        />
      </button>
    </form>
  );
};

export default InputArea;
