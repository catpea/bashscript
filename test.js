#!/usr/bin/env node

import bs from './index.js'

console.log(bs.load.moo);

const {echo, cat, tar, foo, zip} = bs.load;

console.log(echo("bork"));

const {ls} = bs.load;

console.log( ls('-lh', '/usr') );
