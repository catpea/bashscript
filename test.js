#!/usr/bin/env node
import { pipeline } from 'stream';
import bs from './index.js'
const {ps, grep, tr, echo} = bs.os;

pipeline(
  ps('a'),
  grep(' bash'),
  tr('"[a-z]"', '"[A-Z]"'),
  err => console.error
).once('readable', function () {
  console.log( this.read().toString())
})
