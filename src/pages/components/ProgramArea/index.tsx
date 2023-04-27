import React, { useState } from "react";
import Editor from "../Editor";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

import dynamic from "next/dynamic";
const AceEditor = dynamic(async () => import("react-ace"), { ssr: false });

export default function ProgramArea() {
  const [code, setCode] = useState("");

  const [arg, setArg] = useState("");

  const [result, setResult] = useState("");

  const [state, setState] = useState("stopped");

  const resultData: string[] = [];

  const execute = () => {
    resultData.splice(0);
    setState("running...");
    const worker = new Worker(
      new URL("../../../interpreter/interpreter-worker.ts", import.meta.url)
    );
    worker.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (data.type === "console") {
        resultData.push(data.data);
      } else if (data.type === "Error") {
        console.log(data.data);
        resultData.push(data.data);
        setState("stopped");
      } else if (data.type == "OK") {
        setState("stopped");
      }
      const output = resultData.join("");
      setResult(output);
    };
    worker.postMessage(
      JSON.stringify({ src: code, args: [Number.parseInt(arg)] })
    );
  };
  return (
    <Card sx={{ width: 600, margin: "auto" }}>
      <section>
        <Editor onChange={setCode} />
      </section>
      <section>
        <input
          type="number"
          value={arg}
          onChange={(e) => setArg(e.target.value)}
        />
        <button onClick={execute}>実行</button>
        {state}
      </section>
      <section>
        <AceEditor
          readOnly={true}
          height="100px"
          value={result}
          showGutter={false}
        />
      </section>
    </Card>
  );
}
