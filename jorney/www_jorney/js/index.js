
function onload() {


  /*
  const perlin = Perlin({ precomuted: true });

  const scale = 0.5;
  let z = 0;
  setInterval(() => {
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (let x = 0; x < 20; ++x) for (let y = 0; y < 20; ++y) {
      const c = ~~(perlin.noise(x * scale, y * scale, z) * 256);
      if (c > 0) {
        ctx.fillStyle = `rgb(${c}, ${c}, ${c})`;
        ctx.fillRect(10 * x, 10 * y, 10, 10);
      }
    }
    //ctx.fillStyle = 'green';
    //ctx.fillText('' + z, 10, 10);
    z += 1;
  }, 100);
  */

}

/*
 * Loader
 */
((path, a) => {
  function loadjs(src, async = true) {
    return new Promise((res, rej) =>
      document.head.appendChild(Object.assign(document.createElement('script'), {
        src,
        async,
        onload: _ => res(src),
        onerror: _ => rej(src)
      }))
    )
  }
  Promise.all(a.map(e => loadjs(path + e)))
    .then(_ => window.addEventListener('load', onload))
    .catch(src => console.log(`File "${src}" not loaded`));
})
('www_jorney/js/', [
  'perlin.js'
]);
