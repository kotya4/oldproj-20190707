
async function onload() {
  const wrapper = document.getElementsByClassName('wrapper')[0];
  const cvs = document.createElement('canvas');
  cvs.width = 400;
  cvs.height = 400;
  wrapper.appendChild(cvs);
  const ctx = cvs.getContext('2d');
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  const keys = {};
  window.onkeyup = e => keys[e.keyCode] = false;
  window.onkeydown = e => keys[e.keyCode] = true;

  const map = [
    '1111111111111111111111111',
    '1                       1',
    '1                       1',
    '1             222222    1',
    '1             2    2    1',
    '1             2    2    1',
    '1                  2    1',
    '1             222222    1',
    '1               1       1',
    '1               1       1',
    '1               1       1',
    '1111111111111111111111111',
  ].map(e => e.split('').map(e => ~~e));

  const colors = [
    '',
    '0, 0, 0',
    '0, 0, 0',
  ];

  const img = Texture();

  const rotation_speed = 0.05;
  const speed = 0.2;
  const pos = [8, 8];
  const old = [0, 0];
  const fov = Math.PI / 3;
  const radius = 1;
  let eye = 3.9;

  const col_num = 400;
  const scale_w = ctx.canvas.width / col_num;
  const half_height = ctx.canvas.height / 2;
  const depth = 20;
  const step = 0.01;
  const angle_step = fov / col_num;


  const plane = { x: 5, y: 5, r: 0.5 };


  const debugflag = true;
  //window.onclick = draw;
  window.onclick = draw;
  //setInterval(draw, 50);

  function draw() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    let angle = eye - fov / 2;

    //const zbuffer = [...Array(col_num)];
    //console.log('--->');
    let plane_tex = 0;
    const plane_dist = Math.sqrt(Math.pow(pos[0] - plane.x, 2) + Math.pow(pos[1] - plane.y, 2));

    const plane_l = { x: plane.x - plane.r * Math.sin(eye - Math.PI / 2), y: plane.y - plane.r * Math.cos(eye - Math.PI / 2) };
    const plane_r = { x: plane.x + plane.r * Math.sin(eye - Math.PI / 2), y: plane.y + plane.r * Math.cos(eye - Math.PI / 2) };
    const plane_max = { x: Math.max(plane_l.x, plane_r.x) + 0.01, y: Math.max(plane_l.y, plane_r.y) + 0.01 };
    const plane_min = { x: Math.min(plane_l.x, plane_r.x) - 0.01, y: Math.min(plane_l.y, plane_r.y) - 0.01 };

    for (let i = 0; i < col_num; ++i) {
      angle += angle_step;
      const sina = Math.sin(angle);
      const cosa = Math.cos(angle);
      for (let distance = 0; distance < depth; distance += step) {
        const real_x = pos[0] + sina * distance;
        const real_y = pos[1] + cosa * distance;
        const x = ~~real_x;
        const y = ~~real_y;
        if (x < 0 || y < 0 || x >= map.length || y >= map[0].length) break;
        if (map[x][y]) {
          const cdist = distance * Math.cos(eye - angle);
          const h = ctx.canvas.height / (cdist + 1);

          const block_x = (real_x - x);
          const block_y = (real_y - y);
          const img_x = Math.abs(block_x - block_y)  * img.width;
          //console.log(img_x);
          //const img_x = (block_x < 1 - step && block_x > step ? block_x : block_y) * img.width;
          ctx.drawImage(img, img_x, 0, scale_w, img.height, i * scale_w, half_height - h, scale_w, h * 2);

          ctx.fillStyle = `rgba(${colors[map[x][y] % colors.length]}, ${cdist / depth})`;
          ctx.fillRect(i * scale_w, half_height - h - 1, scale_w, h * 2 + 2);

          break;
        }

        // drawing plane
        if (plane.x - plane.r < real_x && real_x < plane.x + plane.r && plane.y - plane.r < real_y && real_y < plane.y + plane.r) {
          const d = plane_dist * 1;//Math.cos(eye - angle);
          const h = ctx.canvas.height / (d + 1);
          if (plane_min.x < real_x && real_x < plane_max.x && plane_min.y < real_y && real_y < plane_max.y) {

            const mx = (real_x - plane_min.x);
            const my = (real_y - plane_min.y);
            const img_x = Math.abs(mx - my) * img.width % img.width;
            console.log(mx, my, img_x);

            //const img_x = (Math.abs(((real_x - ~~real_x) - (real_y - ~~real_y)) - plane.r * 2) * img.width) % img.width;

            ctx.drawImage(img, img_x, 0, scale_w, img.height, i * scale_w, half_height - h, scale_w, h * 2);

            //ctx.fillStyle = `blue`;
            //ctx.fillRect(i * scale_w, half_height - h - 1, scale_w, h * 2 + 2);
            break;
          }
        }
      }

    }


    ctx.fillStyle = 'white';
    ctx.fillText(String(plane_dist), 10, 10);


    //clearInterval(1); return;

    if (keys[81] || debugflag) {
      pos[0] -= Math.cos(eye) * speed;
      pos[1] += Math.sin(eye) * speed;
    }
    if (keys[69]) {
      pos[0] += Math.cos(eye) * speed;
      pos[1] -= Math.sin(eye) * speed;
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
      old[0] = pos[0];
      old[1] = pos[1];
      pos[0] += dx;
      pos[1] += dy;

      const x = ~~pos[0];
      const y = ~~pos[1];
      if (map[x][y]) {
        const lines = [
          [[x + 1, y + 1], [x + 0, y + 1]],
          [[x + 1, y + 0], [x + 0, y + 0]],
          [[x + 1, y + 0], [x + 1, y + 1]],
          [[x + 0, y + 0], [x + 0, y + 1]],
        ];
        for (let l of lines) {
          const corr = collision_correction([old, [pos[0], pos[1]]], [l[1], l[0]]);
          if (corr != null) {
            pos[0] = corr[0];
            pos[1] = corr[1];
          }
        }
      }

    }

    if (keys[65]) {
      eye -= rotation_speed;
      if (eye > Math.PI * 2) eye = eye - Math.PI * 2; else if (eye < 0) eye = Math.PI * 2 + eye;
    } else if (keys[68] || debugflag) {
      eye += rotation_speed;
      if (eye > Math.PI * 2) eye = eye - Math.PI * 2; else if (eye < 0) eye = Math.PI * 2 + eye;
    }


    for (let x = 0; x < map.length; ++x) for (let y = 0; y < map[0].length; ++y) {
      ctx.fillStyle = map[x][y] ? 'white' : 'black';
      ctx.fillRect(x * 10, y * 10, 9, 9);
    }
    ctx.fillStyle = 'red';
    ctx.fillRect(old[0] * 10 - 5, old[1] * 10 - 5, 10, 10);
    ctx.fillStyle = 'blue';
    ctx.fillRect(pos[0] * 10 - 5, pos[1] * 10 - 5, 10, 10);
    ctx.fillStyle = 'green';
    ctx.fillRect(plane.x * 10 - 5, plane.y * 10 - 5, 10, 10);

    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(pos[0] * 10, pos[1] * 10);
    ctx.lineTo(pos[0] * 10 + 20 * Math.sin(eye), pos[1] * 10 + 20 * Math.cos(eye));
    ctx.stroke();

    ctx.strokeStyle = 'yellow';
    ctx.beginPath();
    ctx.moveTo(plane.x * 10 - 20 * Math.sin(eye - Math.PI / 2), plane.y * 10 - 20 * Math.cos(eye - Math.PI / 2)); // left
    ctx.lineTo(plane.x * 10 + 20 * Math.sin(eye - Math.PI / 2), plane.y * 10 + 20 * Math.cos(eye - Math.PI / 2)); // right
    ctx.stroke();

  }

  const scale = (v, a) => v.map(e => e * a);
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1];
  const mag = v => Math.sqrt(dot(v, v));
  const normalize = (v) => { const m = mag(v); return [v[0] / m, v[1] / m]; }
  function collision_correction(player, cline) {
    const eps = 0.01;
    const line_start = cline[0];
    const line_end = cline[1];
    const player_start = player[0];
    const player_end = player[1];
    // The line to collide to, made from two points
    const line = sub(line_end, line_start);
    // The line normal
    const normal = normalize([line[1], -line[0]]);
    // The closest distance to the line from the origin (0, 0), is in the direction of the normal
    let d = dot(normal, line_start);
    // Check the distance from the line to the player start position
    const start_dist = dot(normal, player_start) - d;
    // If the distance is negative, that means the player is 'behind' the line
    // To correctly use the normal, if that is the case, invert the normal
    if(start_dist < 0) {
      normal[0] = -normal[0];
      normal[1] = -normal[1];
      d = -d;
    }
    // Check the distance from the line to the player end position
    // (using corrected normal if necessary, so playerStart is always in front of the line now)
    const end_dist = 1 * dot(normal, player_end) - d;
    // Check if playerEnd is behind the line
    if(end_dist < 0) {
     // Here a collision has occured.
     // Calculate the new position by moving playerEnd out to the line in the direction of the normal,
     // and a little bit further to counteract floating point inaccuracies
     return add(player_end, scale(normal, eps - end_dist));
     // eps should be something less than a visible pixel, so it's not noticeable
    }
    return null;
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
  'texture.js',
]);


/*

// drawing plane
        if (plane.x - plane.r < real_x && real_x < plane.x + plane.r && plane.y - plane.r < real_y && real_y < plane.y + plane.r) {
          const d = distance * Math.cos(eye - angle);//Math.sqrt(Math.pow(pos[0] - plane.x, 2) + Math.pow(pos[1] - plane.y, 2)) * Math.cos(eye - angle);
          const h = ctx.canvas.height / (d + 1);

          const img_x = (Math.abs(((real_x - ~~real_x) - (real_y - ~~real_y)) - plane.r * 2) * img.width) % img.width;
          ctx.drawImage(img, img_x, 0, scale_w, img.height, i * scale_w, half_height - h, scale_w, h * 2);
          //console.log(img_x);

          //const l = plane.x - plane.r * Math.cos(eye);
          //const r = plane.x + plane.r * Math.cos(eye);
          //if (l < real_x && real_x < r) {
            //const cdist = distance * Math.cos(eye - angle);

            //ctx.fillStyle = 'blue';
            //ctx.fillRect(i * scale_w, half_height - h, scale_w, h * 2);

            break;
          //}
        }

*/