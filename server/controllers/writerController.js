// controller

'use strict';
const fetch = require('isomorphic-fetch');

const userModel = require('../models/user');

exports.pocketSignIn = async ctx => {
  const url = "https://getpocket.com/v3/oauth/request";
  const data = {
  	"consumer_key":"75265-200ad444b793e02ce01ec6cb",
  	"redirect_uri":"http://localhost:3001"
  }
  // console.log(ctx);
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
    body: JSON.stringify(data)
  }).then(response => response.text())
    .then(response => console.log('Success', response))
    .catch(error => console.error('Error', JSON.parse(JSON.stringify(error))));
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
