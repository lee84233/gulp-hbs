
var [name,age,id,sex='男'] = ['李成',26,1];

let [head, ...tail] = [1, 2, 3, 4];

var str1 = 'Hello,world.';

console.log(str1.includes('r'));

var str2 = '1'.padStart(10, '0');

console.log(str2);

let time = "today";
var str3 = `Hello ${name}, how are you ${time}?`

$('#title').html(`Hello,${name}`);