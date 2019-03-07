
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

  const map = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,3,0,3,0,0,1,1,1,2,1,1,1,1,1,2,1,1,1,2,1,0,0,0,0,0,0,0,0,1],
    [1,0,0,3,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,1,1,1],
    [1,0,0,3,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,3,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
    [1,0,0,3,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,3,3,3,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
    [1,0,0,0,0,0,0,0,0,3,3,3,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,3,3,3,0,0,3,3,3,0,0,0,0,0,0,0,0,0,3,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,3,3,3,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,4,0,0,4,2,0,2,2,2,2,2,2,2,2,0,2,4,4,0,0,4,0,0,0,0,0,0,0,1],
    [1,0,0,4,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,4,0,0,0,0,0,0,0,1],
    [1,0,0,4,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,4,0,0,0,0,0,0,0,1],
    [1,0,0,4,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,4,0,0,0,0,0,0,0,1],
    [1,0,0,4,3,3,4,2,2,2,2,2,2,2,2,2,2,2,2,2,4,3,3,4,0,0,0,0,0,0,0,1],
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

  function draw_ray(x, y) {
    const grad = ctx.createLinearGradient(player.y * minimap_scale, player.x * minimap_scale, 150, 150); // TODO
    grad.addColorStop(0, "red");
    grad.addColorStop(1, "green");

    ctx.strokeStyle = grad;
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

  // TODO

  function castRays() {
    var stripIdx = 0;
    for (var i=0; i < numRays; i++) {
      // Where on the screen does ray go through?
      var rayScreenPos = (-numRays/2 + i) * stripWidth;

      // The distance from the viewer to the point
      // on the screen, simply Pythagoras.
      var rayViewDist = Math.sqrt(rayScreenPos*rayScreenPos + viewDist*viewDist);

      // The angle of the ray, relative to the viewing direction
      // Right triangle: a = sin(A) * c
      var rayAngle = Math.asin(rayScreenPos / rayViewDist);
      castSingleRay(
        // Add the players viewing direction
        // to get the angle in world space
        player.rot + rayAngle,
        stripIdx++
      );
    }
  }

  function castSingleRay(rayAngle) {
    // Make sure the angle is between 0 and 360 degrees
    rayAngle %= twoPI;
    if (rayAngle > 0) rayAngle += twoPI;

    // Moving right/left? up/down? Determined by
    // which quadrant the angle is in
    var right = (rayAngle > twoPI * 0.75 || rayAngle < twoPI * 0.25);
    var up = (rayAngle < 0 || rayAngle > Math.PI);

    var angleSin = Math.sin(rayAngle), angleCos = Math.cos(rayAngle);

    // The distance to the block we hit
    var dist = 0;
    // The x and y coord of where the ray hit the block
    var xHit = 0, yHit = 0;
    // The x-coord on the texture of the block,
    // i.e. what part of the texture are we going to render
    var textureX;
    // The (x,y) map coords of the block
    var wallX;
    var wallY;

    // First check against the vertical map/wall lines
    // we do this by moving to the right or left edge
    // of the block we’re standing in and then moving
    // in 1 map unit steps horizontally. The amount we have
    // to move vertically is determined by the slope of
    // the ray, which is simply defined as sin(angle) / cos(angle).

    // The slope of the straight line made by the ray
    var slope = angleSin / angleCos;
    // We move either 1 map unit to the left or right
    var dX = right ? 1 : -1;
    // How much to move up or down
    var dY = dX * slope;

    // Starting horizontal position, at one
    // of the edges of the current map block
    var x = right ? Math.ceil(player.x) : Math.floor(player.x);
    // Starting vertical position. We add the small horizontal
    // step we just made, multiplied by the slope
    var y = player.y + (x - player.x) * slope;

    while (x >= 0 && x < mapWidth && y >= 0 && y < mapHeight) {
      var wallX = Math.floor(x + (right ? 0 : -1));
      var wallY = Math.floor(y);

      // Is this point inside a wall block?
      if (map[wallY][wallX] > 0) {
        var distX = x - player.x;
        var distY = y - player.y;
        // The distance from the player to this point, squared
        dist = distX*distX + distY*distY;

        // Save the coordinates of the hit. We only really
        // use these to draw the rays on minimap
        xHit = x;
        yHit = y;
        break;
      }
      x += dX;
      y += dY;
    }


    if (dist)
    drawRay(xHit, yHit);
  }

  setInterval(() => {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    draw_minimap();
    keyboard();

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

]);
