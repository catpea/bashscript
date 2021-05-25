#!/usr/bin/env node
import assert from 'assert';
import bs from './index.js'
const { cat, grep, printf, dirname, readlink, which, } = bs.os;

const actual1 = await bs(cat('package.json'), grep('name'));
const expected1 = `  "name": "bashscript",\n`;
const actual2 = await bs( cat(printf("%s", dirname(readlink('-f', which('bssh'))), "/package.json" )), grep('name') )
const expected2 = `  "name": "bashscript",\n`;

assert.equal(actual1, expected1);
assert.equal(actual2, expected2);
assert.equal(actual1, actual2);
