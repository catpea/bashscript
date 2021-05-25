# BashScript
A small shell and a very lightweight JavaScript library meant to convert Operating System commands to functions.

- bash, verb: strike hard and violently
- Not related to Bash the GNU Project's shell (the Bourne Again SHell), this is a JavaScript library.

# Warning

This is a proof of concept system, the streams are not fully tested yet, and they may hang your terminal, so start a new terminal when getting into the repl shell.

# History

Need for OS command integration arose from development of https://catpea.com,
I was unable to locate small enough solutions that worked well for me.

I came across [proxy-www](https://github.com/justjavac/proxy-www)
and ended up creating [munchhausen](https://github.com/catpea/munchhausen).

I do not like the idea of using bashscript with ```#!/usr/bin/env bashscript```,
you should follow all node conventions, and create proper node modules that you install and maintain with npm.

A repl shell is available.
If you install BashScript with ```npm i -g bashscript``` then run ```bssh``` to enter the shell.

## Using The Shell

### Basic Usage

```JavaScript
$ bssh # enter shell
> process.title
node
> process.uptime()
22.950190303
>
```

### Execute A Simple Command

```JavaScript
$ bssh # enter shell
> const {cat} = cmd; await exe( cat('package.json') );

```

```JavaScript
{
  "author": "Cat Pea <corporate.miou@gmail.com> (https://catpea.com/)",
  "type": "module",
  "name": "bashscript",
  "version": "1.0.17",
  "description": "A small shell and a very lightweight JavaScript library meant to convert Operating System commands to functions.",
  "main": "index.js",
  "bin": {
    "bssh": "./repl.js"
  },
  "scripts": {
    "save": "git add .; git commit -m 'New Release'; git push; npm version patch; npm publish; git push;",
    "test": "./test.js"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/catpea/bashscript.git"
  },
  "keywords": [],
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/catpea/bashscript/issues"
  },
  "homepage": "https://github.com/catpea/bashscript#readme",
  "dependencies": {
    "cli-highlight": "^2.1.11",
    "munchhausen": "^1.0.10"
  }
}
```

### Execute A Simple Command, Simply. (use cmd.command)

```JavaScript
$ bssh # enter shell
> await exe( cmd.cat('package.json') );

```

```JavaScript
{
  "author": "Cat Pea <corporate.miou@gmail.com> (https://catpea.com/)",
  "type": "module",
  "name": "bashscript",
  // ... //
  "homepage": "https://github.com/catpea/bashscript#readme",
  "dependencies": {
    "cli-highlight": "^2.1.11",
    "munchhausen": "^1.0.10"
  }
}
```

### Pipe Two Commands Together

```JavaScript
> const {cat, grep} = cmd; // import commands
> await exe( cat('package.json'), grep('name') ); // execute a pipe
```

```shell
  "name": "bashscript",
```


## Complex Shell Example

How to execute the following Bash command:

```shell

dirname $(readlink -f $(which bssh))

```

```JavaScript
> const {dirname, readlink, which} = cmd; // import commands for convenience
> await exe( dirname ( readlink( '-f', which('bssh') ) ) ); // execute a pipe
```

## Even More Complex Example (I am sorry everyone :)

```JavaScript
> const {cat, printf, dirname, readlink, which, grep,} = cmd; // import commands for convenience
> await exe( cat(printf("%s", dirname(readlink('-f', which('http-server'))), "/package.json" )), grep('name') ); // execute a pipe
```

## Using The Script

```JavaScript

import bs from 'bashscript'
const {cat, grep} = bs.os;
await bs( cat('package.json'), grep('name') ) // "name": "bashscript",

```

## Promise API

```JavaScript
import bs from 'bashscript'
const {cat, grep} = bs.os;
(await bs.pipe(cat('package.json'), grep('name'))).read().toString() // "name": "bashscript",
```

```JavaScript

import bs from 'bashscript'
const {ps, grep, tr} = bs.os;

const result = await bs.pipe(
  ps('a'),
  grep(' bash'),
  tr('"[a-z]"', '"[A-Z]"')
);

console.log(result.read().toString());

```

```shell
3421 PTS/0    SS     0:00 BASH
3671 PTS/1    SS+    0:00 BASH
3982 PTS/2    SS+    0:00 BASH
5922 PTS/3    SS     0:00 BASH
40234 PTS/4    SS+    0:00 BASH
41162 PTS/5    SS     0:00 BASH
45526 PTS/6    SS+    0:00 BASH
46480 PTS/7    SS     0:00 BASH

```

## Using Node's Pipeline

```JavaScript

#!/usr/bin/env node

import { pipeline } from 'stream';
import bs from 'bashscript'
const {ps, grep, tr, echo} = bs.os;

pipeline(
  ... await Promise.all([
  ps('a'),
  grep(' bash'),
  tr('"[a-z]"', '"[A-Z]"'),
  ]),
  err => console.error
).once('readable', function () {
  console.log( this.read().toString())
})

```

```shell
3421 PTS/0    SS     0:00 BASH
3671 PTS/1    SS+    0:00 BASH
3982 PTS/2    SS+    0:00 BASH
5922 PTS/3    SS     0:00 BASH
40234 PTS/4    SS+    0:00 BASH
41162 PTS/5    SS     0:00 BASH
45526 PTS/6    SS+    0:00 BASH
46480 PTS/7    SS     0:00 BASH

```
