'use strict'
const fs = require("fs") //pythonのimport XXXと同じくモジュールのインポート
const readline = require("readline");
const rs = fs.createReadStream('./popu-pref.csv');
const rl = readline.createInterface({ 'input': rs, 'output': {} });
const prefMap = new Map();
//rlオブジェクトでlineイベントが起こると右の無名関数を呼ぶ
rl.on('line', function(lineString) { 
    //console.log(lineString);
    const columns = lineString.split(',');
    const year = parseInt(columns[0]);
    const prefecture = columns[2];
    const popu = parseInt(columns[7]);
    if (year == 2010 || year == 2015) {
        //console.log(year);
        //console.log(prefecture);
        //console.log(popu);
        let value = prefMap.get(prefecture);
        if (!value) {
            value = {
                popu10: 0,
                popu15: 0,
                change: null
            };
        }
        if (year === 2010) {
            value.popu10 = popu;
        }
        if (year === 2015) {
            value.popu15 = popu;
        }
        prefMap.set(prefecture, value)

    }
});
rl.on("close", function(){
    for (let [key, value] of prefMap) { 
        value.change = value.popu15 / value.popu10;
    }
//Array.formで普通の配列にした後、sortに無名関数でソート順を与えた。
//第一引数を第二引数の前にしたいときは負の値、後ろにしたいなら正の値、そのままは０を戻すようにする
    const ranking = Array.from(prefMap).sort((pair1, pair2) => {
        return pair2[1].change - pair1[1].change;
    });

    // map関数は配列の各要素に関数を適用して新しい配列を作る

    const rankstr = ranking.map(([key, value]) => {
        return key + " : " + value.popu10 + " => " + value.popu15 + " 変化率: " + value.change;
    });
    console.log(rankstr)

    //console.log(ranking);
});