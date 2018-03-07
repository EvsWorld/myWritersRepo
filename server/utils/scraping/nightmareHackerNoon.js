const { csvFormat } = require('d3-dsv');
const Nightmare = require('nightmare');
const { readFileSync, writeFileSync } = require('fs');
const numbers = readFileSync('./tesco-title-numbers.csv',
  {encoding: 'utf8'}).trim().split('\n');
console.dir(numbers);
