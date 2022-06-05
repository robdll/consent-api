const express = require('express');
const router = express.Router();

const postUser = require('./users/post');
const getUsers = require('./users/get');
const deleteUser = require('./users/delete');

const postEvent = require('./events/post');

module.exports = function(app) {

    router.route('/users/:email').get(getUser);
    router.route('/users/:email').delete(deleteUser);
    router.route('/users').post(postUser);
    
    router.route('/events').post(postEvent);
    
    app.use('/', router);

} 
