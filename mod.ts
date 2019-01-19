// https://github.com/nquinlan/better-random-numbers-for-javascript-mirror/tree/master/support/js
// mirroring parts of http://baagoe.com/en/RandomMusings/javascript/

function createMash(): Function {
  let n: number = 4022871197;
  return function mash(data: any): number {
    for (
      let text: string = String(data),
        textLen: number = text.length,
        i: number = 0;
      i < textLen;
      i++
    ) {
      n += text.charCodeAt(i);
      let h: number = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 4294967296; // 2^32
    }
    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  };
}

export function createAlea(seed: string | any[]): Function {
  const mash: Function = createMash();
  let c: number = 1;
  let s0: number = mash(" ");
  let s1: number = mash(" ");
  let s2: number = mash(" ");
  for (
    let i: number = 0, item: any = seed[i], seedLen: number = seed.length;
    i < seedLen;
    item = seed[++i]
  ) {
    s0 -= mash(item);
    if (s0 < 0) {
      s0 += 1;
    }
    s1 -= mash(item);
    if (s1 < 0) {
      s1 += 1;
    }
    s2 -= mash(item);
    if (s2 < 0) {
      s2 += 1;
    }
  }
  return function alea(): number {
    const t: number = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32
    s0 = s1;
    s1 = s2;
    c = t | 0;
    s2 = t - c;
    return s2;
  };
}
