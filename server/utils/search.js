const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('37e7bdd84e8b4ea89ec597b6621c1216');

const isSimilar = (s1, s2) => {
  var longer = s1;
  var shorter = s2;
 if (s1.length < s2.length) {
   longer = s2;
   shorter = s1;
 }
 var longerLength = longer.length;
 if (longerLength == 0) {
   return 1.0;
 }
 console.log(((longerLength - editDistance(longer, shorter)) / parseFloat(longerLength) ) >= 0.5);

 return (((longerLength - editDistance(longer, shorter)) / parseFloat(longerLength) ) >= 0.5);

 function editDistance(s1, s2) {
      s1 = s1.toLowerCase();
      s2 = s2.toLowerCase();

      var costs = new Array();
      for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
          if (i == 0)
            costs[j] = j;
          else {
            if (j > 0) {
              var newValue = costs[j - 1];
              if (s1.charAt(i - 1) != s2.charAt(j - 1))
                newValue = Math.min(Math.min(newValue, lastValue),
                  costs[j]) + 1;
              costs[j - 1] = lastValue;
              lastValue = newValue;
            }
          }
        }
        if (i > 0)
          costs[s2.length] = lastValue;
      }
      return costs[s2.length];
    }
}


// const isSimilar = (a, b) => {
//   let matchNum = (a < b) ? (b.length)*0.6 :
//   (a.length*0.5);
//   let count = 0;
//   for (let i of a.length) {
//     for (let j of b.length) {
//       if (b.j === a.i) count++;
//     }
//   }
//   return (count >= matchNum);
// }

// takes a sigle article title (string)
// returns the author
exports.queryNewsAsync =  async (titleQuery) => {
  try {
    // const query = makeQueryString(searchUrl);
    // const sources = await getSourcesAsync();
    return await newsapi.v2.everything({
      q: titleQuery,
      // sources: `'${sourcesCall}'`,
      // sources: source s,
      // domains: 'washingtonpost.com',
      // from: '2017-12-01',
      // to: '2017-12-12',
      language: 'en',
      sortBy: 'relevance',
      // page: 2
    }).then(response => {
      // console.log('\nresponse frowm newsapi search: \n\n', response);
      return response.articles.map(art => {
        console.log('art.title: ', art.title);
        console.log('titleQuery: ', titleQuery);
        if (isSimilar(art.title, titleQuery)) {
          console.log('\nWE HAVE A MATCH!!\n');
          console.log(`1. art.url = `, art.url);
          console.log('2. art.author = ', art.author);
          // console.log('3. Input search url...', searchUrl);
          console.log(`3. news id...`, art.source.id);
          // console.log(`5. queryReturns...`, tempReturn);
          return art.author
        }
        // else return "the title for this article does not match the title you're searching for :("
      });
    });
  } catch (err) {
    console.log(err);
  }
};

// isSimilar('i love you, you love me', 'i love');

// exports.queryNewsAsync('The Chaos After Trump - The New York Times')

//TODO func to return query string (didn't end up using, but its a good function)
// const makeQueryString = (url) => {
//   const params = url.substring( url.indexOf('.com') + 5 );
//
//   let queryString = params.replace(/\/|\-|(.html)/g, ' ');
//   console.log('params: ', params);
//   console.log('querystring: ', queryString);
//   return queryString;
// };

// this is the same thing as above but this is the old way
// const queryNews = (searchUrl) => {
//   newsapi.v2.everything({
//     q:'senator urge trump to take the lead on gun control efforts',
//     sources: 'the-washington-post',
//     domains: searchUrl,
//     // from: '2017-12-01',
//     // to: '2017-12-12',
//     language: 'en',
//     sortBy: 'relevancy',
//     page: 2
//   }).then(response => {
//       response.articles.forEach(art => {
//         let tempReturn = (art.url === searchUrl) ? art.author
//         : 'we could not find your article :(';
//         console.log(`1. art.url = `, art.url);
//         console.log('2. art.author = ', art.author);
//         console.log('3. Input search url...', searchUrl);
//         console.log(`4. news id...`, art.source.name);
//         console.log(`5. queryReturns...`, tempReturn);
//
//         return tempReturn;
//       });
//       // console.log(response.articles);
//     // console.log(response);
//    //     {
//    //       status: "ok",
//    //       articles: [...]
//    //     }
//    // /powerpost/senators-urge-trump-to-take-the-lead-on-gun-control-efforts/2018/03/04/7923f788-1fcf-11e8-94da-ebf9d112159c_story.html?utm_term=.667f6d94c883
//    });
//
// };

// const getSources = () => {
//   const sourcesArray = [];
//   newsapi.v2.sources({
//     // category: 'technology',
//     // language: 'en',
//     // country: 'us'
//   }).then(response => {
//     response.sources.forEach( src => {
//       sourcesArray.push(src.id);
//     })
//
//     // console.log(response);
//     // console.log('sourcesArray: ', sourcesArray);
//     console.log(sourcesArray);
//   });
//   return toString(sourcesArray);
// };
//
// // totally not needed
// // gets a string of source id's for the queryNewsAsync func
// const getSourcesAsync = async () => {
//   try {
//     let sourcesArray = [];
//     return await newsapi.v2.sources()
//     .then( response => {
//       response.sources.forEach( src => {
//         sourcesArray.push(src.id);
//       });
//       return sourcesArray.toString();
//     });
//     // sourcesArray = sourcesArray.toString();
//     // console.log(sourcesArray);
//     return sourcesArray.toString();
//   } catch (err) {
//     console.log(err);
//   }
// };

  // // To query /v2/top-headlines
  // // All options passed to topHeadlines are optional, but you need to include at least one of them
  // newsapi.v2.topHeadlines({
  //   sources: 'bbc-news,the-verge',
  //   q: 'bitcoin',
  //   category: 'business',
  //   language: 'en',
  //   country: 'us'
  // }).then(response => {
  //   console.log(response);
  //   /*
  //     {
  //       status: "ok",
  //       articles: [...]
  //     }
  //   */
  // });
  // To query /v2/everything
  // You must include at least one q, source, or domain
  // newsapi.v2.everything({
  //   q: 'bitcoin',
  //   sources: 'bbc-news,the-verge',
  //   domains: 'bbc.co.uk, techcrunch.com',
  //   from: '2017-12-01',
  //   to: '2017-12-12',
  //   language: 'en',
  //   sortBy: 'relevancy',
  //   page: 2
  // }).then(response => {
  //   console.log(response);
  //   /*
  //     {
  //       status: "ok",
  //       articles: [...]
  //     }
  //   */
  // });
  // To query sources
  // All options are optional
  // const allSources = []
  // newsapi.v2.sources({
  //   // category: 'technology',
  //   // language: 'en',
  //   // country: 'us'
  // }).then(response => {
  //   response.sources.forEach( src => {
  //     allSources.push(src.id);
  //   })
  //   console.log(response);
  //   console.log('allSources: ', allSources);
    /*
      {
        status: "ok",
        sources: [...]
      }
    */
  // });
