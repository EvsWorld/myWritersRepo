'use strict';
var URL = require('url-parse');


const isURLSame = (url1, url2) => {
  let urlObj1 = URL(url1, true);
  let urlObj2 = URL(url2, true);
  return ( urlObj1.host===urlObj2.host ) && ( urlObj1.pathname===urlObj2.pathname );
}

console.log( )

const myurl = URL('https://www.theatlantic.com/entertainment/archive/2018/01/saturday-night-live-takes-a-swipe-at-celebrity-journalism/550526/');

console.log('host ', myurl.host);
console.log('hostname ', myurl.hostname);
console.log('pathname ', myurl.pathname);
console.log('query ', myurl.query);
console.log('hash ', myurl.hash);
