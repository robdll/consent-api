const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');

const getUser = require('./users/get');
const deleteUser = require('./users/delete');
const postUser = require('./users/post');

// const postEvent = require('./events/post');

module.exports = function(app) {

    // parse request body and append values under req.body
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    
    router.route('/users/:email').get(getUser);
    router.route('/users/:email').delete(deleteUser);
    router.route('/users').post(postUser);
    
    // router.route('/events').post(postEvent);
    
    app.use('/', router);

} 
