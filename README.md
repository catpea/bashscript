# bashscript
A small REPL shell, and a very lightweight JavaScript library meant to convert Operating System commands to functions.

## Installation

```JavaScript
npm i bashscript
npm i -g bashscript # for the bssh REPL shell
```

## Usage

```JavaScript
const result = await echo("Meow!").value();
assert.equal(result, "Meow!");
```

## Pipeline Example

```JavaScript
const result = await pipeline(cat( printf("%s", dirname(readlink('-f', which('npm'))),"/../package.json" )), grep('name'), head('-n', 1) ).value();
assert.equal(result, '  "name": "npm",')
```

## Namage
Not related to Bash the GNU Project's shell (the Bourne Again SHell), this is a JavaScript library that automagically converts system commands to JavaScript functions (Think "bash, verb: strike hard and violently");
