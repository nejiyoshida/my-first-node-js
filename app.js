'use strict'
// 0はnodeコマンドのファイルパス、１は実行してるプログラムのファイルパスが入る
// || (論理和)　が入ってるのは、この場合、numberがfalsy(0とか否定形の値？)の場合０が代入される
// つまり、引数なければ０が入る
const number = process.argv[2] || 0;
let sum = 0;
for (let i = 1; i <= number; i++) {
    sum = sum + i
}

console.log(sum);