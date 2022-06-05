'use strict';

const mysqlPool = require('../../db/mysqldb');

const deleteUserEventsQuery = require('../../db/queries').DELETE_USER_CONSENTS_EVENTS
const deleteUserConsentsQuery = require('../../db/queries').DELETE_USER_CONSENTS
const deleteUserQuery = require('../../db/queries').DELETE_USER

function deleteUser(req, res) {

    const email = req.params.email.toLowerCase();
    const params = [email];
    const deleteEventsFromDb = mysqlPool.query(deleteUserEventsQuery, params);
    const deleteConsentsFromDb = () => mysqlPool.query(deleteUserConsentsQuery, params);
    const deleteUserFromDb = () => mysqlPool.query(deleteUserQuery, params);
    
    deleteEventsFromDb
        .then(deleteConsentsFromDb)
        .then(deleteUserFromDb)
        .then(returnResponse)
        .catch(returnError);

  function returnResponse(r) {
    return res.status(204).end();
  }

  function returnError(err) {
    let response = {}
    response.code = 500
    return res.status(response.code).end();
  }

}

module.exports = deleteUser;