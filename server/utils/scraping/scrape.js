'use strict';

const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })

nightmare
  .goto('https://www.vox.com/policy-and-politics/2018/3/2/17068392/trump-news-hope-hicks')
  .evaluate(() => document.querySelector('h1').innerHTML)
  .end()
  .then(console.log)
  .catch(error => {
    console.error('Search failed:', error)
  })
