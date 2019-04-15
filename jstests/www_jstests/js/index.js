
window.onload = function () {
  const INDEX = 1;

  const QUESTIONS = [
  ];

  const VARIANTS = [
  ];

  const TYPES = [
  ];

  if (QUESTIONS.length !== VARIANTS.length || QUESTIONS.length !== TYPES.length || VARIANTS.length !== TYPES.length) {
    //console.log(VARIANTS[51]);

    document.getElementById('w').innerHTML = 'SIZES MISMATCH';
    console.log('q: ' + QUESTIONS.length + ' v: ' + VARIANTS.length + ' t: ' + TYPES.length);
    return;
  }

  // ====================================================== //
  // ====================================================== //
  // ====================================================== //
  // ====================================================== //

  const w = document.getElementById('w');

  const t = {};
  t['texts'] = gen => `
  {<br>
  "type": "texts",<br>
  "id": "gen_${gen}",<br>
  "variants": [<br>
  "index_${gen}_1",<br>
  "index_${gen}_2",<br>
  "index_${gen}_3",<br>
  "index_${gen}_4"<br>
  ],<br>
  "validVariant": "index_${gen}_1"<br>
  },<br>`;
  t['illustration'] = gen => `
  {<br>
  "type": "illustration",<br>
  "id": "gen_${gen}",<br>
  "variants": [<br>
  "index_${gen}_1",<br>
  "index_${gen}_2",<br>
  "index_${gen}_3",<br>
  "index_${gen}_4"<br>
  ],<br>
  "validVariant": "index_${gen}_1",<br>
  "illustration": "illustration_${gen}"<br>
  },<br>`;
  t['images'] = gen => `
  {<br>
  "type": "images",<br>
  "id": "gen_${gen}",<br>
  "variants": [<br>
  "IMA1",<br>
  "IMA2",<br>
  "IMA3",<br>
  "IMA4"<br>
  ],<br>
  "validVariant": "IMA1"<br>
  },<br>`;

  const q = QUESTIONS.map(e => e.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;"));

  const v = VARIANTS.map(e => {
    if (e == null) return ['NIL', 'NIL', 'NIL', 'NIL'];
    return e.split('\n').map(e => e/*.substr(3)*/.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;"));
  });

  w.innerHTML += '<br><br>===================== VARIANTS ========================<br><br>';
  // constants
  for (let i = 0; i < q.length; ++i) {
    const s = `
    "question_gen_${INDEX + i}": { "ru": { "text": "${q[i]}" } },<br>
    "variant_gen_${INDEX + i}_index_${INDEX + i}_1": { "ru": { "text": "${v[i][0]}" } },<br>
    "variant_gen_${INDEX + i}_index_${INDEX + i}_2": { "ru": { "text": "${v[i][1]}" } },<br>
    "variant_gen_${INDEX + i}_index_${INDEX + i}_3": { "ru": { "text": "${v[i][2]}" } },<br>
    "variant_gen_${INDEX + i}_index_${INDEX + i}_4": { "ru": { "text": "${v[i][3]}" } },<br>`;
    w.innerHTML += s;
  }

  w.innerHTML += '<br><br>===================== SIGNALS ========================<br><br>';
  // signals
  for (let i = 0; i < q.length; ++i) {
    const s = `
    "index_${INDEX + i}_1": "${v[i][0]}",<br>
    "index_${INDEX + i}_2": "${v[i][1]}",<br>
    "index_${INDEX + i}_3": "${v[i][2]}",<br>
    "index_${INDEX + i}_4": "${v[i][3]}",<br>`;
    w.innerHTML += s;
  }

  w.innerHTML += '<br><br>===================== ACTIONS ========================<br><br>';
  // actions
  for (let i = 0; i < q.length; ++i) {
    w.innerHTML += `"gen_${INDEX + i}": "gen ${INDEX + i}",<br>`;
  }

  w.innerHTML += '<br><br>===================== CARD JSON ========================<br><br>';
  // card.json
  for (let i = 0; i < q.length; ++i) {
    w.innerHTML += t[TYPES[i]](INDEX + i);
  }

}
