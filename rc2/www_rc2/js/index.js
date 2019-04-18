
function onload() {

  const wrapper = document.getElementsByClassName('wrapper')[0];
  const cvs = document.createElement('canvas');
  cvs.width = 320;
  cvs.height = 240;
  wrapper.appendChild(cvs);
  const ctx = cvs.getContext('2d');

  const keys = {};
  window.onkeyup = e => keys[e.keyCode] = false;
  window.onkeydown = e => keys[e.keyCode] = true;

  let map = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,1,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1],
    [1,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
    [1,0,0,1,0,1,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,1,0,1,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,1,0,1,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1,1,1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1,1,1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1,1,1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,1,1,1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,1,0,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,0,0,1,0,0,0,0,0,0,0,1],
    [1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,1],
    [1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,1],
    [1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,1],
    [1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  ];

  const player = {
    x: 10,
    y: 10,
    dir: 0,
    rot: 0,
    speed: 0,
    move_speed: 0.2,
    rot_speed: 0.1
  };

  const minimap_scale = 10;

  function draw_ray(ox, oy, x, y) {
    const grad = ctx.createLinearGradient(oy * minimap_scale, ox * minimap_scale, y * minimap_scale, x  * minimap_scale);
    grad.addColorStop(0, 'yellow');
    grad.addColorStop(1, 'red');

    ctx.strokeStyle = grad;
    ctx.beginPath();
    ctx.moveTo(oy * minimap_scale, ox * minimap_scale);
    ctx.lineTo(y * minimap_scale, x * minimap_scale);
    ctx.stroke();
  }

  function draw_minimap() {
    const s = 10;
    for (let x = 0; x < map.length; ++x) for (let y = 0; y < map[0].length; ++y) {
      ctx.fillStyle = map[x][y] ? 'grey' : 'black';
      ctx.fillRect(y * minimap_scale, x * minimap_scale, minimap_scale, minimap_scale);
    }

    ctx.fillStyle = 'white';
    ctx.fillRect(player.y * minimap_scale - 3, player.x * minimap_scale - 3, 6, 6);

    ctx.strokeStyle = 'blue';
    ctx.beginPath();
    ctx.moveTo(player.y * minimap_scale, player.x * minimap_scale);
    ctx.lineTo(player.y * minimap_scale + Math.sin(player.rot) * 20, player.x * minimap_scale + Math.cos(player.rot) * 20);
    ctx.stroke();
  }

  function keyboard() {
    // rotation
    if (keys[65]) {
      player.rot += player.rot_speed;
    }
    if (keys[68]) {
      player.rot -= player.rot_speed;
    }
    // movement
    let dx = 0;
    let dy = 0;
    if (keys[87]) {
      dx += Math.cos(player.rot) * player.move_speed;
      dy += Math.sin(player.rot) * player.move_speed;
    }
    if (keys[83]) {
      dx -= Math.cos(player.rot) * player.move_speed;
      dy -= Math.sin(player.rot) * player.move_speed;
    }
    if (dx || dy) {
      const { x, y } = check_collision(player.x, player.y, player.x + dx, player.y + dy, 0.5);
      player.x = x;
      player.y = y;
    }
  }

  function is_out_of_border(x, y) {
    return y < 0 || y >= map[0].length || x < 0 || x >= map.length;
  }

  function is_block(x, y) {
    return y < 0 || y >= map[0].length || x < 0 || x >= map.length || map[x][y];
  }

  function check_collision(ox, oy, nx, ny, radius) {
    const x = ~~nx;
    const y = ~~ny;

    if (is_block(x, y)) return { x: ox, y: oy };

    const block_t = is_block(x + 0, y - 1);
    const block_b = is_block(x + 0, y + 1);
    const block_l = is_block(x - 1, y + 0);
    const block_r = is_block(x + 1, y + 0);

    if (block_t && 0 - y + ny < radius) ny = 0 + y + radius;
    if (block_b && 1 + y - ny < radius) ny = 1 + y - radius;
    if (block_l && 0 - x + nx < radius) nx = 0 + x + radius;
    if (block_r && 1 + x - nx < radius) nx = 1 + x - radius;

    const r2 = radius * radius;

    if (!(block_t && block_l) && is_block(x - 1, y - 1)) { // is tile to the top-left a wall
      const dx = nx - (x + 0);
      const dy = ny - (y + 0);
      const qx = dx * dx;
      const qy = dy * dy;
      if (qx + qy < r2) {
        if (qx > qy) nx = x + radius;
        else ny = y + radius;
      }
    }

    if (!(block_t && block_r) && is_block(x + 1, y - 1)) { // is tile to the top-right a wall
      const dx = nx - (x + 1);
      const dy = ny - (y + 0);
      const qx = dx * dx;
      const qy = dy * dy;
      if (qx + qy < r2) {
        if (qx > qy) nx = x + 1 - radius;
        else ny = y + radius;
      }
    }

    if (!(block_b && block_b) && is_block(x - 1, y + 1)) { // is tile to the bottom-left a wall
      const dx = nx - (x + 0);
      const dy = ny - (y + 1);
      const qx = dx * dx;
      const qy = dy * dy;
      if (qx + qy < r2) {
        if (qx > qy) nx = x + radius;
        else ny = y + 1 - radius;
      }
    }

    if (!(block_b && block_r) && is_block(x + 1, y + 1)) { // is tile to the bottom-right a wall
      const dx = nx - (x + 1);
      const dy = ny - (y + 1);
      const qx = dx * dx;
      const qy = dy * dy;
      if (qx + qy < r2) {
        if (qx > qy) nx = x + 1 - radius;
        else ny = y + 1 - radius;
      }
    }

    return { x: nx, y: ny };
  }



  const fov = Math.PI / 4;
  const rays_number = 50;
  const angle_step = fov / rays_number;
  const TWO_PI = 2 * Math.PI;

  function castRays() {
    for (let ray_angle = 0; ray_angle < fov; ray_angle += angle_step)
      cast_single_ray(player.rot + ray_angle - fov / 2, player.x, player.y);
  }

  function cast_single_ray(angle, from_x, from_y, from_dist = 0) {
    if ((angle %= TWO_PI) < 0) angle += TWO_PI;

    const right = angle > TWO_PI * 0.75 || angle < TWO_PI * 0.25;
    const up = angle < 0 || angle > TWO_PI * 0.5;

    const sina = Math.sin(angle);
    const cosa = Math.cos(angle);

    const vslope = sina / cosa;
    const vdx = right ? 1 : -1;
    const vdy = vdx * vslope;

    const hslope = cosa / sina;
    const hdy = up ? -1 : 1;
    const hdx = hdy * hslope;

    let horizontal = false;
    let hit_x = 0;
    let hit_y = 0;
    let dist = from_dist;
    let tex_x;
    let x;
    let y;

    let hit_wall_x = 0;
    let hit_wall_y = 0;

    let next_wall_x = 0;
    let next_wall_y = 0;



    x = right ? Math.ceil(from_x) : Math.floor(from_x);
    y = from_y + (x - from_x) * vslope;
    while (!is_out_of_border(x, y)) {
      const wall_x = ~~(x - !right);
      const wall_y = ~~y;

      if (is_block(wall_x, wall_y)) {
        const dist_x = x - from_x;
        const dist_y = y - from_y;
        dist = dist_x * dist_x + dist_y * dist_y;

        tex_x = y % 1;
        if (!right) tex_x = 1 - tex_x;

        hit_x = x;
        hit_y = y;
        hit_wall_x = wall_x;
        hit_wall_y = wall_y;
        next_wall_x = x + vdx;
        next_wall_y = y + vdy;

        horizontal = true;

        break;
      }
      x += vdx;
      y += vdy;
    }

    y = up ? Math.floor(from_y) : Math.ceil(from_y);
    x = from_x + (y - from_y) * hslope;
    while (!is_out_of_border(x, y)) {
      const wall_y = ~~(y - up);
      const wall_x = ~~x;

      if (is_block(wall_x, wall_y)) {
        const dist_x = x - from_x;
        const dist_y = y - from_y;
        const blockDist = dist_x * dist_x + dist_y * dist_y;
        if (!dist || blockDist < dist) {
          dist = blockDist;
          hit_x = x;
          hit_y = y;
          hit_wall_x = wall_x;
          hit_wall_y = wall_y;
          next_wall_x = x + hdx;
          next_wall_y = y + hdy;

          tex_x = x % 1;
          if (up) tex_x = 1 - tex_x;

          horizontal = false;
        }
        break;
      }
      x += hdx;
      y += hdy;
    }

    if (dist) {
      draw_ray(from_x, from_y, hit_x, hit_y);
      /*
      x = hit_wall_x;
      y = hit_wall_y;
      if (!is_out_of_border(x, y) && map[x][y] === 3) {
         // TODO: нужно правильно рассчитать дистанцию, сложить старую дистанцию с новой + дистанция от hit_wall до next_wall
        cast_single_ray(angle, next_wall_x, next_wall_y, dist);
      }
      */
    }



  }

  setInterval(() => {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    draw_minimap();
    keyboard();

    castRays(player.x, player.y);

  }, 50);

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
('www_rc2/js/', [
  'map-encoder.js',
]);
