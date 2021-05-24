#!/usr/bin/env node
import assert from 'assert';
import bs from './index.js'
const {cat, grep} = bs.os;
const actual = await bs(cat('package.json'), grep('name'));
const expected = `  "name": "bashscript",\n`;
assert.equal(actual,expected);
