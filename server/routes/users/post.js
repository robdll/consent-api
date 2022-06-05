'use strict';

const mysqlPool = require('../../db/mysqldb');
const { v4: uuidv4 } = require('uuid');

const postUserQuery = require('../../db/queries').POST_USER;

function postUser(req, res) {

    const id = uuidv4();
    const email = req.body.email.toLowerCase();
    const mailRegexp = new RegExp("/^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/")
    if(!email.match(mailRegexp)) {
      return res.status(422).end();
    }

    const params = [ id, email ]
    mysqlPool.queryAsync(postUserQuery, params)
        .then(returnResponse)
        .catch(returnError);

  function returnResponse(user) {
    let response = {};
    if(user) {
        response.code = 201;
        response.payload = {
            id,
            email,
            consents: []
        };
    }
    return res.status(response.code || 200).json(response.payload);
  }

  function returnError(err) {
    let response = {}
    if( err && err.code && err.code === 'ER_DUP_ENTRY') {
        response.code = 409
    } 
    return res.status(response.code || 500).end();
  }

}

module.exports = postUser;