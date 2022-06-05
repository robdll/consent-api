'use strict';

const mysqlPool = require('../../db/mysqldb');

const getUserQuery = require('../../db/queries').GET_USER;
const getUserConsentsQuery = require('../../db/queries').GET_USER_CONSENTS_USING_EMAIL;

function getUser(req, res) {
  const params = [req.params.email];
  const fetchUserFromDB = mysqlPool.query(getUserQuery, params);
  const fetchUserConsentsFromDB = mysqlPool.query(getUserConsentsQuery, params);

  Promise.all([
      fetchUserFromDB,
      fetchUserConsentsFromDB
  ])
    .then(joinResults)
    .then(returnResponse)
    .catch(returnError);

  function joinResults(results) {
    const [ usersData, consentsData ] = results;
    const user = usersData[0].shift();
    // Skip payload manipulation when no user has been found
    if(usersData.length === 0) {
      return
    }
    const consents = consentsData.shift();
    if(consents) {
      // Cast mysql 1 or 0 as boolean
      user.consents = consents.map( i => ({ 
          id: i.id,
          enabled: !!i.enabled 
        })
      );
    }
    
    return user
  }

  function returnResponse(user) {
    let response = {};
    if(user) {
        response.code = 200;
        response.payload = user;
        return res.status(response.code).json(response.payload);
      }
    else {
        response.code = 204;
        return res.status(response.code).end();
      }
  }

  function returnError(err) {
    console.log('err',err)
    let response = { code: 500 }
    response.payload = typeof err === 'string' ? { detail: err } : {};
    return res.status(response.code).json(response.payload);
  }
}

module.exports = getUser;