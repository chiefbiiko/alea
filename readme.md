# alea

[![Travis](http://img.shields.io/travis/chiefbiiko/alea.svg?style=flat)](http://travis-ci.org/chiefbiiko/alea) [![AppVeyor](https://ci.appveyor.com/api/projects/status/github/chiefbiiko/alea?branch=master&svg=true)](https://ci.appveyor.com/project/chiefbiiko/alea)

---

A seedable pseudo-RNG for `deno`. Ported from Johannes Baagøe's original implementation.

---

## Import

```ts
import { createAlea } from "https://raw.githubusercontent.com/chiefbiiko/alea/master/mod.ts";
```

---

## Usage

```ts
const riggedDie1: Function = createAlea("seed");
const riggedDie2: Function = createAlea("seed");

for (let i: number = 0; i < 10; i++)
  console.log(i, riggedDie1(), riggedDie2());
```

---

## API

### `createAlea(seed: string | any[]) : Function`

Create a seeded random number generator. The returned function returns a pseudo-random number between `0` and `1` each invocation. 

---

## License

[MIT](./license.md)