# bashscript
A small REPL shell, and a very lightweight JavaScript library meant to convert Operating System commands to functions.

## Installation

```JavaScript
npm i bashscript
npm i -g bashscript # for the bssh REPL shell
```

## Usage

```JavaScript
import { bs } from './index.js';
const { pipeline, cat, echo, tr, grep } = bs;
const result = await bs.echo("Meow!").value();
assert.equal(result, "Meow!");
```

### Pipeline Example

```JavaScript
import { bs } from './index.js';
const { pipeline, cat, echo, tr, grep } = bs;
const result = await pipeline(
  cat( echo('package.json') ),
  tr( '"[a-z]"', '"[A-Z]"'),
  grep('NAME')
).value();
assert.equal(result, '  "NAME": "BASHSCRIPT",')
```

```JavaScript
import { bs } from './index.js';
const { pipeline, cat, printf, dirname, readlink, which, grep, head } = bs;
const result = await pipeline(
  cat(
    printf(
      "%s",
      dirname(
        readlink(
          '-f',
          which('npm')
        )
      ),
      "/../package.json"
    )
  ),
  grep('name'),
  head('-n', 1)
).value();
assert.equal(result, '  "name": "npm",')
```

```JavaScript
import { bs } from './index.js';
const { pipeline, cat, printf, dirname, readlink, which, grep, head } = bs;
const result = await pipeline( cat( printf( "%s", dirname( readlink( '-f', which('npm') ) ), "/../package.json" ) ), grep('name'), head('-n', 1) ).value();
assert.equal(result, '  "name": "npm",')
```

## Namage
Not related to Bash the GNU Project's shell (the Bourne Again SHell), this is a JavaScript library that automagically converts system commands to JavaScript functions (Think "bash, verb: strike hard and violently");
