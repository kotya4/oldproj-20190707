
async function onload() {

  const keys = utils.listen_keyboard();
  const ctx = utils.create_canvas(600, 400, document.getElementsByClassName('wrapper')[0]);
  const width = 400;
  const height = 400;

  const img = Texture();
  const map = utils.map;

  const minimap_offset = 400;

  const camera = { x: 8, y: 8, old_x: 0, old_y: 0 };
  const rotation_speed = 0.05;
  const speed = 0.2;
  const radius = 1;
  const fov = Math.PI / 3;
  let eye = 3.9;

  const col_num = 400;
  const scale_w = width / col_num;
  const half_height = height / 2;
  const depth = 20;
  const step = 0.01;
  const angle_step = fov / col_num;


  const plane = { x: 5.0, y: 5.0, r: 0.5 };


  const debugflag = 0;
  window.onclick = draw;
  setInterval(draw, 50);

  // ============= DRAW =========================

  function draw() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    let angle = eye - fov / 2;

    //const zbuffer = [...Array(col_num)];
    let plane_tex = 0;
    const plane_dist = Math.sqrt(Math.pow(camera.x - plane.x, 2) + Math.pow(camera.y - plane.y, 2));

    const plane_l = { x: plane.x - plane.r * Math.sin(eye - Math.PI / 2), y: plane.y - plane.r * Math.cos(eye - Math.PI / 2) };
    const plane_r = { x: plane.x + plane.r * Math.sin(eye - Math.PI / 2), y: plane.y + plane.r * Math.cos(eye - Math.PI / 2) };
    const plane_max = { x: Math.max(plane_l.x, plane_r.x) + 0.01, y: Math.max(plane_l.y, plane_r.y) + 0.01 };
    const plane_min = { x: Math.min(plane_l.x, plane_r.x) - 0.01, y: Math.min(plane_l.y, plane_r.y) - 0.01 };

    for (let i = 0; i < col_num; ++i) {

      angle += angle_step;

      const sina = Math.sin(angle);
      const cosa = Math.cos(angle);

      for (let distance = 0; distance < depth; distance += step) {

        const real_x = camera.x + sina * distance;
        const real_y = camera.y + cosa * distance;
        const x = ~~real_x;
        const y = ~~real_y;
        if (x < 0 || y < 0 || x >= map.length || y >= map[0].length) break;
        if (map[x][y]) {
          const cdist = distance * Math.cos(eye - angle);
          const h = height / (cdist + 1);

          const img_x = Math.abs((real_x - x) - (real_y - y))  * img.width;
          ctx.drawImage(img, img_x, 0, scale_w, img.height, i * scale_w, half_height - h, scale_w, h * 2);

          ctx.fillStyle = `rgba(0, 0, 0, ${cdist / depth})`;
          //ctx.fillStyle = `rgba(${colors[map[x][y] % colors.length]}, ${cdist / depth})`;
          ctx.fillRect(i * scale_w, half_height - h - 1, scale_w, h * 2 + 2);

          break;
        }

        // ========= drawing plane ==============

        if (plane.x - plane.r < real_x && real_x < plane.x + plane.r && plane.y - plane.r < real_y && real_y < plane.y + plane.r) {
          const d = plane_dist;
          const h = height / (d + 1);
          if (plane_min.x < real_x && real_x < plane_max.x && plane_min.y < real_y && real_y < plane_max.y) {
            //
            // здесь я пытаюсь нарисовать спрайт, который всегда смотрит на игрока.
            // все, до чего я смог додуматься, это отрисока прямоугольника, который
            // всегда повернут в сторону игрока. к сожалению, текстуру я накладывать
            // так и не научился: не могу вычислить координаты текстуры.
            // есть глупое решение -- итерировать каждый раз при падении луча на прямоугольник
            // переменную plane_tex. выглядеть код будет вот так:
            //
            // plane_tex += plane_dist / col_num;
            // if (angle_side > 0) {
            // const img_x = plane_tex * img.width;
            // ctx.drawImage(img, img_x, 0, scale_w, img.height, i * scale_w, half_height - h, scale_w, h * 2);
            //
            // основная проблема данного решения: если луч НЕ падает на прямоугольник (его часть находится
            // за стеной или за экраном), итерация не происходит, в итоге текстура "смещается". решить эту проблему
            // тоже крайне сложно, и вообще - у меня есть дла поважнее.
            // можно попытаться вычислять координаты падения луча на отрезок (прямоугольник) через нахождение
            // пересечения луча с отрезком. наверное. не знаю, идите нахуй, я потратил на эту хуйню 20 часов своей жизни.
            // возьму готовую реализацию в интеренете нахуй, все равно всем насрать.
            //
            const OP = { x: camera.x - plane.x, y: camera.y - plane.y };
            //console.log(OP);

            const nyu = Math.PI / 2 - (eye - angle);
            let ON = plane_dist / Math.tan(nyu + eye);
            ON += plane_dist;//Math.sqrt(OP.x * OP.x + OP.y * OP.y);
            ON -= ~~ON;

            //console.log(~~(ON * 100) / 100);

            ctx.fillStyle = `rgba(${256 - 255 * Math.abs(ON)},255,${255 * Math.abs(ON)},1.0)`;
            ctx.fillRect(i * scale_w, half_height - h - 1, scale_w, h * 2 + 2);

            //const PR = Math.sqrt(Math.pow(pos[0] - plane_min.x, 2) + Math.pow(pos[1] - plane_min.y, 2));
            //const OR = Math.sqrt(PR * PR - plane_dist * plane_dist);
            //const N = ON - OR;
            //console.log(nyu, ON, PR, OR, N);

            break;
          }
        }
      }

    }

    if (keys[81] || debugflag) {
      camera.x -= Math.cos(eye) * speed;
      camera.y += Math.sin(eye) * speed;
    }
    if (keys[69]) {
      camera.x += Math.cos(eye) * speed;
      camera.y -= Math.sin(eye) * speed;
    }

    let moving_forward = 0;
    if (keys[87]) {
      moving_forward = +1;
    } else if (keys[83]) {
      moving_forward = -1;

    }
    if (moving_forward) {
      const dx = Math.sin(eye) * speed * moving_forward;
      const dy = Math.cos(eye) * speed * moving_forward;
      camera.old_x = camera.x;
      camera.old_y = camera.y;
      camera.x += dx;
      camera.y += dy;
      /*
      const x = ~~camera.x;
      const y = ~~camera.y;
      if (map[x][y]) {
        const lines = [
          [[x + 1, y + 1], [x + 0, y + 1]],
          [[x + 1, y + 0], [x + 0, y + 0]],
          [[x + 1, y + 0], [x + 1, y + 1]],
          [[x + 0, y + 0], [x + 0, y + 1]],
        ];
        for (let l of lines) {
          const corr = collision_correction([old, [camera.x, camera.y]], [l[1], l[0]]);
          if (corr != null) {
            camera.x = corr[0];
            camera.y = corr[1];
          }
        }
      }
      */
    }

    if (keys[65]) {
      eye -= rotation_speed;
      if (eye > Math.PI * 2) eye = eye - Math.PI * 2; else if (eye < 0) eye = Math.PI * 2 + eye;
    } else if (keys[68] || debugflag) {
      eye += rotation_speed;
      if (eye > Math.PI * 2) eye = eye - Math.PI * 2; else if (eye < 0) eye = Math.PI * 2 + eye;
    }

    // =========== minimap ==================

    for (let x = 0; x < map.length; ++x) for (let y = 0; y < map[0].length; ++y) {
      ctx.fillStyle = map[x][y] ? 'white' : 'black';
      ctx.fillRect(minimap_offset + x * 10, y * 10, 9, 9);
    }
    ctx.fillStyle = 'blue';
    ctx.fillRect(minimap_offset + camera.x * 10 - 5, camera.y * 10 - 5, 10, 10);

    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(minimap_offset + camera.x * 10, camera.y * 10);
    ctx.lineTo(minimap_offset + camera.x * 10 + 20 * Math.sin(eye), camera.y * 10 + 20 * Math.cos(eye));
    ctx.stroke();

    ctx.strokeStyle = 'yellow';
    ctx.beginPath();
    ctx.moveTo(minimap_offset + plane.x * 10 - plane.r * 10 * Math.sin(eye - Math.PI / 2), plane.y * 10 - plane.r * 10 * Math.cos(eye - Math.PI / 2)); // left
    ctx.lineTo(minimap_offset + plane.x * 10 + plane.r * 10 * Math.sin(eye - Math.PI / 2), plane.y * 10 + plane.r * 10 * Math.cos(eye - Math.PI / 2)); // right
    ctx.stroke();

    ctx.strokeStyle = 'green';
    ctx.beginPath();
    ctx.moveTo(minimap_offset + camera.x * 10, camera.y * 10);
    ctx.lineTo(minimap_offset + camera.x * 10 + 200 * Math.sin(eye - fov / 2), camera.y * 10 + 200 * Math.cos(eye - fov / 2));
    ctx.moveTo(minimap_offset + camera.x * 10, camera.y * 10);
    ctx.lineTo(minimap_offset + camera.x * 10 + 200 * Math.sin(eye + fov / 2), camera.y * 10 + 200 * Math.cos(eye + fov / 2));
    ctx.stroke();
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
('www_raycaster/js/', [
  'raycasting.js',
  'texture.js',
  'utils.js',
]);
