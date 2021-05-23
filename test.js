#!/usr/bin/env node

import bs from './index.js'

console.log(bs.os.moo);

const {echo, cat, tar, foo, zip} = bs.os;

console.log(echo("bork"));

const {ls} = bs.os;

console.log( ls('-lh', '/usr') );
