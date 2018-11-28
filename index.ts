// Johannes Baagøe <baagoe@baagoe.com>, 2010
function createMash () : Function {
  var n: number = 0xefc8249d
  return function mash (data: any) : number {
    data = String(data)
    const data_len: number = data.length
    for (var i: number = 0; i < data_len; i++) {
      n += data.charCodeAt(i)
      let h: number = 0.02519603282416938 * n
      n = h >>> 0
      h -= n
      h *= n
      n = h >>> 0
      h -= n
      n += h * 0x100000000 // 2^32
    }
    return (n >>> 0) * 2.3283064365386963e-10 // 2^-32
  }
}

export default function alea (seed: string|Array<any>) : Function {
  const seed_len: number = seed.length
  const mash: Function = createMash()
  var c: number = 1
  var s0: number = 0
  var s1: number = 0
  var s2: number = 0
  for (var i: number = 0; i < seed_len; i++) {
    s0 -= mash(seed[i])
    if (s0 < 0) s0 += 1
    s1 -= mash(seed[i])
    if (s1 < 0) s1 += 1
    s2 -= mash(seed[i])
    if (s2 < 0) s2 += 1
  }
  return function next () : number {
    const t: number = 2091639 * s0 + c * 2.3283064365386963e-10 // 2^-32
    s0 = s1
    s1 = s2
    c = t | 0
    s2 = t - c
    return s2
  }
}
