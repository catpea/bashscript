# BashScript
BashScript a very lightweight language meant for Bash scripting.

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
  ps('a'),
  grep(' bash'),
  tr('"[a-z]"', '"[A-Z]"'),
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

```JavaScript
#!/usr/bin/env node
import { pipeline } from 'stream';
import bs from 'bashscript'
const {ls, tr} = bs.os;

pipeline(
  ls('-lh', '/usr'),
  tr('"[a-z]"', '"[A-Z]"'),
  err => console.error
).once('readable', function () {
  console.log( this.read().toString())
})


```

```shell
TOTAL 392K
DR-XR-XR-X.   2 ROOT ROOT  68K MAY 23 10:34 BIN
DRWXR-XR-X.   2 ROOT ROOT 4.0K JAN 26 01:05 GAMES
DRWXR-XR-X.  69 ROOT ROOT 4.0K MAY 15 14:05 INCLUDE
DR-XR-XR-X.  66 ROOT ROOT  36K MAY 23 10:34 LIB
DR-XR-XR-X. 195 ROOT ROOT 204K MAY 23 10:34 LIB64
DRWXR-XR-X.  56 ROOT ROOT  16K MAY 23 10:34 LIBEXEC
DRWXR-XR-X.  12 ROOT ROOT 4.0K JAN 26 01:05 LOCAL
DRWXR-XR-X.   5 ROOT ROOT 4.0K OCT  8  2020 PGSQL-13
DR-XR-XR-X.   2 ROOT ROOT  24K MAY 23 10:34 SBIN
DRWXR-XR-X. 338 ROOT ROOT  12K MAY 21 13:26 SHARE
DRWXR-XR-X.   4 ROOT ROOT 4.0K JAN 26 01:05 SRC
LRWXRWXRWX.   1 ROOT ROOT   10 JAN 26 01:05 TMP -> ../VAR/TMP


```
