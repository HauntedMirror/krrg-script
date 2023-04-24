import React, { useState } from 'react';
import Editor from '../editor/Editor';

import Interpreter from '../../../interpreter/interpreter';
import {BuiltinFunctions} from '../../../interpreter/ProgramVisitor';

export function ProgramArea() {
  const [code, setCode] = useState('');

  const [arg, setArg] = useState('');

  const [result, setResult] = useState('');

  const resultData: string[] = [];

  const builtins: BuiltinFunctions = new Map();

  builtins.set('#くるるぎはっぴょうかい', (args: number[]) => {
    console.log(args[0]);
    resultData.push(args[0].toString());
    const output = resultData.join("");
    setResult(output);
    return args.length;
  })

  builtins.set('#みるは〜と', (args: number[]) => {
    console.log(String.fromCharCode(args[0]));
    resultData.push(String.fromCharCode(args[0]));
    const output = resultData.map((val) => val.toString()).join("");
    setResult(output);
    return args.length;
  })

    const interpreter = new Interpreter(builtins);

    const execute = () => {
    resultData.splice(0);
    interpreter.run(code, [Number.parseInt(arg)]);
  };

  return (
        <>
            <section>
                <Editor
                    onChange={setCode}
                />
            </section>
            <section>
                <input type="number" value={arg} onChange={(e) => setArg(e.target.value) } /><button onClick={execute}>実行</button>
            </section>
            <section>
                {result}
            </section>
        </>
    );
}
