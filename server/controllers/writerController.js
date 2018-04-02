// controller

'use strict';
require('events').EventEmitter.prototype._maxListeners = 500;

const fetch = require('isomorphic-fetch');
const atob = require('atob');
var fs = require('fs');
const loadJsonFile = require('load-json-file');
let _ = require('lodash');
// QUESTION How to import this scrap function kind of like this?
// const scrap = require('../utils/scrape').nightmare;

const funcs = require('../utils/manualWriteToFile.js');

// send request to pocket for the (temporary) 'request_token' which is needed to send with the 'redirect' to pocket's login page where the use will put in their credentials and then that redirect returns to me just saying 'OK'. That redirect actually has a redirect which tells it to come back to my 'authorize' route.
exports.pocketSignIn = async ctx => {
  let requestToken = '';
  const url = "https://getpocket.com/v3/oauth/request";
  const reqBody = {
  	"consumer_key":"75265-200ad444b793e02ce01ec6cb",
  	"redirect_uri":"http://localhost:3001"
  }

  console.log("You hit the writerController!!!");
  // Send request to pocket to get request code
  // QUESTION: how/where do i save the code?

  await fetch(url,{
    method: 'post',
    headers: {
      "Host": "getpocket.com",
      "content-type": "application/json; charset=UTF-8",
      "X-Accept": "application/json"
    },
    body: JSON.stringify(reqBody)
  }).then(response => response.json())
    .then(response => {
      requestToken = response.code;
      console.log(`requestToken = ${requestToken}`);
      ctx.redirect(`https://getpocket.com/auth/authorize?request_token=${requestToken}&redirect_uri=http://localhost:3000/authorize/?requestToken=${requestToken}`);
    })
    .catch(error => console.error('Error', JSON.parse(JSON.stringify(error))));
  };

  // this is the controller for the route that accepts the temporary request token. This route gets hit by the redirect at the end of the pocketSignIn method above.
  exports.getAuthToken = async ctx => {
    // console.log(ctx);
    console.log("You hit the getAuthToken controller!!!");
    console.log('ctx.query: \n\n', ctx.query);
    console.log('ctx: \n\n', ctx);

    const url = "https://getpocket.com/v3/oauth/authorize";
    const reqBody = {
      "consumer_key":"75265-200ad444b793e02ce01ec6cb",
        "code":ctx.query.requestToken
    };

    await fetch(url,{
      method: 'post',
      headers: {
        "Host": "getpocket.com",
        "content-type": "application/json; charset=UTF-8",
        "X-Accept": "application/json"
      },
      body: JSON.stringify(reqBody)
    }).then(response => response.json())
      .then(response => {
        // console.log(`response from getAuthToken= \n\n`, response);
        // redirect user to the dashboard route on my front end with the access token and my username
        ctx.redirect(`http://localhost:3001/dashboard/${response.access_token}/${response.username}`);
        // TODO everytime here we need a function that checks our database for a user by this name. If there isn't, make a new document and store the user's username and accessToken.
      })
      .catch(error => console.error('Error', JSON.parse(JSON.stringify(error))));
    };

    // returns an array of all the urls of all the articles the user has read.
    exports.getArticles = async ctx => {
      let articleUrls = [];  // TODO let or const?
      // console.log('You hit the getArticles controller!!!\n\n');
      // console.log('ctx.query: \n\n', ctx.query);
      // console.log('ctx: \n\n', ctx);
      const encodedUserData = ctx.headers['authorization'].split(' ')[1];
      // console.log('encodedUserData', encodedUserData);
      const userData = atob(encodedUserData);
      const accessToken = userData.split(':')[1];
      // console.log('accessToken: ', accessToken);

      const url = 'https://getpocket.com/v3/get';
      const reqBody = {
        'consumer_key':'75265-200ad444b793e02ce01ec6cb',
        'access_token': accessToken,
        'detailType': 'simple',
        'contentType': 'article',
        'count': 60,
        'sort': 'newest',
        // 'tag': 'parents'
      };

      // if "nothing in userData.json" then make this fetch
      await loadJsonFile('/Users/evanhendrix1/google_drive/programming/codeWorks/mywriters/server/utils/usersAuthors.json')
      .then(data => {
        if (!_.isEmpty(data) ) {
          // console.log('this is data, ya fuck! ', data);
          //TODO tally most popular writers and send this data to the browser!
          const result = {};
          data.forEach( a => {
            if (Object.keys(result).includes(a)) {
              result[a] ++;
            }
            else {
              result[a] = 1;
            }
          });

          let sortable = [];
          for (let auth in result) {
            sortable.push([ auth, result[auth] ])
          }
          sortable.sort((x,y) => {
            return  y[1] - x[1] ;
          } );
          console.log('sorted: ', sortable);
          ctx.body = sortable;

        }
        ///////////////////////////////////////////
        else {
        //   // TODO run the fetch to pocket that then writes to my manualUserData.json file.
        //   // TODO trigger some kind of event that the manuaWriteToJson.js file is listening for.
          fetch(url, {
            method: 'post',
            headers: {
              "Host": "getpocket.com",
              "content-type": "application/json; charset=UTF-8",
              "X-Accept": "application/json"
            },
            body: JSON.stringify(reqBody)
          })
          .then(res => res.json())
          .then( parsedJson => {
            // console.log('getArticles response: ', parsedJson.list);
            fs.writeFile('/Users/evanhendrix1/google_drive/programming/codeWorks/mywriters/server/utils/manualUserData.json', JSON.stringify(parsedJson.list),  function (err) {
              if (err) throw err;
              console.log('Saved articles to manualUserData, now calling findMatchingArticles!\n\n');
              return funcs;
            });
          })
          .then(writers => {
            console.log('writers: ', writers,'\n');
            ctx.body = writers;
          })
        }
        //////////////////////////////////////////////////
      });
    };

      // .then( writers => {
      //   console.log(writers);
      //
      // })


    //
    // // func to accept array of article objects, and for every object, scrap the page for the title.
    // // returns array of objects (promis and title as keys)
    // const getAuthors = async (artArr) => {
    //   let i = 0;
    //
    //   Promise.all(Object.keys(artArr).map(articleId => {
    //       return queryNewsAsync(artArr[articleId])
    //     })
    //   ).then(response => {
    //     const authorsForReal = response.filter(a => {
    //       if (a) return a
    //     });
    //     // .filter( author => {
    //     //   console.log('AUTHOR ', author);
    //     //   return (!undefined && (author.length > 0) &)
    //     // });
    //   console.log('AUTHORSFORREAL: ', authorsForReal)
    //   })
    // };
    //
    // // JSSTUDY Not using for now    //
    // Promise.map = (promises) => {
    //   return new Promise((resolve, reject) => {
    //     let counter = 0;
    //     const results = [];
    //
    //     const checkCounter = () => {
    //       counter--;
    //       console.log(counter);
    //       if(counter === 0) resolve(results);
    //     }
    //     // function really startes here trying to resolve them
    //     // pushes onto my results array, the promise and the resolved promise (the title)
    //     promises.forEach(promise => {
    //       counter++;
    //       console.log(counter);
    //       promise
    //       .then(result => {
    //         results.push({
    //           promise,
    //           result
    //         });
    //         checkCounter();
    //       })
    //       .catch((e) => {
    //         results.push({
    //           promise,
    //           result:null
    //         });
    //         checkCounter();
    //       })
    //     });
    //   })
    // }
    // const getArrOfWriters = async (artArr) => {
    //   const writers = await Promise.all(Object.keys(artArr)
    //   .map(key => nightmare.goto(artArr[key].resolved_url)
    //     .evaluate(() => document.querySelector('h1').innerHTML)
    //     .end()
    //     .then(searchTerm => queryNewsAsync(searchTerm))
    //     .then(authorName => {
    //       console.log('authorName', authorName);
    //       return authorName;
    //     })
    //     .catch(error => {
    //       console.error('Search failed:', error.message);
    //       console.error('URL', artArr[key].resolved_url);
    //       console.error('========================');
    //     })
    //   ));
    //   console.log(writers);
    //   return writers;
    // };

    // TODO: func to accept array of authors and find the top 15 most common. // TODO: func to display those writers
    // TODO: func to follow those writers on twitter
