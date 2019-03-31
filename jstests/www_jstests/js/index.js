
window.onload = function () {

  const s1 = 'ABABCD';
  const s2 = 'VABFBCA';

  const sq = [];


  function f(s1, s2) {
    const cq = [];

    for (let k = 0; k < s2.length; ++k) {

      if (i + cq.length >= s1.length) break;

      if (s1[i + cq.length] === s2[k]) {
        cq.push(s1[i + cq.length]);
      }

    }

    return cq;
  }


  for (let i = 0; i < s1.length; ++i) {
    const cq = []; // current sequence

    const s3 = s1.substr(i);


    for (let k = 0; k < s2.length; ++k) {

      if (i + cq.length >= s1.length) break;

      if (s1[i + cq.length] === s2[k]) {
        cq.push(s1[i + cq.length]);
      }

    }

    sq.push(cq);

  }

  console.log(sq);
  console.log(sq.sort((a, b) => a.length < b.length)[0].join(''));

}
