#!/usr/bin/env -S node --experimental-repl-await

import repl from 'repl';
import {highlight} from 'cli-highlight';

const options = { useColors: true };

const r = repl.start({ prompt: '> ', eval: myEval, writer: myWriter });

function myEval(cmd, context, filename, callback) {
  // callback(null, myTranslator.translate(cmd));
  console.log("COMMAND: [%s]", cmd);
  callback(null, cmd);
}

function myWriter(output) {
  return highlight( output, {language: 'JavaScript', ignoreIllegals: true} );
}


r.defineCommand('pipe', {
  help: 'Execute operating system commands',
  action(name) {
    this.clearBufferedCommand();

    console.log(`Executing: ${name}!`);

    this.displayPrompt();
  }
});
