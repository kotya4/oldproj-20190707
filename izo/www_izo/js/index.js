
function onload() {
  const wrapper = document.getElementsByClassName('wrapper')[0];

  const auto3d = Automata3d([1, 3], [10, 10, 10], [[[1]]]);

  auto3d.evolve(3);

  const { map } = auto3d.chunked();


  const webgl = WebGL(640, 480, wrapper);

  const cube = webgl.init_vbo_for_cube();

  let rotation = 0;



  setInterval(() => {

    webgl.clear();

    const mview = mat.create_gl_identity()



    for (let x = 0; x < map.length; ++x) {
      for (let y = 0; y < map[0].length; ++y) {
        for (let z = 0; z < map[0][0].length; ++z) {
          if (map[x][y][z]) {
            webgl.set_modelview(mview
              .gl_translate(x * 3, y * 3, z * 3)
              .gl_rotate(rotation, 'y')
              .gl_rotate(rotation, 'x')
              .gl_translate(0, 0, 100)
              .float32Array());

            cube.draw([1.0, 0.5, 0.5, 1.0]);
          }
        }
      }
    }

    rotation += 0.1;

  }, 100);

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
('www_izo/js/', [
  'mat.js',
  'webgl.js',
  'canvas.js',
  'maze.js',
  'utils.js',
  'automata.js',
]);
