#!/usr/bin/env -S node --experimental-repl-await
import repl from 'repl';
import {highlight} from 'cli-highlight';
import bs from './index.js'
const options = { useColors: true };
const r = repl.start({ prompt: '> '});
r.context.cmd = bs.os;
r.context.exe = bs;
