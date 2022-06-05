'use strict';

const mysqlPool = require('../../db/mysqldb');

const getUserQuery = require('../../db/queries').GET_USER;
const getUserConsentsQuery = require('../../db/queries').GET_USER_CONSENTS;

function getUser(req, res) {
    const fetchUserFromDB = mysqlPool.queryAsync(getUserQuery, ["Jupiter@planet.it"]);
    const fetchUserConsentsFromDB = mysqlPool.queryAsync(getUserConsentsQuery, ["Jupiter@planet.it"]);
    Promise.all([
        fetchUserFromDB,
        fetchUserConsentsFromDB
    ])
    .then(joinResults)
    .then(returnResponse)
    .catch(returnError);

  function joinResults(results) {
      const [ users, consents ] = results;
      const user = users.shift();
      user.consents = consents.map( i => { 
          return {
              id: i.id,
              enabled: !!i.enabled 
          };
      });
      return user
  }

  function returnResponse(user) {
    let response = {};
    if(user) {
        response.code = 200;
        response.payload = user;
    }
    else {
        response.code = 204;
        response.payload = { message: 'No data has been found'};
    }
    return res.status(response.code).json(response.payload);
  }

  function returnError(err) {
    let response = { code: 500 }
    if(typeof err === 'string') {
      response.payload = { detail: err };
    }
    return res.status(response.code).json(response.payload);
  }

}

module.exports = getUser;