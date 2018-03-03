// controller

'use strict';
const fetch = require('isomorphic-fetch');
const atob = require('atob');

const userModel = require('../models/user');

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
        console.log(`response from getAuthToken= \n\n`, response);
        // redirect user to the dashboard route on my front end with the access token and my username
        ctx.redirect(`http://localhost:3001/dashboard/${response.access_token}/${response.username}`);
        // TODO everytime here we need a function that checks our database for a user by this name. If there isn't, make a new document and store the user's username and accessToken.
      })
      .catch(error => console.error('Error', JSON.parse(JSON.stringify(error))));
    };

    // returns an array of all the urls of all the articles the user has read.
    exports.getArticles = async ctx => {
      let articleUrls = [];  // TODO let or const?
      console.log("You hit the getArticles controller!!!");
      console.log('ctx.query: \n\n', ctx.query);
      console.log('ctx: \n\n', ctx);
      const encodedUserData = ctx.headers['authorization'].split(' ')[1];
      console.log('encodedUserData', encodedUserData);
      const userData = atob(encodedUserData);
      const accessToken = userData.split(':')[1];
      console.log('accessToken: ', accessToken);

      const url = 'https://getpocket.com/v3/get';
      const reqBody = {
        'consumer_key':'75265-200ad444b793e02ce01ec6cb',
        'access_token': accessToken,
        'detailType': 'simple'
      };

      await fetch(url, {
        method: 'post',
        headers: {
          "Host": "getpocket.com",
          "content-type": "application/json; charset=UTF-8",
          "X-Accept": "application/json"
        },
        body: JSON.stringify(reqBody)
      })
      .then(res => res.json())
      .then( articles => {
        console.log('getArticles response: ', articles);
        ctx.body= articles;
      });
    };



// exports.getOne = async ctx => {
//   try {
//     const topic = await topicModel.getOne(ctx.params.id);
//     ctx.body = topic;
//   } catch (e) {
//     ctx.status = 500;
//   }
// };

// exports.find = async ctx => {
//   try {
//     const topic = await topicModel.find(ctx.params.name);
//     ctx.body = topic;
//   } catch (e) {
//     ctx.status = 500;
//   }
// };


// exports.create = async ctx => {
//   let id = await topicModel.getHighestId();
//   id = id[0].id + 1;
//   const randImg = Math.floor(Math.random() * 151) + 150
//   const newPokemon = {
//     id,
//     img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/topic/${randImg}.png`,
//     name: ctx.request.body.name
//   }
//   await topicModel.create(newPokemon);
//   ctx.status = 201;
// }
