import React, { useState } from 'react';
import Editor from '../editor/Editor';

export default function ProgramArea() {
  const [code, setCode] = useState('');

  const [arg, setArg] = useState('');

  const [result, setResult] = useState('');

  const resultData: string[] = [];

  const execute = () => {
    resultData.splice(0);
    const worker = new Worker(new URL('../../../interpreter/interpreter-worker.ts', import.meta.url));
    worker.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (data.type === "console") {
        resultData.push(data.data);
      }
      const output = resultData.join("");
      setResult(output);
    };
    worker.postMessage(JSON.stringify({ src: code, args: [(Number.parseInt(arg))] }));
  };
  return (
    <>
      <section>
        <Editor
          onChange={setCode}
        />
      </section>
      <section>
        <input type="number" value={arg} onChange={(e) => setArg(e.target.value)} /><button onClick={execute}>実行</button>
      </section>
      <section>
        {result}
      </section>
    </>
  );
}
