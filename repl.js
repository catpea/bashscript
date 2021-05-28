#!/usr/bin/env -S node --experimental-repl-await
import repl from 'repl';
import bs from './index.js'
const options = { useColors: true };
const r = repl.start({ prompt: '> '});
r.context.cmd = bs.os;
r.context.exe = bs;
