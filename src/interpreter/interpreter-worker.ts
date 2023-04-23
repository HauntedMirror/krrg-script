import Interpreter from './interpreter';
import { BuiltinFunctions } from './ProgramVisitor';;

self.addEventListener("message", (e) => {
  const builtins: BuiltinFunctions = new Map();

  builtins.set('#くるるぎはっぴょうかい', (args: number[]) => {
    self.postMessage(args);
    return args[0];
  })
  const data = JSON.parse(e.data);
  const src = data.src;
  const interpreter = new Interpreter(builtins);
  interpreter.run(src)
});
