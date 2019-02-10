
function mat(h, w) {
  const m = initialize(h, w);

  function initialize(h, w) {
    if (Number.isInteger(h) && Number.isInteger(w) && h > 0 && w > 0) return [...Array(h)].map(() => [...Array(w)]);
    if (h instanceof Array) return h[0] instanceof Array ? h.map(e => e.slice()) : h.map(e => [e]);
    if (h instanceof Function && 'array' in h) return h.array().map(e => e.slice());
    throw new Error('Arguments must be an array, integers or matrix object');
  }

  function get_err_str(a, str) {
    return `Matrix ${a.length}x${a[0].length} cannot be ${str} matrix ${m.length}x${m[0].length}`;
  }

  function array() {
    return m;
  }

  function table() {
    console.table(m);
    return this;
  }

  function log() {
    console.log(m);
    return this;
  }

  function map(v) {
    const f = v instanceof Function ? v : () => v;
    return mat(m.map((_, i, a) => _.map((e, j) => f(e, i, j, a))));
  }

  function rand() {
    return mat(m.map(e => e.map(() => Math.random())));
  }

  function zip(a) {
    a = 'array' in a ? a.array() : a;
    if (a.length !== m.length) throw new Error(get_err_str(a, 'ziped with'));
    return mat(m.map((e, i) => e.concat(a[i])));
  }

  function mul(a) {
    a = 'array' in a ? a.array() : a;
    if (a.length !== m[0].length) throw new Error(get_err_str(a, 'multiplied to'));
    const new_a = [...Array(m.length)].map(() => Array(a[0].length));
    for (let r = 0; r < m.length; ++r) for (let c = 0; c < a[0].length; ++c) {
      new_a[r][c] = 0;
      for (let i = 0; i < m[0].length; ++i) new_a[r][c] += m[r][i] * a[i][c];
    }
    return mat(new_a);
  }

  function hadamard_prod(a) {
    a = 'array' in a ? a.array() : a;
    if (a.length !== m.length || a[0].length !== m[0].length) throw new Error(get_err_str(a, 'elementwise multiplied to'));
    return mat(m.map((e, i) => e.map((v, j) => v * a[i][j])));
  }

  function add(a) {
    a = 'array' in a ? a.array() : a;
    if (a.length !== m.length || a[0].length !== m[0].length) throw new Error(get_err_str(a, 'added to'));
    return mat(m.map((e, i) => e.map((v, j) => v + a[i][j])));
  }

  function sub(a) {
    a = 'array' in a ? a.array() : a;
    if (a.length !== m.length || a[0].length !== m[0].length) throw new Error(get_err_str(a, 'substracted from'));
    return mat(m.map((e, i) => e.map((v, j) => v - a[i][j])));
  }

  function transpose() {
    return mat([...Array(m[0].length)].map((e, j) => [...Array(m.length)].map((e, i) => m[i][j])));
  }

  return {
    sub,
    add,
    mul,
    zip,
    log,
    map,
    rand,
    array,
    table,
    transpose,
    hadamard_prod
  }
}
