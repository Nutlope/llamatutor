'use client';
import Answer from '@/components/Answer';
import Hero from '@/components/Hero';
import InputArea from '@/components/InputArea';
import SimilarTopics from '@/components/SimilarTopics';
import Sources from '@/components/Sources';
import TypeAnimation from '@/components/TypeAnimation';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [promptValue, setPromptValue] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [messages, setMessages] = useState<any[]>([]); //any[] use for temporary, It will update accordingly backend data schema
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  console.log(messages);

  const handleDisplayResult = () => {
    setShowResult(true);
    setLoading(true);
    // api or others connectivity will be handled here
    if (promptValue?.length > 0) {
      if (messages?.length === 0) {
        setMessages([
          {
            message: promptValue,
            type: 'USER',
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            message: promptValue,
            type: 'USER',
          },
        ]);
      }

      // step response delay
      // set timeout used instead of api
      const timeOut = setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            message: '',
            type: 'SYSTEM',
          },
        ]);
        setLoading(false);
      }, 3000);
      // clear timeout
      return () => {
        clearTimeout(timeOut);
      };
    }
  };
  useEffect(() => {
    // Scroll to the bottom whenever messages change
    if (chatContainerRef.current && messages?.length > 0) {
      chatContainerRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <main className=' px-4 pb-4 h-full'>
      {showResult || (
        <Hero
          promptValue={promptValue}
          setPromptValue={setPromptValue}
          handleDisplayResult={handleDisplayResult}
        />
      )}
      {/* result components. this components display depend on system response */}
      {showResult && messages?.length > 0 && (
        <div className='w-full grow h-full min-h-[68vh] flex flex-col justify-between '>
          <div className='w-full container space-y-2'>
            {messages?.map((message: any, i: number) => (
              <div className='container space-y-2' key={i}>
                {message?.type === 'USER' && (
                  <div className='w-full flex items-start gap-3 container px-5 lg:px-10 pt-2'>
                    <div className='w-fit flex gap-4 items-center'>
                      <Image
                        src={'/img/message-question-circle.svg'}
                        alt='message'
                        width={30}
                        height={30}
                        className='size-[24px]'
                      />
                      <p className='text-black font-bold leading-[152%] uppercase'>
                        Question:
                      </p>
                    </div>
                    <div className='grow'>&quot;{message?.message}&quot;</div>
                  </div>
                )}
                {message?.type === 'SYSTEM' && (
                  <>
                    <Sources />
                    <Answer />
                    <SimilarTopics />
                  </>
                )}
              </div>
            ))}
            {loading && (
              <div className='flex items-center gap-5 lg:gap-6 justify-start px-5 lg:px-10'>
                <Image
                  src={'/img/Info.svg'}
                  width={24}
                  height={24}
                  alt='info'
                  className='rounded-full w-6 h-6'
                />
                <TypeAnimation />
              </div>
            )}
            <div className='pt-1 sm:pt-2' ref={chatContainerRef}></div>
          </div>
          <div className='container px-4 lg:px-0'>
            <InputArea
              promptValue={promptValue}
              setPromptValue={setPromptValue}
              handleDisplayResult={handleDisplayResult}
              disabled={loading}
            />
          </div>
        </div>
      )}
    </main>
  );
}
