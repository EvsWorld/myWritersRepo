const NewsAPI = require('newsapi');
var fs = require('fs');
// require('dotenv').load({ silent: true });
// const newsapi = new NewsAPI(process.env.NEWS_APIKEY4);
const newsapi = new NewsAPI('ad5871af8f1943579247ef6cb22b9e68');
var URL = require('url-parse');
const writeJsonFile = require('write-json-file');
const loadJsonFile = require('load-json-file');

//TODO: make this function add the date when it is created
//TODO: Listen for the

  // exports.findMatchingArticles = async () => {
    // try {
      console.log('FINDMATCHINGARTICLES IS CALLED!!\n\n');

       loadJsonFile('/Users/evanhendrix1/google_drive/programming/codeWorks/mywriters/server/utils/manualUserData.json')
    .then(artArr => {
      Promise.all(Object.keys(artArr).map(articleId => {
        // console.log('artileId: ', articleId);
          return exports.queryNewsAsync(artArr[articleId])
        })
      ).then(response => {
        // filters empty arrays out
        console.log('DOES THIS MAKE a shittttt', response);
        const authorsArr = response.filter(a => {
          if (a) return a
        });
        // TODO put authorsJson in an object, as a value; add in a data property for the date this runs, then json.stringify it
        // const testJson = JSON.stringify('blah blah blah testy test test')
        // const authorsJson = JSON.stringify(authorsArr);
        // console.log('AUTHORSJSON:  ', authorsJson);

        fs.writeFile('./usersAuthors.json', authorsArr.toString(),  function (err) {
          if (err) throw err;
          console.log('Saved authors to usersAuthors.json!');
        });
    })
    .catch(err => console.log(err));
  });
  // }
  // catch (err) {
  //   console.log(err);
  // }

// takes a single article object
// returns the author
exports.queryNewsAsync =  async (artObj) => {
  try {
    // console.log('artObj.resolved_title: ', artObj.resolved_title);
    return await newsapi.v2.everything({
      q: artObj.resolved_title,
      language: 'en',
      sortBy: 'relevancy',
    }).then(response => {
      console.log('\nresponse frowm newsapi search: \n\n', response);
      const authorArrs = response.articles.filter(art =>
        isURLSame(art.url, artObj.resolved_url)
      ).map( art => {
        return art.author
      });

      console.log('authorArrs: ', authorArrs);
      console.log('authorArrs: ', authorArrs.toString() );
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
