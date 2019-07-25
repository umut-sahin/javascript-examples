import * as colors from "ansi-colors";
import commander from "commander";
import fs from "fs";
import path from "path";

import Interpreter from "./interpreter";


let script = "";
commander
  .name("brainfuck-interpreter")
  .version("1.0.0")
  .description("A simple Brainfuck interpreter written in Node.js")
  .usage("<SCRIPT>")
  .arguments("<SCRIPT>")
  .action((argument) => {
    try {
      script = fs.readFileSync(path.resolve(argument), { encoding: "utf8" });
    } catch (error) {
      process.stderr.write(
        `${colors.red("IOError:")} Unable to open the provided ${colors.red("SCRIPT")} file (${error.message})\n`,
      );
      process.exit(1);
    }
  })
  .parse(process.argv);

if (!script) {
  process.stderr.write(
    `${colors.red("UsageError:")} The following required argument was not provided: ${colors.red("<SCRIPT>")}\n`,
  );
  process.exit(1);
}

try {
  const interpreter = new Interpreter(script);
  interpreter.execute();
} catch (error) {
  process.stderr.write(`${error.message}\n`);
  process.exit(1);
}
