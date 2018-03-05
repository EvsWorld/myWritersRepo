'use strict';

const Router = require('koa-router');
const router = new Router();
const writerController = require('./controllers/writerController');

router.get('/pocket-sign-in', writerController.pocketSignIn);
router.get('/authorize', writerController.getAuthToken);
router.get('/get-articles', writerController.XXXXXXXXXX);
// router.get('/topics/:id', topicCtrls.getOne);


module.exports = router;
