
function Canvas(width = 320, height = 240, antialiazing = true, parent = document.body) {
  const cvs = document.createElement('canvas');
  cvs.width = width;
  cvs.height = height;
  parent.appendChild(cvs);
  const ctx = cvs.getContext('2d');
  ctx.imageSmoothingEnabled = antialiazing;
  return ctx;
}
