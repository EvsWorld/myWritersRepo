const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('37e7bdd84e8b4ea89ec597b6621c1216');
const urlArg = 'https://www.nytimes.com/2018/03/04/world/europe/europe-china-xi-trump-trade.html';

const getSources = () => {
  const sourcesArray = [];
  newsapi.v2.sources({
    // category: 'technology',
    // language: 'en',
    // country: 'us'
  }).then(response => {
    response.sources.forEach( src => {
      sourcesArray.push(src.id);
    })

    // console.log(response);
    // console.log('sourcesArray: ', sourcesArray);
    console.log(sourcesArray);
  });
  return toString(sourcesArray);
};
// gets an array of sources
const getSourcesAsync = async () => {
  try {
    let sourcesArray = [];
    return await newsapi.v2.sources()
    .then( response => {
      response.sources.forEach( src => {
        sourcesArray.push(src.id);
      });
      return sourcesArray.toString();
    });
    // sourcesArray = sourcesArray.toString();
    // console.log(sourcesArray);
    return sourcesArray.toString();
  } catch (err) {
    console.log(err);
  }
};

//TODO func to return query string
const makeQueryString = (url) => {
  const params = url.substring( url.indexOf('.com') + 5 );

  let queryString = params.replace(/\/|\-|(.html)/g, ' ');
  console.log('params: ', params);
  console.log('querystring: ', queryString);
  return queryString;
};
// makeQueryString(urlArg)

const queryNewsAsync =  async (searchUrl) => {
  try {
    const query = makeQueryString(searchUrl);
    const sourcesCall = await getSourcesAsync();
    return await newsapi.v2.everything({
      q: 'Europe Once Saw Xi Jinping as a Hedge Against Trump. Not Anymore',
      // sources: `'${sourcesCall}'`,
      sources: sourcesCall,
      // domains: 'washingtonpost.com',
      // from: '2017-12-01',
      // to: '2017-12-12',
      language: 'en',
      sortBy: 'popularity',
      // page: 2
    }).then(response => {
      console.log(response);
      response.articles.forEach(art => {
        if (art.url === searchUrl) {
          console.log(`1. art.url = `, art.url);
          console.log('2. art.author = ', art.author);
          console.log('3. Input search url...', searchUrl);
          console.log(`4. news id...`, art.source.id);
          // console.log(`5. queryReturns...`, tempReturn);
          return art.author
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
};

// queryNewsAsync('https://www.washingtonpost.com/powerpost/senators-urge-trump-to-take-the-lead-on-gun-control-efforts/2018/03/04/7923f788-1fcf-11e8-94da-ebf9d112159c_story.html');

queryNewsAsync(urlArg)


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
