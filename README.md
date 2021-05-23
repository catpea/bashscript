# BashScript
BashScript a very lightweight language for scripting.


## Promise API

```JavaScript

import bs from 'bashscript';

const {ls} = bs.promises;
const {error, stdout, stderr} = await ls('-lh', '/usr');

```

```shell
stdout: total 392K
dr-xr-xr-x.   2 root root  68K May 23 10:34 bin
drwxr-xr-x.   2 root root 4.0K Jan 26 01:05 games
drwxr-xr-x.  69 root root 4.0K May 15 14:05 include
dr-xr-xr-x.  66 root root  36K May 23 10:34 lib
dr-xr-xr-x. 195 root root 204K May 23 10:34 lib64
drwxr-xr-x.  56 root root  16K May 23 10:34 libexec
drwxr-xr-x.  12 root root 4.0K Jan 26 01:05 local
drwxr-xr-x.   5 root root 4.0K Oct  8  2020 pgsql-13
dr-xr-xr-x.   2 root root  24K May 23 10:34 sbin
drwxr-xr-x. 338 root root  12K May 21 13:26 share
drwxr-xr-x.   4 root root 4.0K Jan 26 01:05 src
lrwxrwxrwx.   1 root root   10 Jan 26 01:05 tmp -> ../var/tmp

```

## Stream API

```JavaScript

import bs from 'bashscript';

const {ps, grep, tr} = bs.streams;

const {error, stdout, stderr} = await bs.pipe(
  ps('ax'),
  grep('node'),
  tr('[a-z]','[A-Z]')
);

```
