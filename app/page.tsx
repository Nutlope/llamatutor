'use client';

import Answer from '@/components/Answer';
import Hero from '@/components/Hero';
import InputArea from '@/components/InputArea';
import SimilarTopics from '@/components/SimilarTopics';
import Sources from '@/components/Sources';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { getAnswer, getSimilarQuestions, getSources } from './actions';
import { readStreamableValue } from 'ai/rsc';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

export default function Home() {
  const [promptValue, setPromptValue] = useState('');
  const [question, setQuestion] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [answer, setAnswer] = useState('');
  const [sources, setSources] = useState<{ name: string; url: string }[]>([]);
  const [similarQuestions, setSimilarQuestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleDisplayResult = async (newQuestion?: string) => {
    newQuestion = newQuestion || promptValue;

    setShowResult(true);
    setLoading(true);
    setQuestion(newQuestion);
    setPromptValue('');

    let p1 = handleSourcesAndAnswer(newQuestion);
    // let p2 = handleSimilarQuestions(newQuestion);

    await Promise.all([p1]);

    setLoading(false);
  };

  async function handleSourcesAndAnswer(question: string) {
    let res = await fetch('/api/getSources', {
      method: 'POST',
      body: JSON.stringify({ question }),
    });
    let sources = await res.json();
    setSources(sources);

    let res2 = await fetch('/api/getAnswer', {
      method: 'POST',
      body: JSON.stringify({ question, sources }),
    });
    // let answers = await res2.body
    console.log(res2.body);
    // let answers = readStreamableValue(res2);
    // let answers = await res.json();

    // let answer = await getAnswer(question, sources);
    // console.timeEnd('answer stream');
    // let textContent = '';
    // for await (const delta of res2) {
    //   console.log({ delta });
    //   textContent = textContent + delta;
    //   setAnswer(textContent);
    // }
  }

  async function handleSimilarQuestions(question: string) {
    let similarQs = await getSimilarQuestions(question);
    // setSimilarQuestions(similarQs);
  }

  const reset = () => {
    setShowResult(false);
    setPromptValue('');
    setQuestion('');
    setAnswer('');
    setSources([]);
    setSimilarQuestions([]);
  };

  return (
    <>
      <Header />
      <main className='px-4 pb-4 h-full'>
        {!showResult && (
          <Hero
            promptValue={promptValue}
            setPromptValue={setPromptValue}
            handleDisplayResult={handleDisplayResult}
          />
        )}

        {showResult && (
          <div className='w-full grow h-full min-h-[68vh] flex flex-col justify-between '>
            <div className='w-full container space-y-2'>
              <div className='container space-y-2'>
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
                  <div className='grow'>&quot;{question}&quot;</div>
                </div>
                <>
                  <Sources sources={sources} />
                  <Answer answer={answer} />
                  <SimilarTopics
                    similarQuestions={similarQuestions}
                    setPromptValue={setPromptValue}
                    handleDisplayResult={handleDisplayResult}
                    reset={reset}
                  />
                </>
              </div>

              <div className='pt-1 sm:pt-2' ref={chatContainerRef}></div>
            </div>
            <div className='container px-4 lg:px-0'>
              <InputArea
                promptValue={promptValue}
                setPromptValue={setPromptValue}
                handleDisplayResult={handleDisplayResult}
                disabled={loading}
                reset={reset}
              />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
