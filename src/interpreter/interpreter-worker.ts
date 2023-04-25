import Interpreter from './interpreter';
import { BuiltinFunctions } from './ProgramVisitor';

interface OutputData {
  type: string;
  data: string;
}

self.addEventListener("message", (e) => {
  const builtins: BuiltinFunctions = new Map();

  self.postMessage(JSON.stringify({ type: "console", data: "started" }));

  builtins.set('#くるるぎはっぴょうかい', (args: number[]) => {
    const data: OutputData = {
      type: "console",
      data: args[0].toString()
    }
    self.postMessage(JSON.stringify(data));
    return args[0];
  });
  const data = JSON.parse(e.data);
  const src = data.src;
  const interpreter = new Interpreter(builtins);
  try {
    interpreter.run(src, data.args);
    const result = { type: "OK", data: "" };
    self.postMessage(JSON.stringify(result));
  } catch (e) {
    if (e instanceof Error) {
      const result = { type: "Error", data: e.message };
      self.postMessage(JSON.stringify(result));
    }
  }
});

