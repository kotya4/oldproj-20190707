
function onload() {

  const cvs = document.createElement('canvas');
  document.body.appendChild(cvs);
  cvs.width = 400;
  cvs.height = 400;
  const ctx = cvs.getContext('2d');

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);


  const dataset = [
    { inputs: [0, 0], targets: [0] },
    { inputs: [0, 1], targets: [1] },
    { inputs: [1, 0], targets: [1] },
    { inputs: [1, 1], targets: [0] }
  ];

  // 2 neurons in hidden layer is not enouth, success learn rate ~50%
  const nk = NeuralKotya(2, [3], 1);

  for (let i = 0; i < 50000; ++i) {
    const d = dataset[Math.random() * 4 | 0];
    nk.backpropagation(d.inputs, d.targets);
  }

  for (let d of dataset) {
    console.log(d.inputs, nk.feedforward(d.inputs)[0]);
  }

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
('www_pixel_monster/js/', [
  'mat.js',
  'neuralkotya.js'
]);
