
window.onload = function () {
  //create_json();
  match_audio();
}


function create_json() {
  const INDEX = 1;

  /* temp
  const QUESTIONS = [];
  const VARIANTS = [];
  const TYPES = [];
  */

  const QUESTIONS = [];
  const VARIANTS = [];
  const TYPES = [];


  console.log('q: ' + QUESTIONS.length + ' v: ' + VARIANTS.length + ' t: ' + TYPES.length);
  //console.log(VARIANTS[86 - 1]);

  if (QUESTIONS.length !== VARIANTS.length || QUESTIONS.length !== TYPES.length || VARIANTS.length !== TYPES.length) {
    document.getElementById('w').innerHTML = 'SIZES MISMATCH';
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
  "img_${gen}_1",<br>
  "img_${gen}_2",<br>
  "img_${gen}_3",<br>
  "img_${gen}_4"<br>
  ],<br>
  "validVariant": "img_${gen}_1"<br>
  },<br>`;
  t['illustration&images'] = gen => `
  {<br>
  "type": "illustration-images",<br>
  "id": "gen_${gen}",<br>
  "variants": [<br>
  "img_${gen}_1",<br>
  "img_${gen}_2",<br>
  "img_${gen}_3",<br>
  "img_${gen}_4"<br>
  ],<br>
  "validVariant": "img_${gen}_1"<br>
  "illustration": "illustration_${gen}"<br>
  },<br>`;

  const q = QUESTIONS.map(e => e.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;"));

  const v = VARIANTS.map(e => {
    if (e == null) return ['NIL', 'NIL', 'NIL', 'NIL'];
    return e.split('\n').map(e => e.substr(3).replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;"));
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
    try {
      w.innerHTML += t[TYPES[i]](INDEX + i);
    } catch(e) {
      console.log('=== error in types ===');
      console.log('i: ' + i);
      console.log('INDEX + i: ' + (INDEX + i));
      console.log('TYPES[i]: ' + TYPES[i]);
      console.log('t[TYPES[i]]: ' + t[TYPES[i]]);
      console.log('t[TYPES[i]](INDEX + i): ' + t[TYPES[i]](INDEX + i));
      throw e;
    }
  }

}


function match_audio() {
  const audio = [
    `Какое число пропущено при счёте?`,
    `В каком ряду числа расположены в порядке убывания?`,
    `Каким по счёту будет красный круг?`,
    `На какой точке сидет кузнечик?`,
    `Сколько десятков и единиц в числе 18?`,
    `Выбери отрезок длиной в 3 см`,
    `Реши задачу`,
    `Высота куста малины 9 дм, а высота куста смородины 7 дм. На сколько сантиметров высота смородины меньше высоты малины?`,
    `С помощью чего измеряют массу?`,
    `Сколько весит обезьянка?`,
    `В чём измеряют массу?`,
    `В чём измеряют объем?`,
    `В какую ёмкость помещается меньше жидкости?`,
    `Какая запись подходит к картинке?`,
    `Подбери схему`,
    `У Юли 2 яблока и 2 груши. Сколько всего фруктов у Юли?`,
    `Заполни пропуск`,
    `Число 9 уменьшили на 6 и получили`,
    `Число 2 увеличили на 5 и получили`,
    `Вычисли`,
    `Число 7 увеличили на 9 и получили`,
    `Число 14 уменьшили на 5 и получили`,
    `Где число 6 — уменьшаемое?`,
    `Чем является 3 в выражении 5+3=8?`,
    `Найди ошибку`,
    `Подбери текст к картинке`,
    `Выбери рисунок, на котором синий шар справа от жёлтого, а зелёный слева от жёлтого.`,
    `Выбери верное утверждение`,
    `Какой длины отрезок?`,
    `На сколько сантиметров один отрезок короче другого?`,
    `Сколько прямых можно провести через две точки?`,
    `Выбери луч`,
    `Выбери ломаную с 3 звеньями`,
    `Выбери четырёхугольник`,
    `Выбери квадрат`,
    `На какую фигуру похоже?`,
    `Выбери нужный билет `,
    `Где состоится представление?`,
    `Заполни таблицу`,
    `Какая будет температура завтра ночью?`,
    `Сколько всего шишек собрали мальчики?`,
    `Что из этого является задачей?`,
    `Выбери краткую запись к задаче.`,
    `Аня выбрала на планшете 10 фотографий. 6 из них она уже распечатала. Сколько фотографий осталось напечатать Ане?`,
    `Какие данные НЕ нужны для решения задачи?`,
    `Бабуля приготовила 3 банановых и 2 клубничных коктейля, 5 пирогов с вишней и 8 с черникой. На сколько меньше пирогов с вишней, чем с икой?`,
    `Выбери решение задачи.`,
    `Миша пробежал 5 кругов, а Алина — на 4 больше. Сколько кругов пробежала Алина?`,
    `Выбери недостающее условие.`,
    `Гриша и Соня путешествуют по городам России. `,
    `Сколько сувениров купила Соня?`,
    `Выбери рисунок к задаче.`,
    `Егор купил 2 мяча и 4 робота. Сколько всего игрушек купил Егор?`,
    `Соня испекла 8 морковых и 5 лимонных кексов. 6 кексов она украсила кремом. Сколько кексов осталось украсить?`,
    `В детской книжке 18 страниц. Из них 10 с картинками, остальные — без. На сколько страниц с картинками больше, чем без картинок?`,
    `Назови одним словом`,
    `Соня собрала все разные цепи из 2 частей. Какой цепи не хватает? `,
    `Продолжи ряд`,
    `Какого цвета будет шар?`,
    `Вторым `,
    `Первым`,
    `Третьим`,
    `Пятым`,
    `1 десяток и 8 единиц`,
    `8 десятков и 1 единица`,
    `1 десяток и 1 единица `,
    `8 десятков и 8 единиц`,
    `Весы`,
    `Часы`,
    `Линейка`,
    `Термометр`,
    `В килограммах`,
    `В сантиметрах`,
    `В литрах`,
    `В градусах`,
    `Кастрюля`,
    `Стакан`,
    `Бутылка`,
    `Лейка`,
    `Слагаемым`,
    `Вычитаемым`,
    `Суммой`,
    `Уменьшаемым`,
    `Белка сидит выше собаки, но ниже кота.`,
    `Белка сидит ниже собаки, но выше кота.`,
    `Кот сидит выше собаки, но ниже белки.`,
    `Собака сидит выше белки, но ниже кота.`,
    `Лиса сидит между волком и енотом, а заяц сидит рядом с енотом.`,
    `Лиса сидит между зайцом и енотом, а сова сидит рядом с енотом.`,
    `Лиса сидит между волком и енотом, а заяц сидит рядом с бобром.`,
    `Лиса сидит между волком и енотом, а бобёр сидит рядом с совой.`,
    `На треугольник`,
    `На квадрат`,
    `На круг`,
    `На прямоугольник`,
    `В театре юного зрителя`,
    `В кинотетатре`,
    `Во дворце культуры`,
    `В театре кукол`,
    `8 шишек`,
    `9 шишек`,
    `10 жёлудей`,
    `8 жёлудей`,
    `На ветке сидели 4 воробья и 3 синицы. Сколько всего птиц на ветке?`,
    `На ветке сидели 4 воробья и 3 синицы. К ним прилетели ещё 2 ласточки.`,
    `Сколько всего птиц на ветке?`,
    `На ветке сидели воробьи и синицы. Сколько всего птиц на ветке?`,
    `3 банановых и 2 клубничных коктейля`,
    `5 пирогов с вишней и 8 с черникой`,
    `3 банановых  коктейля и 5 пирогов с вишней`,
    `2 клубничных коктейля и 8 пирогов с черникой`,
    `Гриша купил 10 сувениров, а Соня — на 4 больше.`,
    `Ребята посетили 15 различных городов.`,
    `Гриша и Соня купили много сувениров.`,
    `Условий достаточно`,
    `Животные`,
    `Пятнистые`,
    `Домашние животные`,
    `Дикие животные`,
    `Красного`,
    `Фиолетового`,
    `нет пропущеных чисел`,
    `четыре`,
    `пять`,
    `шесть`,
    `Какое число предыдущее при счёте перед числом 60?`,
    `В каком ряду числа расположены в порядке возрастания?`,
    `Выбери разложение числа 34 в сумму десятков и единиц. `,
    `В каком ряду величины расположены в порядке возрастания?`,
    `Сколько в кошельке монет, а сколько копеек?`,
    `Выбери кошелёк, в котором 26 рублей`,
    `Какое время показывают часы?`,
    `Какое время будет через 20 минут?`,
    `Дополни число 16 до 20.`,
    `Выбери сумму, равную 17.`,
    `Выбери пропущенное число.`,
    `Сколько килограммов помидоров привезли в магазин? `,
    `Выбери город, в котором 26 июня обещают дождь и 24 градуса.`,
    `Найди длину ломаной`,
    `Выбери ломаную наименьшей длины`,
    `Найди периметр прямоугольника`,
    `Длина одной стороны треугольника 6 см, а двух других - по 4 см. Найди периметр треугольника.`,
    `Выбери задачу, которая не является обратной всем остальным.`,
    `Мама посмотрела 3 серии нового сериала, и ей осталось посмотреть еще 8 серий. Сколько всего серий в сериале?`,
    `В классе занято 10 парт, их на 2 больше, чем свободных. Сколько свободных парт в классе?`,
    `Выбери схему для решения задачи.`,
    `Продолжи последовательность `,
    `Букет собран из 12 роз и 7 лилий. Сколько всего цветов в букете?`,
    `Маша яблоки любит, а Даша нет.`,
    `Обе девочки любят бананы.`,
    `Даша яблоки любит, а Маша нет.`,
    `Обе девочки не любят апельсины.`,
    `Москва`,
    `Смоленск`,
    `Сочи`,
    `Воронеж`,
    `Зелёная`,
    `Синяя`,
    `Красная`,
    `Оранжевая`,
    `У Гриши в школе 5 друзей, трое из них - девочки. Сколько мальчиков в друзьях у Гриши?`,
    `У Гриши в школе 5 друзей, трое из них - мальчики. Сколько девочек в друзьях у Гриши? `,
    `У Гриши в школе среди друзей 2 девочки и 3 мальчика. Сколько друзей у Гриши в школе?`,
    `У Гриши в школе 5 друзей,  двое из них - девочки. Сколько мальчиков в друзьях у Гриши?`,
  ];

  const json = {
    "question_gen_1": { "ru": { "text": "Какое число пропущено при счёте?<br>1, 2, 3, 4, 6, 7, 8, 9" } },
    "variant_gen_1_index_1_1": { "ru": { "text": "4" } },
    "variant_gen_1_index_1_2": { "ru": { "text": "5" } },
    "variant_gen_1_index_1_3": { "ru": { "text": "6" } },
    "variant_gen_1_index_1_4": { "ru": { "text": "нет пропущеных чисел" } },
    "question_gen_2": { "ru": { "text": "В каком ряду числа расположены в порядке убывания?" } },
    "variant_gen_2_index_2_1": { "ru": { "text": "9, 8, 7, 6, 5, 4" } },
    "variant_gen_2_index_2_2": { "ru": { "text": "9, 8, 7, 6, 4, 5" } },
    "variant_gen_2_index_2_3": { "ru": { "text": "9, 7, 8, 6, 5, 4" } },
    "variant_gen_2_index_2_4": { "ru": { "text": "9, 8, 6, 7, 5, 4" } },
    "question_gen_3": { "ru": { "text": "Каким по счёту будет красный круг?" } },
    "variant_gen_3_index_3_1": { "ru": { "text": "Вторым" } },
    "variant_gen_3_index_3_2": { "ru": { "text": "Первым" } },
    "variant_gen_3_index_3_3": { "ru": { "text": "Третьим" } },
    "variant_gen_3_index_3_4": { "ru": { "text": "Пятым" } },
    "question_gen_4": { "ru": { "text": "Посчитай рыбок" } },
    "variant_gen_4_index_4_1": { "ru": { "text": "14" } },
    "variant_gen_4_index_4_2": { "ru": { "text": "13" } },
    "variant_gen_4_index_4_3": { "ru": { "text": "12" } },
    "variant_gen_4_index_4_4": { "ru": { "text": "11" } },
    "question_gen_5": { "ru": { "text": "На какой точке сидет кузнечик?" } },
    "variant_gen_5_index_5_1": { "ru": { "text": "8" } },
    "variant_gen_5_index_5_2": { "ru": { "text": "7" } },
    "variant_gen_5_index_5_3": { "ru": { "text": "6" } },
    "variant_gen_5_index_5_4": { "ru": { "text": "9" } },
    "question_gen_6": { "ru": { "text": "Сколько десятков и единиц в числе 18?" } },
    "variant_gen_6_index_6_1": { "ru": { "text": "1 десяток и 8 единиц" } },
    "variant_gen_6_index_6_2": { "ru": { "text": "8 десятков и 1 единица" } },
    "variant_gen_6_index_6_3": { "ru": { "text": "1 десяток и 1 единица" } },
    "variant_gen_6_index_6_4": { "ru": { "text": "8 десятков и 8 единиц" } },
    "question_gen_7": { "ru": { "text": "Выбери отрезок длиной в 3&thinsp;см" } },
    "variant_gen_7_index_7_1": { "ru": { "text": "3&thinsp;см" } },
    "variant_gen_7_index_7_2": { "ru": { "text": "2&thinsp;см" } },
    "variant_gen_7_index_7_3": { "ru": { "text": "4&thinsp;см" } },
    "variant_gen_7_index_7_4": { "ru": { "text": "5&thinsp;см" } },
    "question_gen_8": { "ru": { "text": "1&thinsp;дм 4&thinsp;см = " } },
    "variant_gen_8_index_8_1": { "ru": { "text": "14&thinsp;см" } },
    "variant_gen_8_index_8_2": { "ru": { "text": "4&thinsp;см" } },
    "variant_gen_8_index_8_3": { "ru": { "text": "10&thinsp;см" } },
    "variant_gen_8_index_8_4": { "ru": { "text": "14&thinsp;дм" } },
    "question_gen_9": { "ru": { "text": "Высота куста малины 9&thinsp;дм, а высота куста смородины 7&thinsp;дм. На сколько сантиметров высота смородины меньше высоты малины?" } },
    "variant_gen_9_index_9_1": { "ru": { "text": "20&thinsp;см" } },
    "variant_gen_9_index_9_2": { "ru": { "text": "10&thinsp;см" } },
    "variant_gen_9_index_9_3": { "ru": { "text": "16&thinsp;см" } },
    "variant_gen_9_index_9_4": { "ru": { "text": "2&thinsp;дм" } },
    "question_gen_10": { "ru": { "text": "С помощью чего измеряют массу?" } },
    "variant_gen_10_index_10_1": { "ru": { "text": "Весы" } },
    "variant_gen_10_index_10_2": { "ru": { "text": "Часы" } },
    "variant_gen_10_index_10_3": { "ru": { "text": "Линейка" } },
    "variant_gen_10_index_10_4": { "ru": { "text": "Термометр" } },
    "question_gen_11": { "ru": { "text": "Сколько весит обезьянка?" } },
    "variant_gen_11_index_11_1": { "ru": { "text": "5&thinsp;кг" } },
    "variant_gen_11_index_11_2": { "ru": { "text": "3&thinsp;кг" } },
    "variant_gen_11_index_11_3": { "ru": { "text": "2&thinsp;кг" } },
    "variant_gen_11_index_11_4": { "ru": { "text": "1&thinsp;кг" } },
    "question_gen_12": { "ru": { "text": "В чём измеряют массу?" } },
    "variant_gen_12_index_12_1": { "ru": { "text": "В килограммах" } },
    "variant_gen_12_index_12_2": { "ru": { "text": "В сантиметрах" } },
    "variant_gen_12_index_12_3": { "ru": { "text": "В литрах" } },
    "variant_gen_12_index_12_4": { "ru": { "text": "В градусах" } },
    "question_gen_13": { "ru": { "text": "В чём измеряют объем?" } },
    "variant_gen_13_index_13_1": { "ru": { "text": "В литрах" } },
    "variant_gen_13_index_13_2": { "ru": { "text": "В сантиметрах" } },
    "variant_gen_13_index_13_3": { "ru": { "text": "В килограммах" } },
    "variant_gen_13_index_13_4": { "ru": { "text": "В градусах" } },
    "question_gen_14": { "ru": { "text": "В какую ёмкость помещается меньше жидкости?" } },
    "variant_gen_14_index_14_1": { "ru": { "text": "Кастрюля" } },
    "variant_gen_14_index_14_2": { "ru": { "text": "Стакан" } },
    "variant_gen_14_index_14_3": { "ru": { "text": "Бутылка" } },
    "variant_gen_14_index_14_4": { "ru": { "text": "Лейка" } },
    "question_gen_15": { "ru": { "text": "Какая запись подходит к картинке?" } },
    "variant_gen_15_index_15_1": { "ru": { "text": "5 &minus; 1" } },
    "variant_gen_15_index_15_2": { "ru": { "text": "4 &minus; 1" } },
    "variant_gen_15_index_15_3": { "ru": { "text": "5 + 1" } },
    "variant_gen_15_index_15_4": { "ru": { "text": "5 &minus; 2" } },
    "question_gen_16": { "ru": { "text": "Подбери схему<br />У Юли 2 яблока и 2 груши. Сколько всего фруктов у Юли?" } },
    "variant_gen_16_index_16_1": { "ru": { "text": "NIL" } },
    "variant_gen_16_index_16_2": { "ru": { "text": "NIL" } },
    "variant_gen_16_index_16_3": { "ru": { "text": "NIL" } },
    "variant_gen_16_index_16_4": { "ru": { "text": "NIL" } },
    "question_gen_17": { "ru": { "text": "Заполни пропуск<br />1 + __ = 5" } },
    "variant_gen_17_index_17_1": { "ru": { "text": "4" } },
    "variant_gen_17_index_17_2": { "ru": { "text": "3" } },
    "variant_gen_17_index_17_3": { "ru": { "text": "2" } },
    "variant_gen_17_index_17_4": { "ru": { "text": "5" } },
    "question_gen_18": { "ru": { "text": "Число 9 уменьшили на 6 и получили" } },
    "variant_gen_18_index_18_1": { "ru": { "text": "3" } },
    "variant_gen_18_index_18_2": { "ru": { "text": "5" } },
    "variant_gen_18_index_18_3": { "ru": { "text": "10" } },
    "variant_gen_18_index_18_4": { "ru": { "text": "6" } },
    "question_gen_19": { "ru": { "text": "Число 2 увеличили на 5 и получили" } },
    "variant_gen_19_index_19_1": { "ru": { "text": "7" } },
    "variant_gen_19_index_19_2": { "ru": { "text": "6" } },
    "variant_gen_19_index_19_3": { "ru": { "text": "5" } },
    "variant_gen_19_index_19_4": { "ru": { "text": "3" } },
    "question_gen_20": { "ru": { "text": "Вычисли 15 &minus; 4 " } },
    "variant_gen_20_index_20_1": { "ru": { "text": "11" } },
    "variant_gen_20_index_20_2": { "ru": { "text": "12" } },
    "variant_gen_20_index_20_3": { "ru": { "text": "10" } },
    "variant_gen_20_index_20_4": { "ru": { "text": "19" } },
    "question_gen_21": { "ru": { "text": "Вычисли 12 + 6 " } },
    "variant_gen_21_index_21_1": { "ru": { "text": "18" } },
    "variant_gen_21_index_21_2": { "ru": { "text": "19" } },
    "variant_gen_21_index_21_3": { "ru": { "text": "20" } },
    "variant_gen_21_index_21_4": { "ru": { "text": "17" } },
    "question_gen_22": { "ru": { "text": "Вычисли 8 + 6 " } },
    "variant_gen_22_index_22_1": { "ru": { "text": "14" } },
    "variant_gen_22_index_22_2": { "ru": { "text": "12" } },
    "variant_gen_22_index_22_3": { "ru": { "text": "18" } },
    "variant_gen_22_index_22_4": { "ru": { "text": "16" } },
    "question_gen_23": { "ru": { "text": "Число 7 увеличили на 9 и получили" } },
    "variant_gen_23_index_23_1": { "ru": { "text": "16" } },
    "variant_gen_23_index_23_2": { "ru": { "text": "15" } },
    "variant_gen_23_index_23_3": { "ru": { "text": "19" } },
    "variant_gen_23_index_23_4": { "ru": { "text": "17" } },
    "question_gen_24": { "ru": { "text": "Вычисли 13 &minus; 7 " } },
    "variant_gen_24_index_24_1": { "ru": { "text": "6" } },
    "variant_gen_24_index_24_2": { "ru": { "text": "7" } },
    "variant_gen_24_index_24_3": { "ru": { "text": "10" } },
    "variant_gen_24_index_24_4": { "ru": { "text": "8" } },
    "question_gen_25": { "ru": { "text": "Число 14 уменьшили на 5 и получили" } },
    "variant_gen_25_index_25_1": { "ru": { "text": "9" } },
    "variant_gen_25_index_25_2": { "ru": { "text": "10" } },
    "variant_gen_25_index_25_3": { "ru": { "text": "8" } },
    "variant_gen_25_index_25_4": { "ru": { "text": "4" } },
    "question_gen_26": { "ru": { "text": "Где число 6 &mdash; уменьшаемое?" } },
    "variant_gen_26_index_26_1": { "ru": { "text": "6 &minus; 4 = 2" } },
    "variant_gen_26_index_26_2": { "ru": { "text": "6 + 4 = 10" } },
    "variant_gen_26_index_26_3": { "ru": { "text": "8 &minus; 2 = 6" } },
    "variant_gen_26_index_26_4": { "ru": { "text": "8 &minus; 6 = 2" } },
    "question_gen_27": { "ru": { "text": "Чем является 3 в выражении 5 + 3 = 8?" } },
    "variant_gen_27_index_27_1": { "ru": { "text": "Слагаемым" } },
    "variant_gen_27_index_27_2": { "ru": { "text": "Вычитаемым" } },
    "variant_gen_27_index_27_3": { "ru": { "text": "Суммой" } },
    "variant_gen_27_index_27_4": { "ru": { "text": "Уменьшаемым" } },
    "question_gen_28": { "ru": { "text": "Найди ошибку" } },
    "variant_gen_28_index_28_1": { "ru": { "text": "10 + 6 = 7 + 10" } },
    "variant_gen_28_index_28_2": { "ru": { "text": "10 + 6 = 6 + 10" } },
    "variant_gen_28_index_28_3": { "ru": { "text": "10 + 6 < 7 + 10" } },
    "variant_gen_28_index_28_4": { "ru": { "text": "10 + 7 > 10 + 6" } },
    "question_gen_29": { "ru": { "text": "Подбери текст к картинке" } },
    "variant_gen_29_index_29_1": { "ru": { "text": "Попугай сидит выше собаки,<br />но ниже кота." } },
    "variant_gen_29_index_29_2": { "ru": { "text": "Попугай сидит ниже собаки,<br />но выше кота." } },
    "variant_gen_29_index_29_3": { "ru": { "text": "Кот сидит выше собаки,<br />но ниже попугая." } },
    "variant_gen_29_index_29_4": { "ru": { "text": "Собака сидит выше попугая,<br />но ниже кота." } },
    "question_gen_30": { "ru": { "text": "Выбери рисунок, на котором синий шар справа от жёлтого,<br />а розовый слева от жёлтого." } },
    "variant_gen_30_index_30_1": { "ru": { "text": "NIL" } },
    "variant_gen_30_index_30_2": { "ru": { "text": "NIL" } },
    "variant_gen_30_index_30_3": { "ru": { "text": "NIL" } },
    "variant_gen_30_index_30_4": { "ru": { "text": "NIL" } },
    "question_gen_31": { "ru": { "text": "Выбери верное утверждение" } },
    "variant_gen_31_index_31_1": { "ru": { "text": "Енот сидит между ежом и петухом,<br />а заяц сидит рядом с ежом." } },
    "variant_gen_31_index_31_2": { "ru": { "text": "Енот сидит между ежом и петухом,<br />а заяц сидит рядом с лисой." } },
    "variant_gen_31_index_31_3": { "ru": { "text": "Енот сидит между лисой и петухом,<br />а заяц сидит рядом с ежом." } },
    "variant_gen_31_index_31_4": { "ru": { "text": "Енот сидит между ежом и петухом,<br />а лиса сидит рядом с ежом." } },
    "question_gen_32": { "ru": { "text": "Какой длины отрезок?" } },
    "variant_gen_32_index_32_1": { "ru": { "text": "4&thinsp;см" } },
    "variant_gen_32_index_32_2": { "ru": { "text": "5&thinsp;см" } },
    "variant_gen_32_index_32_3": { "ru": { "text": "3&thinsp;см" } },
    "variant_gen_32_index_32_4": { "ru": { "text": "8&thinsp;см" } },
    "question_gen_33": { "ru": { "text": "На сколько сантиметров один отрезок короче другого?" } },
    "variant_gen_33_index_33_1": { "ru": { "text": "2&thinsp;см" } },
    "variant_gen_33_index_33_2": { "ru": { "text": "4&thinsp;см" } },
    "variant_gen_33_index_33_3": { "ru": { "text": "10&thinsp;см" } },
    "variant_gen_33_index_33_4": { "ru": { "text": "8&thinsp;см" } },
    "question_gen_34": { "ru": { "text": "Сколько прямых можно провести через две точки?" } },
    "variant_gen_34_index_34_1": { "ru": { "text": "1" } },
    "variant_gen_34_index_34_2": { "ru": { "text": "2" } },
    "variant_gen_34_index_34_3": { "ru": { "text": "много" } },
    "variant_gen_34_index_34_4": { "ru": { "text": "ни одной" } },
    "question_gen_35": { "ru": { "text": "Выбери луч" } },
    "variant_gen_35_index_35_1": { "ru": { "text": "NIL" } },
    "variant_gen_35_index_35_2": { "ru": { "text": "NIL" } },
    "variant_gen_35_index_35_3": { "ru": { "text": "NIL" } },
    "variant_gen_35_index_35_4": { "ru": { "text": "NIL" } },
    "question_gen_36": { "ru": { "text": "Выбери ломаную с 3 звеньями" } },
    "variant_gen_36_index_36_1": { "ru": { "text": "NIL" } },
    "variant_gen_36_index_36_2": { "ru": { "text": "NIL" } },
    "variant_gen_36_index_36_3": { "ru": { "text": "NIL" } },
    "variant_gen_36_index_36_4": { "ru": { "text": "NIL" } },
    "question_gen_37": { "ru": { "text": "Выбери четырёхугольник" } },
    "variant_gen_37_index_37_1": { "ru": { "text": "NIL" } },
    "variant_gen_37_index_37_2": { "ru": { "text": "NIL" } },
    "variant_gen_37_index_37_3": { "ru": { "text": "NIL" } },
    "variant_gen_37_index_37_4": { "ru": { "text": "NIL" } },
    "question_gen_38": { "ru": { "text": "Выбери квадрат" } },
    "variant_gen_38_index_38_1": { "ru": { "text": "NIL" } },
    "variant_gen_38_index_38_2": { "ru": { "text": "NIL" } },
    "variant_gen_38_index_38_3": { "ru": { "text": "NIL" } },
    "variant_gen_38_index_38_4": { "ru": { "text": "NIL" } },
    "question_gen_39": { "ru": { "text": "На какую фигуру похоже?" } },
    "variant_gen_39_index_39_1": { "ru": { "text": "На треугольник" } },
    "variant_gen_39_index_39_2": { "ru": { "text": "На квадрат" } },
    "variant_gen_39_index_39_3": { "ru": { "text": "На круг" } },
    "variant_gen_39_index_39_4": { "ru": { "text": "На прямоугольник" } },
    "question_gen_40": { "ru": { "text": "Выбери нужный билет " } },
    "variant_gen_40_index_40_1": { "ru": { "text": "Танцы, Дворец культуры, 1 сентября" } },
    "variant_gen_40_index_40_2": { "ru": { "text": "Концерт, Дворец культуры, 1 сентября" } },
    "variant_gen_40_index_40_3": { "ru": { "text": "Танцы, Дворец спорта, 1 сентября" } },
    "variant_gen_40_index_40_4": { "ru": { "text": "Танцы, Дворец культуры, 1 октября" } },
    "question_gen_41": { "ru": { "text": "Где состоится представление?" } },
    "variant_gen_41_index_41_1": { "ru": { "text": "В театре юного зрителя" } },
    "variant_gen_41_index_41_2": { "ru": { "text": "В кинотетатре" } },
    "variant_gen_41_index_41_3": { "ru": { "text": "Во дворце культуры" } },
    "variant_gen_41_index_41_4": { "ru": { "text": "В театре кукол" } },
    "question_gen_42": { "ru": { "text": "Заполни таблицу" } },
    "variant_gen_42_index_42_1": { "ru": { "text": "NIL" } },
    "variant_gen_42_index_42_2": { "ru": { "text": "NIL" } },
    "variant_gen_42_index_42_3": { "ru": { "text": "NIL" } },
    "variant_gen_42_index_42_4": { "ru": { "text": "NIL" } },
    "question_gen_43": { "ru": { "text": "Какая будет температура завтра ночью?" } },
    "variant_gen_43_index_43_1": { "ru": { "text": "+13" } },
    "variant_gen_43_index_43_2": { "ru": { "text": "+18" } },
    "variant_gen_43_index_43_3": { "ru": { "text": "+16" } },
    "variant_gen_43_index_43_4": { "ru": { "text": "+19" } },
    "question_gen_44": { "ru": { "text": "Сколько всего шишек собрали мальчики?" } },
    "variant_gen_44_index_44_1": { "ru": { "text": "8 шишек" } },
    "variant_gen_44_index_44_2": { "ru": { "text": "9 шишек" } },
    "variant_gen_44_index_44_3": { "ru": { "text": "10 жёлудей" } },
    "variant_gen_44_index_44_4": { "ru": { "text": "8 жёлудей" } },
    "question_gen_45": { "ru": { "text": "Что из этого является задачей?" } },
    "variant_gen_45_index_45_1": { "ru": { "text": "На ветке сидели 4 воробья и 3 синицы.<br />Сколько всего птиц на ветке?" } },
    "variant_gen_45_index_45_2": { "ru": { "text": "На ветке сидели 4 воробья и 3 синицы.<br />К ним прилетели ещё 2 ласточки." } },
    "variant_gen_45_index_45_3": { "ru": { "text": "Сколько всего птиц на ветке?" } },
    "variant_gen_45_index_45_4": { "ru": { "text": "На ветке сидели воробьи и синицы.<br />Сколько всего птиц на ветке?" } },
    "question_gen_46": { "ru": { "text": "Выбери краткую запись к задаче.<br />Аня выбрала на планшете 10 фотографий. 6 из них она уже распечатала.<br />Сколько фотографий осталось напечатать Ане?" } },
    "variant_gen_46_index_46_1": { "ru": { "text": "NIL" } },
    "variant_gen_46_index_46_2": { "ru": { "text": "NIL" } },
    "variant_gen_46_index_46_3": { "ru": { "text": "NIL" } },
    "variant_gen_46_index_46_4": { "ru": { "text": "NIL" } },
    "question_gen_47": { "ru": { "text": "Какие данные НЕ нужны для решения задачи?<br />Бабуля приготовила 3 банановых и 2 клубничных коктейля, 5 пирогов с вишней<br />и 8 с черникой. На сколько меньше пирогов с вишней, чем с черникой?" } },
    "variant_gen_47_index_47_1": { "ru": { "text": "3 банановых и 2 клубничных коктейля" } },
    "variant_gen_47_index_47_2": { "ru": { "text": "5 пирогов с вишней и 8 с черникой" } },
    "variant_gen_47_index_47_3": { "ru": { "text": "3 банановых коктейля и 5 пирогов с вишней" } },
    "variant_gen_47_index_47_4": { "ru": { "text": "2 клубничных коктейля и 8 пирогов с черникой" } },
    "question_gen_48": { "ru": { "text": "Выбери решение задачи.<br />Миша пробежал 5 кругов, а Алина &mdash; на 4 больше.<br />Сколько кругов пробежала Алина?" } },
    "variant_gen_48_index_48_1": { "ru": { "text": "5 + 4 = 9 (кр.)" } },
    "variant_gen_48_index_48_2": { "ru": { "text": "5 &minus; 4 = 1 (кр.)" } },
    "variant_gen_48_index_48_3": { "ru": { "text": "4 + 4 = 8 (кр.)" } },
    "variant_gen_48_index_48_4": { "ru": { "text": "5 + 5 = 10 (кр.)" } },
    "question_gen_49": { "ru": { "text": "Выбери недостающее условие.<br>Гриша и Соня путешествуют по городам России.<br>Сколько сувениров купила Соня?" } },
    "variant_gen_49_index_49_1": { "ru": { "text": "Гриша купил 10 сувениров,<br />а Соня &mdash; на 4 больше." } },
    "variant_gen_49_index_49_2": { "ru": { "text": "Ребята посетили 15 различных городов." } },
    "variant_gen_49_index_49_3": { "ru": { "text": "Гриша и Соня купили много сувениров." } },
    "variant_gen_49_index_49_4": { "ru": { "text": "Условий достаточно." } },
    "question_gen_50": { "ru": { "text": "Выбери рисунок к задаче.<br />Егор купил 2 мяча и 4 робота. Сколько всего игрушек купил Егор?" } },
    "variant_gen_50_index_50_1": { "ru": { "text": "NIL" } },
    "variant_gen_50_index_50_2": { "ru": { "text": "NIL" } },
    "variant_gen_50_index_50_3": { "ru": { "text": "NIL" } },
    "variant_gen_50_index_50_4": { "ru": { "text": "NIL" } },
    "question_gen_51": { "ru": { "text": "Выбери решение задачи.<br />Соня испекла 8 морковых и 5 лимонных кексов. 6 кексов она<br />украсила кремом. Сколько кексов осталось украсить?" } },
    "variant_gen_51_index_51_1": { "ru": { "text": "1) 8 + 5 = 13 (к.)<br />2) 13 &minus; 6 = 7 (к.)" } },
    "variant_gen_51_index_51_2": { "ru": { "text": "1) 8 &minus; 5 = 3 (к.)<br />2) 3 + 6 = 9 (к.)" } },
    "variant_gen_51_index_51_3": { "ru": { "text": "1) 8 + 5 = 13 (к.)<br />2) 13 + 6 = 19 (к.)" } },
    "variant_gen_51_index_51_4": { "ru": { "text": "1) 8 &minus; 5 = 3 (к.)<br />2) 6 &minus; 3 = 3 (к.)" } },
    "question_gen_52": { "ru": { "text": "Реши задачу.<br />В детской книжке 18 страниц. Из них 10 с картинками, остальные &mdash; без.<br />На сколько страниц с картинками больше, чем без картинок?" } },
    "variant_gen_52_index_52_1": { "ru": { "text": "На 2" } },
    "variant_gen_52_index_52_2": { "ru": { "text": "На 8" } },
    "variant_gen_52_index_52_3": { "ru": { "text": "На 10" } },
    "variant_gen_52_index_52_4": { "ru": { "text": "На 18 " } },
    "question_gen_53": { "ru": { "text": "Назови одним словом" } },
    "variant_gen_53_index_53_1": { "ru": { "text": "Животные" } },
    "variant_gen_53_index_53_2": { "ru": { "text": "Пятнистые" } },
    "variant_gen_53_index_53_3": { "ru": { "text": "Домашние животные" } },
    "variant_gen_53_index_53_4": { "ru": { "text": "Дикие животные" } },
    "question_gen_54": { "ru": { "text": "Соня собрала все разные цепи из 2 частей. Какой цепи не хватает? " } },
    "variant_gen_54_index_54_1": { "ru": { "text": "NIL" } },
    "variant_gen_54_index_54_2": { "ru": { "text": "NIL" } },
    "variant_gen_54_index_54_3": { "ru": { "text": "NIL" } },
    "variant_gen_54_index_54_4": { "ru": { "text": "NIL" } },
    "question_gen_55": { "ru": { "text": "Продолжи ряд<br />Какого цвета будет шар?" } },
    "variant_gen_55_index_55_1": { "ru": { "text": "Красного" } },
    "variant_gen_55_index_55_2": { "ru": { "text": "Фиолетового" } },
    "variant_gen_55_index_55_3": { "ru": { "text": "Жёлтого" } },
    "variant_gen_55_index_55_4": { "ru": { "text": "Зелёного" } },
    "question_gen_56": { "ru": { "text": "В каком ряду числа расположены в порядке убывания?" } },
    "variant_gen_56_index_56_1": { "ru": { "text": "90, 60, 30, 20, 10" } },
    "variant_gen_56_index_56_2": { "ru": { "text": "50, 40, 60, 30, 20" } },
    "variant_gen_56_index_56_3": { "ru": { "text": "90, 80, 70, 40, 60" } },
    "variant_gen_56_index_56_4": { "ru": { "text": "80, 90, 60, 30, 10" } },
    "question_gen_57": { "ru": { "text": "Вычисли 50 &minus; 30" } },
    "variant_gen_57_index_57_1": { "ru": { "text": "20" } },
    "variant_gen_57_index_57_2": { "ru": { "text": "30" } },
    "variant_gen_57_index_57_3": { "ru": { "text": "10" } },
    "variant_gen_57_index_57_4": { "ru": { "text": "80" } },
    "question_gen_58": { "ru": { "text": "Какое число предыдущее при счёте перед числом 60?" } },
    "variant_gen_58_index_58_1": { "ru": { "text": "59" } },
    "variant_gen_58_index_58_2": { "ru": { "text": "61" } },
    "variant_gen_58_index_58_3": { "ru": { "text": "58" } },
    "variant_gen_58_index_58_4": { "ru": { "text": "50" } },
    "question_gen_59": { "ru": { "text": "В каком ряду числа расположены в порядке возрастания?" } },
    "variant_gen_59_index_59_1": { "ru": { "text": "23, 24, 32, 42, 43" } },
    "variant_gen_59_index_59_2": { "ru": { "text": "24, 32, 23, 42, 43" } },
    "variant_gen_59_index_59_3": { "ru": { "text": "23, 24, 33, 32, 43" } },
    "variant_gen_59_index_59_4": { "ru": { "text": "23, 32, 24, 42, 43 " } },
    "question_gen_60": { "ru": { "text": "Выбери разложение числа 34 в сумму десятков и единиц. " } },
    "variant_gen_60_index_60_1": { "ru": { "text": "30 + 4" } },
    "variant_gen_60_index_60_2": { "ru": { "text": "3 + 4" } },
    "variant_gen_60_index_60_3": { "ru": { "text": "3 + 40" } },
    "variant_gen_60_index_60_4": { "ru": { "text": "30 + 40" } },
    "question_gen_61": { "ru": { "text": "Вычисли 60 мм + 3 см" } },
    "variant_gen_61_index_61_1": { "ru": { "text": "9&thinsp;см" } },
    "variant_gen_61_index_61_2": { "ru": { "text": "63&thinsp;мм" } },
    "variant_gen_61_index_61_3": { "ru": { "text": "36&thinsp;мм" } },
    "variant_gen_61_index_61_4": { "ru": { "text": "9&thinsp;мм" } },
    "question_gen_62": { "ru": { "text": "Вычисли 1 м 7 дм &minus; 8 дм" } },
    "variant_gen_62_index_62_1": { "ru": { "text": "9&thinsp;дм" } },
    "variant_gen_62_index_62_2": { "ru": { "text": "1&thinsp;м" } },
    "variant_gen_62_index_62_3": { "ru": { "text": "10&thinsp;дм" } },
    "variant_gen_62_index_62_4": { "ru": { "text": "99&thinsp;дм" } },
    "question_gen_63": { "ru": { "text": "В каком ряду величины расположены в порядке возрастания?" } },
    "variant_gen_63_index_63_1": { "ru": { "text": "12&thinsp;дм, 1&thinsp;м 4&thinsp;дм, 20&thinsp;дм" } },
    "variant_gen_63_index_63_2": { "ru": { "text": "1&thinsp;см 5&thinsp;мм, 14&thinsp;мм, 1&thinsp;см 8&thinsp;мм" } },
    "variant_gen_63_index_63_3": { "ru": { "text": "26&thinsp;см, 2&thinsp;дм 8&thinsp;см, 27&thinsp;см" } },
    "variant_gen_63_index_63_4": { "ru": { "text": "3&thinsp;м 3&thinsp;дм, 32&thinsp;дм, 3&thinsp;м 1&thinsp;дм" } },
    "question_gen_64": { "ru": { "text": "Сколько в кошельке монет, а сколько копеек?" } },
    "variant_gen_64_index_64_1": { "ru": { "text": "4 монеты, 80 копеек" } },
    "variant_gen_64_index_64_2": { "ru": { "text": "4 копейки, 80 монет" } },
    "variant_gen_64_index_64_3": { "ru": { "text": "4 монеты, 4 копейки" } },
    "variant_gen_64_index_64_4": { "ru": { "text": "80 монет, 80 копеек" } },
    "question_gen_65": { "ru": { "text": "Выбери кошелёк, в котором 26 р." } },
    "variant_gen_65_index_65_1": { "ru": { "text": "2 по 10 р, 5 р., 1 р." } },
    "variant_gen_65_index_65_2": { "ru": { "text": "10 р., 2 по 5 р., 1 р." } },
    "variant_gen_65_index_65_3": { "ru": { "text": "10 р., 3 по 5 р." } },
    "variant_gen_65_index_65_4": { "ru": { "text": "2 по 10 р., 4 по 1 р. " } },
    "question_gen_66": { "ru": { "text": "Какое время показывают часы? " } },
    "variant_gen_66_index_66_1": { "ru": { "text": "4&thinsp;ч 45&thinsp;мин" } },
    "variant_gen_66_index_66_2": { "ru": { "text": "5&thinsp;ч 45&thinsp;мин" } },
    "variant_gen_66_index_66_3": { "ru": { "text": "3&thinsp;ч 45&thinsp;мин" } },
    "variant_gen_66_index_66_4": { "ru": { "text": "4&thinsp;ч 9&thinsp;мин" } },
    "question_gen_67": { "ru": { "text": "Какое время будет через 20 минут? " } },
    "variant_gen_67_index_67_1": { "ru": { "text": "1&thinsp;ч 40&thinsp;мин" } },
    "variant_gen_67_index_67_2": { "ru": { "text": "1&thinsp;ч 00&thinsp;мин" } },
    "variant_gen_67_index_67_3": { "ru": { "text": "2&thinsp;ч 40&thinsp;мин" } },
    "variant_gen_67_index_67_4": { "ru": { "text": "2&thinsp;ч 00&thinsp;мин" } },
    "question_gen_68": { "ru": { "text": "1 ч 25 минут &mdash; это" } },
    "variant_gen_68_index_68_1": { "ru": { "text": "85&thinsp;мин" } },
    "variant_gen_68_index_68_2": { "ru": { "text": "125&thinsp;мин" } },
    "variant_gen_68_index_68_3": { "ru": { "text": "65&thinsp;мин" } },
    "variant_gen_68_index_68_4": { "ru": { "text": "90&thinsp;мин" } },
    "question_gen_69": { "ru": { "text": "Вычисли 8 &minus; 5 + 10" } },
    "variant_gen_69_index_69_1": { "ru": { "text": "13" } },
    "variant_gen_69_index_69_2": { "ru": { "text": "12" } },
    "variant_gen_69_index_69_3": { "ru": { "text": "23" } },
    "variant_gen_69_index_69_4": { "ru": { "text": "7" } },
    "question_gen_70": { "ru": { "text": "Дополни число 16 до 20.<br>16 + __ = 20" } },
    "variant_gen_70_index_70_1": { "ru": { "text": "4" } },
    "variant_gen_70_index_70_2": { "ru": { "text": "14" } },
    "variant_gen_70_index_70_3": { "ru": { "text": "5" } },
    "variant_gen_70_index_70_4": { "ru": { "text": "16" } },
    "question_gen_71": { "ru": { "text": "Выбери сумму, равную 17." } },
    "variant_gen_71_index_71_1": { "ru": { "text": "8 + 9" } },
    "variant_gen_71_index_71_2": { "ru": { "text": "7 + 9" } },
    "variant_gen_71_index_71_3": { "ru": { "text": "5 + 11" } },
    "variant_gen_71_index_71_4": { "ru": { "text": "6 + 12" } },
    "question_gen_72": { "ru": { "text": "Выбери пропущенное число.<br />6 + 7 + 4 = 10 + __" } },
    "variant_gen_72_index_72_1": { "ru": { "text": "7" } },
    "variant_gen_72_index_72_2": { "ru": { "text": "4" } },
    "variant_gen_72_index_72_3": { "ru": { "text": "6" } },
    "variant_gen_72_index_72_4": { "ru": { "text": "8" } },
    "question_gen_73": { "ru": { "text": "Вычисли 10 &minus; (7 + 2) " } },
    "variant_gen_73_index_73_1": { "ru": { "text": "1" } },
    "variant_gen_73_index_73_2": { "ru": { "text": "5" } },
    "variant_gen_73_index_73_3": { "ru": { "text": "19" } },
    "variant_gen_73_index_73_4": { "ru": { "text": "15" } },
    "question_gen_74": { "ru": { "text": "Вычисли 58 &minus; 50" } },
    "variant_gen_74_index_74_1": { "ru": { "text": "8" } },
    "variant_gen_74_index_74_2": { "ru": { "text": "3" } },
    "variant_gen_74_index_74_3": { "ru": { "text": "53" } },
    "variant_gen_74_index_74_4": { "ru": { "text": "48" } },
    "question_gen_75": { "ru": { "text": "Выбери верное утверждение.<br />В таблице отмечено плюсами, какие фрукты любят Маша и Даша." } },
    "variant_gen_75_index_75_1": { "ru": { "text": "Маша яблоки любит, а Даша нет." } },
    "variant_gen_75_index_75_2": { "ru": { "text": "Обе девочки любят бананы." } },
    "variant_gen_75_index_75_3": { "ru": { "text": "Даша яблоки любит, а Маша нет." } },
    "variant_gen_75_index_75_4": { "ru": { "text": "Обе девочки не любят апельсины." } },
    "question_gen_76": { "ru": { "text": "В таблице показано сколько овощей привезли в магазин, и по какой цене их продают.<br />Сколько килограммов помидоров привезли в магазин? " } },
    "variant_gen_76_index_76_1": { "ru": { "text": "75 килограммов" } },
    "variant_gen_76_index_76_2": { "ru": { "text": "80 килограммов" } },
    "variant_gen_76_index_76_3": { "ru": { "text": "90 килограммов" } },
    "variant_gen_76_index_76_4": { "ru": { "text": "50 килограммов" } },
    "question_gen_77": { "ru": { "text": "В таблице показан прогноз погоды 26 июня.<br />Выбери город, в котором 26 июня обещают дождь и 24 градуса." } },
    "variant_gen_77_index_77_1": { "ru": { "text": "Москва" } },
    "variant_gen_77_index_77_2": { "ru": { "text": "Смоленск" } },
    "variant_gen_77_index_77_3": { "ru": { "text": "Сочи" } },
    "variant_gen_77_index_77_4": { "ru": { "text": "Воронеж" } },
    "question_gen_78": { "ru": { "text": "Найди длину ломаной" } },
    "variant_gen_78_index_78_1": { "ru": { "text": "18&thinsp;см" } },
    "variant_gen_78_index_78_2": { "ru": { "text": "18&thinsp;дм" } },
    "variant_gen_78_index_78_3": { "ru": { "text": "13&thinsp;см" } },
    "variant_gen_78_index_78_4": { "ru": { "text": "15&thinsp;см" } },
    "question_gen_79": { "ru": { "text": "Выбери ломаную наименьшей длины" } },
    "variant_gen_79_index_79_1": { "ru": { "text": "Зелёная" } },
    "variant_gen_79_index_79_2": { "ru": { "text": "Синяя" } },
    "variant_gen_79_index_79_3": { "ru": { "text": "Красная" } },
    "variant_gen_79_index_79_4": { "ru": { "text": "Оранжевая" } },
    "question_gen_80": { "ru": { "text": "Найди периметр прямоугольника" } },
    "variant_gen_80_index_80_1": { "ru": { "text": "16&thinsp;см" } },
    "variant_gen_80_index_80_2": { "ru": { "text": "15&thinsp;см" } },
    "variant_gen_80_index_80_3": { "ru": { "text": "8&thinsp;см" } },
    "variant_gen_80_index_80_4": { "ru": { "text": "11&thinsp;см" } },
    "question_gen_81": { "ru": { "text": "Длина одной стороны треугольника 6 см, а двух других &mdash; по 4 см.<br />Найди периметр треугольника." } },
    "variant_gen_81_index_81_1": { "ru": { "text": "14&thinsp;см" } },
    "variant_gen_81_index_81_2": { "ru": { "text": "10&thinsp;см" } },
    "variant_gen_81_index_81_3": { "ru": { "text": "8&thinsp;см" } },
    "variant_gen_81_index_81_4": { "ru": { "text": "16&thinsp;см" } },
    "question_gen_82": { "ru": { "text": "Выбери задачу, которая не является обратной всем остальным." } },
    "variant_gen_82_index_82_1": { "ru": { "text": "У Гриши в школе 5 друзей, трое из них &mdash; девочки.<br />Сколько мальчиков в друзьях у Гриши?" } },
    "variant_gen_82_index_82_2": { "ru": { "text": "У Гриши в школе 5 друзей, трое из них &mdash; мальчики.<br />Сколько девочек в друзьях у Гриши?" } },
    "variant_gen_82_index_82_3": { "ru": { "text": "У Гриши в школе среди друзей 2 девочки и 3 мальчика.<br />Сколько друзей у Гриши в школе?" } },
    "variant_gen_82_index_82_4": { "ru": { "text": "У Гриши в школе 5 друзей, двое из них &mdash; девочки.<br />Сколько мальчиков в друзьях у Гриши?" } },
    "question_gen_83": { "ru": { "text": "Выбери решение задачи.<br />Мама посмотрела 3 серии нового сериала, и ей осталось посмотреть ещё 8 серий.<br />Сколько всего серий в сериале?" } },
    "variant_gen_83_index_83_1": { "ru": { "text": "8 + 3 = 11 (c.)" } },
    "variant_gen_83_index_83_2": { "ru": { "text": "8 &minus; 3 = 5 (c.)" } },
    "variant_gen_83_index_83_3": { "ru": { "text": "8 + 5 = 13 (c.)" } },
    "variant_gen_83_index_83_4": { "ru": { "text": "8 &minus; 5 = 3 (c.) " } },
    "question_gen_84": { "ru": { "text": "Выбери решение задачи.<br />В классе занято 10 парт, их на 2 больше, чем свободных. Сколько свободных парт в классе?" } },
    "variant_gen_84_index_84_1": { "ru": { "text": "10 &minus; 2" } },
    "variant_gen_84_index_84_2": { "ru": { "text": "10 + 2" } },
    "variant_gen_84_index_84_3": { "ru": { "text": "10 + 10 &minus; 2" } },
    "variant_gen_84_index_84_4": { "ru": { "text": "10 + 2 + 10" } },
    "question_gen_85": { "ru": { "text": "Выбери схему для решения задачи.<br />Букет собран из 12 роз и 7 лилий.<br />Сколько всего цветов в букете?" } },
    "variant_gen_85_index_85_1": { "ru": { "text": "(12, 7, ?)" } },
    "variant_gen_85_index_85_2": { "ru": { "text": "(?, 7, 12)" } },
    "variant_gen_85_index_85_3": { "ru": { "text": "(12, ?, 19)" } },
    "variant_gen_85_index_85_4": { "ru": { "text": "(7, 19, ?)" } },
    "question_gen_86": { "ru": { "text": "Продолжи последовательность<br />1, 4, 7, ..., ..., ..." } },
    "variant_gen_86_index_86_1": { "ru": { "text": "10, 13, 16" } },
    "variant_gen_86_index_86_2": { "ru": { "text": "11, 14, 17" } },
    "variant_gen_86_index_86_3": { "ru": { "text": "12, 17, 24" } },
    "variant_gen_86_index_86_4": { "ru": { "text": "7, 4, 1" } }
  };

  for (let key in json) {
    const o = json[key];
    const t = o.ru.text.replace(/\<br\>/gm, ' ').replace(/\<br \/\>/gm, ' ');
    if (key === 'question_gen_75') console.log(t);
  }

}
