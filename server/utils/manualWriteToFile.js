const NewsAPI = require('newsapi');
var fs = require('fs');
require('dotenv').load({ silent: true });
const newsapi = new NewsAPI(process.env.NEWS_APIKEY4);
var URL = require('url-parse');
const writeJsonFile = require('write-json-file');

//TODO: CHeck if userAuthors.json is empty, if it is, call the queryNewsAsync function to get the authors for that user
// if the the file is not empty, just return that data?

loadJsonFile('./manualUserData.json').then(data => {
  const authorObj = exports.queryNewsAsync(data);
  console.log(authorObj);
  return authorObj;
}
// takes a single article object
// returns the author
exports.queryNewsAsync =  async (artObj) => {
  try {
    return await newsapi.v2.everything({
      q: artObj.resolved_title,
      language: 'en',
      sortBy: 'relevance',
    }).then(response => {
      // console.log('\nresponse frowm newsapi search: \n\n', response);
      const authorArrs = response.articles.filter(art =>
        isURLSame(art.url, artObj.resolved_url)
      ).map( art => {
        return art.author
      });
      console.log('authorArrs: ', authorArrs);
    fs.appendFile('./usersAuthors.json', arrOfArrs.toString() , function (err) {
      if (err) throw err;
      console.log('Saved!');
    });

    return authorArrs.toString()
    });
  }
  catch (err) {
    console.log(err);
  }
};

const isURLSame = (url1, url2) => {
  let urlObj1 = URL(url1, true);
  let urlObj2 = URL(url2, true);
  return ( urlObj1.hostname===urlObj2.hostname ) && ( urlObj1.pathname===urlObj2.pathname );
}
