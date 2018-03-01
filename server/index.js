'use strict';
// QUESTION: How does the server know about the database?
const Koa = require('koa');
const router = require('./router.js');
const cors = require('koa-cors');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

app
  .use(logger())
  .use(cors())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000);
