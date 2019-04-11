
window.onload = function () {
  const w = document.getElementById('w');

  const v = [
`80 &thinsp;060
8 &thinsp;060
80&thinsp;600
800&thinsp;060`,
`4
1
5
6`,
`5 &thinsp;000&thinsp;000&ensp;+&ensp;400 &thinsp;000&ensp;+&ensp;80 &thinsp;000&ensp;+&ensp;10
500&thinsp;000&ensp;+&ensp;40&thinsp;000&ensp;+&ensp;8&thinsp;000&ensp;+&ensp;10
5&thinsp;000&thinsp;000&ensp;+&ensp;40&thinsp;000&ensp;+&ensp;8&thinsp;000&ensp;+&ensp;10
5&thinsp;000&thinsp;000&ensp;+&ensp;400&thinsp;000&ensp;+&ensp;8&thinsp;000&ensp;+&ensp;10`,
`467&thinsp;832&ensp;>&ensp;467&thinsp;382
467&thinsp;832&ensp;>&ensp;476&thinsp;832
467&thinsp;832&ensp;<&ensp;467&thinsp;823
476&thinsp;832&ensp;<&ensp;467&thinsp;832`,

`710&thinsp;360,&ensp;700&thinsp;360,&ensp;690&thinsp;360
71&thinsp;360,&ensp;70&thinsp;360,&ensp;69&thinsp;360
710&thinsp;360,&ensp;610&thinsp;360,&ensp;510&thinsp;360
710&thinsp;360,&ensp;701&thinsp;360,&ensp;700&thinsp;360`,

`310&thinsp;000
301&thinsp;000
319&thinsp;990
390&thinsp;000`,
`10&thinsp;000
99&thinsp;999
9&thinsp;999
100&thinsp;000`,
`12&thinsp;м&ensp;4&thinsp;дм
16&thinsp;м
12&thinsp;м&ensp;40&thinsp;дм
1&thinsp;м&ensp;24&thinsp;дм`,
`5&thinsp;дм&ensp;4&thinsp;см,&ensp;543&thinsp;мм,&ensp;55&thinsp;см,&ensp;52&thinsp;дм
5&thinsp;дм&ensp;4&thinsp;см,&ensp;52&thinsp;дм,&ensp;55&thinsp;см,&ensp;543&thinsp;мм
543&thinsp;мм,&ensp;55&thinsp;см,&ensp;5&thinsp;дм&ensp;4&thinsp;см,&ensp;52&thinsp;дм
5&thinsp;дм&ensp;4&thinsp;см,&ensp;55&thinsp;см,&ensp;543&thinsp;мм,&ensp;52&thinsp;дм`,
`1&thinsp;дм<sup>2</sup>&ensp;=&ensp;1&thinsp;000&thinsp;см<sup>2</sup>
1&thinsp;м<sup>2</sup>&ensp;=&ensp;100&thinsp;дм<sup>2</sup>
1&thinsp;дм<sup>2</sup>&ensp;=&ensp;10&thinsp;000&thinsp;мм<sup>2</sup>
1&thinsp;км<sup>2</sup>&ensp;=&ensp;1&thinsp;000&thinsp;000&thinsp;м<sup>2</sup>`,
`10&thinsp;000&thinsp;а
10&thinsp;га
100&thinsp;000&thinsp;м<sup>2</sup>
1&thinsp;000&thinsp;000&thinsp;дм<sup>2</sup>`,
`20&thinsp;600&thinsp;см<sup>2</sup>
2&thinsp;600&thinsp;см<sup>2</sup>
20&thinsp;060&thinsp;см<sup>2</sup>
26&thinsp;000&thinsp;см<sup>2</sup>`,
`м<sup>2</sup>
дм<sup>2</sup>
см<sup>2</sup>
а`,
`1 4 2 3 5
1 2 3 4 5
2 5 1 3 4
2 1 3 5 4
`,
`57
52
53
33`,
`18
6
12
24`,

`15
5
3
10`,
`16&thinsp;см
8&thinsp;см
32&thinsp;см
4&thinsp;см`,
`10&thinsp;см
20&thinsp;см
5&thinsp;см
8&thinsp;см`,
`12&thinsp;см
14&thinsp;см
15&thinsp;см
28&thinsp;см`,
`5
4
3
6`,
`36&thinsp;см
28&thinsp;см
18&thinsp;см
14&thinsp;см`,
`АСВ
САВ
АВС
ВАС`,
`2&thinsp;см
4&thinsp;см
8&thinsp;см
1&thinsp;см`,
`11&thinsp;см<sup>2</sup>
4&thinsp;см<sup>2</sup>
18&thinsp;см<sup>2</sup>
14&thinsp;см<sup>2</sup>`,
`10&thinsp;см
16&thinsp;см
36&thinsp;см
5&thinsp;см`,
`26&thinsp;см
13&thinsp;см
75&thinsp;см<sup>2</sup>
175&thinsp;см<sup>2</sup>`,

`15&thinsp;см<sup>2</sup>
17&thinsp;см<sup>2</sup>
18&thinsp;см<sup>2</sup>
12&thinsp;см<sup>2</sup>`,
].map(e => {
  if (e == null) return ['NIL', 'NIL', 'NIL', 'NIL'];
  return e.split('\n').map(e => e/*.substr(3)*/.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;"));
});


const q = [
  `Запиши число восемьдесят тысяч шестьдесят`,
  `Сколько единиц в разряде сотен тысяч у числа 301&thinsp;456&thinsp;730?`,
  `Разложи число 5&thinsp;480&thinsp;010 на разрядные слагаемые`,
  `Выбери верное неравенство`,
  `Продолжи последовательность<br />740&thinsp;360,&ensp;730&thinsp;360,&ensp;720&thinsp;360,&ensp;...`,
  `Какое число следующее при счёте после числа 309&thinsp;999?`,
  `Выбери наименьшее пятизначное число`,
  `1&thinsp;240&thinsp;см &mdash; это`,
  `В каком ряду величины расположены в порядке возрастания?`,
  `Выбери равенство, в котором допущена ошибка.`,
  `1&thinsp;км<sup>2</sup>&nbsp;&mdash; это`,
  `Переведи 2&thinsp;м<sup>2</sup>&nbsp;6&thinsp;дм<sup>2</sup>&nbsp;в квадратные сантиметры`,
  `Площадь окна в комнате &mdash; примерно 3 ...`,
  `Выбери порядок действий при вычислении значения выражения.<br />78 &middot; 54 &minus; 65 &middot; 35 : 13 + 47`,
  `Выбери значение выражения.<br />6 &middot; (7 + 3) &minus; 60 : (30 &minus; 10)`,
  `Сколько человек было в классе во вторник?`,
  `На сколько больше баллов получил Дима, чем Рома?`,
  `Периметр квадрата равен 64 см.<br />Найди длину его стороны.`,
  `Найди длину стороны квадрата, периметр которого равен<br />периметру прямоугольника со сторонами 4 и 16 см.`,
  `Если периметр прямоугольника равен 28 см,<br />то длина одной из его сторон может быть равна...`,
  `Сколько разных прямоугольников с целочисленными<br />сторонами имеют периметр 20 см?`,
  `Длина одной стороны прямоугольника 8 см, а другой &mdash; на 2 см больше.<br />Найди периметр прямоугольника.`,
  `Найди на рисунке тупой угол`,
  `Чему равен радиус меньшего круга,<br />если диаметр большего равен 8 см?`,
  `Найди приближенную площадь фигуры`,
  `Найди сторону прямоугольника с площадью 40 см<sup>2</sup>&nbsp;<br />и длиной другой стороны 4 см.`,
  `Площадь прямоугольника равна 40&thinsp;см<sup>2</sup>, длина одной<br />его стороны &mdash; 5&thinsp;см. Найди периметр прямоугольника.`,
  `Найди площадь фигуры`,
].map(e => e.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;"));


  /*
  // constants
  for (let i = 0; i < q.length; ++i) {
    const s = `
    "question_gen_${62 + i}": { "ru": { "text": "${q[i]}" } },<br>
    "variant_gen_${62 + i}_index_${62 + i}_1": { "ru": { "text": "${v[i][0]}" } },<br>
    "variant_gen_${62 + i}_index_${62 + i}_2": { "ru": { "text": "${v[i][1]}" } },<br>
    "variant_gen_${62 + i}_index_${62 + i}_3": { "ru": { "text": "${v[i][2]}" } },<br>
    "variant_gen_${62 + i}_index_${62 + i}_4": { "ru": { "text": "${v[i][3]}" } },<br>`;
    w.innerHTML += s;
  }
  */

  /*
  // signals
  for (let i = 0; i < q.length; ++i) {
    const s = `
    "index_${62 + i}_1": "${v[i][0]}",<br>
    "index_${62 + i}_2": "${v[i][1]}",<br>
    "index_${62 + i}_3": "${v[i][2]}",<br>
    "index_${62 + i}_4": "${v[i][3]}",<br>`;
    w.innerHTML += s;
  }
  */

  /*
  // actions
  for (let i = 0; i < q.length; ++i) {
    w.innerHTML += `"gen_${62 + i}": "gen ${62 + i}",<br>`;
  }
  */

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
"illustration": "MYILLUS"<br>
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


  const tem = [
'texts',
'texts',
'texts',
'texts',
'texts',
'texts',
'texts',
'texts',
'texts',
'texts',
'texts',
'texts',
'texts',
'images',
'texts',
'illustration',
'illustration',
'texts',
'texts',
'texts',
'texts',
'texts',
'illustration',
'illustration',
'illustration',
'texts',
'texts',
'illustration'
  ];

  // card.json
  for (let i = 0; i < q.length; ++i) {
    w.innerHTML += t[tem[i]](62 + i);
  }

}
