#!/usr/bin/env -S node --experimental-repl-await
import repl from 'repl';
import { cmd, exe } from './index.js';
const options = { useColors: true };
const r = repl.start({ prompt: '> '}, options);
Object.assign(r.context, { cmd, exe })
