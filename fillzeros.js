const fs = require('fs')
const parse = require('csv-parse')
const assert = require('assert')
var filePath = __dirname + '/result.csv'


fs.readFile(filePath, function (err, data) {
  if (err) {
    console.log(err.stack);
    return;
  }
  parse(data.toString(), function (err, output) {
    process(output)
  })
});

function process(data) {
  console.log(data.length)
}