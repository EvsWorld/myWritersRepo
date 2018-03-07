const Nightmare = require('nightmare');

const nightmare = Nightmare({ show: true });

nightmare.goto('https://www.vox.com/policy-and-politics/2018/3/2/17068392/trump-news-hope-hicks')
  .evaluate(() => {
    return document.querySelector('.c-byline__item a').innerHTML;
  })
  .end()
  .then((author) => {
    console.log(author);
  })

  var urls = ['https://www.vox.com/policy-and-politics/2018/3/2/17068392/trump-news-hope-hicks';'https://www.vox.com/policy-and-politics/2018/3/2/17050610/guns-shootings-studies-rand-charts-maps';'https://www.vox.com/world/2018/3/2/17072300/trump-tariffs-steel-aluminum-disaster'];
urls.reduce(function(accumulator, url) {
  return accumulator.then(function(results) {
    return nightmare.goto(url)
    .evaluate(() => {
      return document.querySelector('.c-byline__item a').innerHTML;
    })
    .end()
    .then((author) => {
      console.log(author);
  });
}, Promise.resolve([])).then(function(results){
    console.dir(results);
});
