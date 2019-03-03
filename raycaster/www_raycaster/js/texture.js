
function Texture() {
  const img = new Image();
  img.width = 64;
  img.height = 64;
  img.src = `data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQA\
BAAD/4AAcT2NhZCRSZXY6IDIwMTkzICQAAAAAAAAAAAj/2wCEAAYEBAYIBgg\
ICAgJCAgICQsKCgoKCwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxs\
bHB8fHx8fHx8fHx8BBxAQICAgICAgIEBAQEBAgICAgICAgICAgICAgICAgIC\
AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgP/AABEIAEAAQAMBEQA\
CEQEDEQH/xACDAAEBAQEAAgAAAAAAAAAAAAAGBwUEAAMBAQEBAQEBAQAAAAA\
AAAAAAAQDAgUBBgAQAAIBAgQDBQYEBgIAAAAAAAECAwQRAAUSIQYTMQciQWF\
xFDJCUYGRI4KhsSRSU2JyssHSEQEBAQABAwUBAAAAAAAAAAAAAQIRAyExEhN\
BUWFx/9oADAMBAAIRAxEAPwCRZbUNJLPZm1SNpG5vYt3j9emIaXjfyISz1sj\
MzcsMI1uTuWYFj9Iwfvg+qXmd1ep6iye93SPn02wc/hxZvmlFHbm1SKxI7mr\
VIfSNbsftj17yEcYaUi9tUGaNTpljbUmqN9j1swIxXI+525d/BeZUzArBO8s\
MqqJYpD+JH/K/mQfHGqGQ8RcW5XSBYqqQ7p8r+l/XHe6e/wBfO9Tp8phV8fZ\
ZJWlY9fK1Cz7jxx0Z1o5t6F+w7L/afa5eWCWJfp8K7339MfL19hI3oZ8wndI\
YIJQqlfxFkMJGrcsLX2+d8T4/Vu59wnVVBeejnkMhjjJjdjdjY7aj54Po7Nc\
dRwVK1askE7wR3YymNbO5Nvj94EHzIxuaTuL9trNMmCZJNBLK9QzRMrSPbUb\
jbYbdcYIs7VO8gkngzWlYPvcRtYaTY7EEfS+L1y+Hq7Tqic1QkK3jK6Rc2BW\
52/LhOKJqJ3Gy6xbbvDzB3+eLpGnD1YkM1QxtblTEk9d0Nv8AjHP06GTfgxk\
qII+nujewviOnXzxY68oAhzmQyF4wwIXSjMTfw2GM1ieaaRsQmsxllv0YASa\
fn3SftiSrJ4vziKPLJZogCscbOA17MVFwD47nbGsp7vapRkdXPJWyVLW1M8j\
qovYFVLWGE1zp3K+MYKSvyWMlRzuWGVgbBiB/tc749xUNxE1S0q9PfHQgjr5\
Y6AZJm6ciOTSd5NX0Umw/TfA4ZSPs8zmNf4eSQo62UEHe3wnE9wvpbL3mr1q\
rxPGdJurlCzfVdW+ITg2f0lyukqpu9UzSyD+mByo7+Fwu5HqcY1YpQztTzpY\
0WhjN2nbvafhijsSD5s1sU6cB6uu3A1lv4XIJ/nJ9dQH/AFxuoxpmRvY6ikZ\
tkZGjJ6aQwYfpjzPljaVyAe0d0gqZLi3QjVtjpucUZlVxzTnppf3d730izg+\
fjgRzmoYtOYU/96KrW+dyuPb4az5VTJ56umIaaN5Iz7sqrqb8yjf7DA3ShRJ\
xI4pzyIGvY96QFVHmFPeP2xNtKeMGRs2SMm7R0xZiepeRtRJ+2F48AdTyzaq\
oZYh4aQbH/Frj/bHrDyqz8DLtb35jARrptcqQdyfAgHrjWc90t0Np7tMNzuw\
/fDwK7ZaWpFT3+pmDdf7t/Lpg5JBkVJz5pN+9HFzIz1s6EkH0vsfXBqVFjyW\
SKSkiY+7Iit6EjHPrrOiSJCCP1v4Y/PyQZsBJnfMe5jkWQN4bC5H7Yfnw5u/\
Lol4fNW5HM0xlTKdPyPdUfXGfUzwNcS1rrekjb8AG2lbb6SbXNrnDcQLdYMB\
IlT/IfviyDTq55+edTs6hiNxv1PXxuOmIEcmfBGQ1E8pWmIaU00skhZhoVBG\
zA7en3wekxXeyThM5rw9HJHUqk8DtDJHINQBUAr3l7w1Kb7jGPa5+Vve4LJO\
zDNSki3p7srKGMu1yLA7KW/TE/Z0p7+Uf7UOAYsniS8/Pq5pVTuqVjjj03e1\
9yfM/bCvTx8i+vljZO4aBJt+XdQ5XchFO1x5Gx+uDKFlHwLwxxFammQ5dmBX\
VFXUiXWXV/WgPckHmulh44bjXwHvKadofZHnnDNTCawJPRzyBYKyC5hdhvoc\
HvRvb4W+hOFcDObtCpDQ8Z53Dy2MCZpU3jFwCjyFxpt02bbGLGpVD7LaWaso\
q2ny2jmNTOYkeouRDEhB1nT0VntcDB+Cef1euCuBVyimphGSJgmmcr0e5LAH\
bfRewPr88XzlHWuS55Xt1OLpA3HHA0WbUk6sP4mxanZidI6XX82nScQ1lXNQ\
um4erMqlkp5kYwyXWxFtam906WWRR4fa+OdqHynPYnkqT1VbDIGIpZI5IZLF\
TZyQRbz07j54Z05yLuqj2h8OJmvDmYZe0fMaWnZovEioi78LLfx1qMPCf/9k=`;
  return img;
}