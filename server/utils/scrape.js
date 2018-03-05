'use strict';

const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })

nightmare
  .goto('https://duckduckgo.com')
  .type('#search_form_input_homepage', 'github nightmare')
  .click('#search_button_homepage')
  .wait('#r1-0 a.result__a')
  .evaluate(() => document.querySelector('body > div.l-root.l-reskin > section > section > div:nth-child(2) > div.c-entry-hero.c-entry-hero--default > div.c-byline > span:nth-child(1) > a').href)
  .end()
  .then(console.log)
  .catch(error => {
    console.error('Search failed:', error)
  })

  
