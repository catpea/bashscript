#!/usr/bin/env -S node --experimental-repl-await

import repl from 'repl';
import {highlight} from 'cli-highlight';
import bs from './index.js'

const options = { useColors: true };
const r = repl.start({ prompt: '> ', xeval: myEval, writer: myWriter });

r.context.cmd = bs.os;
r.context.exe = bs;
r.context.deep = function(...chain){

  

};

function myEval(cmd, context, filename, callback) {
  // callback(null, myTranslator.translate(cmd));
  // console.log("COMMAND: [%s]", cmd);
  callback(null, cmd);
}

function myWriter(output) {
  try{
    return highlight( output, {language: 'JavaScript', ignoreIllegals: true} );
  } catch{
    return output;
  }
}

// r.defineCommand('pipe', {
//   help: 'Execute operating system commands',
//   action(name) {
//     this.clearBufferedCommand();
//
//     console.log(`Executing: ${name}!`);
//
//     this.displayPrompt();
//   }
// });
