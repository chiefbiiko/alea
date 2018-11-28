function createMash () : Function {
  var n = 0xefc8249d
  return function mash (data: any) : number {
    data = String(data)
    const len: number = data.length
    for (var i: number = 0; i < len; i++) {
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

export default function alea (seed: any) : Function {
  var _c: number = 1
  const _state: { [key:string]: number } = { '0': 0, '1': 0, '2': 0 }
  const mash: Function = createMash()
  _state['0'] = mash(' ')
  _state['1'] = mash(' ')
  _state['2'] = mash(' ')
  _state['0'] -= mash(seed)
  if (_state['0'] < 0) _state['0'] += 1
  _state['1'] -= mash(seed)
  if (_state['1'] < 0) _state['1']+= 1
  _state['2'] -= mash(seed)
  if (_state['2'] < 0) _state['2'] += 1
  return function next () : number {
    const t: number = 2091639 * _state['0'] + _c * 2.3283064365386963e-10 // 2^-32
    _state['0'] = _state['1']
    _state['1'] = _state['2']
    _c = t | 0
    _state['2'] = t - _c
    return _state['2']
  }
}
