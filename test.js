#!/usr/bin/env -S node --trace-uncaught

import assert from 'assert';
import { inspect } from 'util';

import identify from './src/util/identify.js';
import cast from './src/util/cast.js';
import Util from './src/Util.js';
import Node from './src/Node.js';

import bug from 'debug';
const debug = bug('tests');


assert.equal(identify(new Util()), "Util", "identify.js is broken, because identiofication misidentified the thing.");
//assert.equal(identify(cast({}, Util) ), "Util", "cast.js is broken, becasue casting returned unexpected type.");

import { bs } from './index.js';
const { pipeline, cat, printf, dirname, readlink, which, grep, head, echo, tr } = bs;

{
  //import { bs } from './index.js';
  //const { pipeline, cat, echo, tr, grep } = bs;
  const result = await bs.echo("Meow!").value();
  debug(result);
  assert.equal(result, "Meow!");
}

{
  //import { bs } from './index.js';
  //const { pipeline, cat, echo, tr, grep } = bs;
  const result = await pipeline(cat(echo('package.json')),tr( '"[a-z]"', '"[A-Z]"'), grep('NAME') ).value();
  debug(result);
  assert.equal(result, '  "NAME": "BASHSCRIPT",')
}

{
  //import { bs } from './index.js';
  //const { pipeline, cat, printf, dirname, readlink, which, grep, head } = bs;
  const result = await pipeline(cat( printf("%s", dirname(readlink('-f', which('npm'))),"/../package.json" )), grep('name'), head('-n', 1) ).value();
  debug(result);
  assert.equal(result, '  "name": "npm",')
}
