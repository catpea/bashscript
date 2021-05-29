# bashscript
A small REPL shell, and a very lightweight JavaScript library meant to convert Operating System commands to functions.

## TLDR

```JavaScript
import { cmd } from 'bashscript';
await cmd.echo("Grr Grr Meow!").exe; // Grr Grr Meow!
```

## Installation

```JavaScript
npm i bashscript
```

## REPL Shell

```JavaScript
npm i -g bashscript # install bashscript REPL shell
$ bashscript # enter shell
> process.title
node

> process.uptime()
22.950190303

> cmd.echo('Meow!').value()
Promise { <pending> }

> await cmd.echo('Meow!').value()
'Meow!'

```

### Advanced REPL

```JavaScript

> const command = cmd.echo('Foo');
undefined

> command
Shell {}

> await command.value();
'Foo'

> command.result
{
  command: 'echo Foo',
  exitCode: 0,
  stdout: 'Foo',
  stderr: '',
  all: undefined,
  failed: false,
  timedOut: false,
  isCanceled: false,
  killed: false
}

```

## Usage

```JavaScript
import { cmd, exe } from 'bashscript';
const { echo } = cmd;
const result = await exe( echo("Meow!") );
assert.equal(result, "Meow!");
```

```JavaScript
import { cmd } from 'bashscript';
const result = await cmd.echo("Meow!").value();
assert.equal(result, "Meow!");
```

### Pipeline Example

```JavaScript
import { cmd } from 'bashscript';
const { pipeline, cat, echo, tr, grep } = cmd;
const result = await pipeline(
  cat( echo('package.json') ),
  tr( '"[a-z]"', '"[A-Z]"'),
  grep('NAME')
).value();
assert.equal(result, '  "NAME": "BASHSCRIPT",')
```

```JavaScript
import { cmd } from 'bashscript';
const { pipeline, cat, printf, dirname, readlink, which, grep, head } = cmd;
const result = await exe( pipeline(
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
) );
assert.equal(result, '  "name": "npm",')
```

```JavaScript
import { cmd } from 'bashscript';
const { pipeline, cat, printf, dirname, readlink, which, grep, head } = cmd;
const result = await pipeline( cat( printf( "%s", dirname( readlink( '-f', which('npm') ) ), "/../package.json" ) ), grep('name'), head('-n', 1) ).value();
assert.equal(result, '  "name": "npm",')
```

```JavaScript
import { cmd, pipeline } from 'bashscript'; // a pipeline helper can also be imported directly from the bashscript module.
const { cat, printf, dirname, readlink, which, grep, head } = cmd;
const result = await pipeline(cat( printf("%s", dirname(readlink('-f', which('npm'))),"/../package.json" )), grep('name'), head('-n', 1) ).value();
debug(result);
assert.equal(result, '  "name": "npm",')
```

## Namage
Not related to Bash the GNU Project's shell (the Bourne Again SHell), this is a JavaScript library that automagically converts system commands to JavaScript functions (Think "bash, verb: strike hard and violently");

## History

Need for OS command integration arose from development of https://catpea.com,
I was unable to locate small enough solutions that worked well for me.
I came across [proxy-www](https://github.com/justjavac/proxy-www)
and ended up creating [munchhausen](https://github.com/catpea/munchhausen)
and later [bashscript](https://github.com/catpea/bashscript).
