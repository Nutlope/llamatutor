import { useEffect, useRef, useState } from "react";

export default function useStream(stream?: ReadableStream) {
  let [text, setText] = useState("");
  let cache = useRef<{
    stream: ReadableStream;
    reader: ReadableStreamDefaultReader;
  }>();

  useEffect(() => {
    if (cache.current?.stream === stream) return;

    setText("");

    async function f() {
      if (!stream) return;

      if (cache.current?.stream?.locked) {
        await cache.current.reader.cancel();
      }

      let reader = stream.getReader();
      cache.current = { stream, reader };

      for await (const delta of streamAsyncIterator(reader)) {
        new TextDecoder()
          .decode(delta)
          .split("\n")
          .filter((line) => line.trim() !== "")
          .forEach((str) => {
            let json = JSON.parse(str);
            setText((t) => t + json.choices[0].delta.content);
          });
      }
    }

    f();
  }, [stream]);

  return text;
}

// https://jakearchibald.com/2017/async-iterators-and-generators/#making-streams-iterate
async function* streamAsyncIterator(reader: ReadableStreamDefaultReader) {
  try {
    while (true) {
      // Read from the stream
      const { done, value } = await reader.read();
      // Exit if we're done
      if (done) return;
      // Else yield the chunk
      yield value;
    }
  } finally {
    reader.releaseLock();
  }
}
