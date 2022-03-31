/*
 * @Description: feature name
 * @Author: xujian
 * @Date: 2022-03-30 17:36:08
 */

const List = require("./List");
const path = require("path");
const fs = require("fs");



// var names = new List();
// names.append("Clayton");
// names.append("Raymond");
// names.append("Cynthia");
// names.append("Jennifer");
// names.append("Bryan");
// names.append("Danny");

// names.front();
// console.log(names.getElement())

// names.next();
// console.log(names.getElement())

// names.next();
// names.next();
// names.prev();
// console.log(names.getElement());

// for (names.front(); names.currPos() < names.length(); names.next()) {
//   console.log(names.getElement());
// }

// names.front()

// for (names.end(); names.currPos() >= 0; names.prev()) {
//   console.log(names.getElement());
// }

const list = new List();

const read = (file) => fs.readFileSync(path.join(__dirname, file), "utf-8");

function createArr(file) {
  var arr = read(file).split("\n");
  for (var i = 0; i < arr.length; ++i) {
    arr[i] = arr[i].trim();
    list.append(arr[i])
  }
  return arr;
}


createArr('films.txt')

console.log(list.toString())

