'use strict';

const mysqlPool = require('../../db/mysqldb');

const getUserEvents = require('../../db/queries').GET_USER_EVENTS;

function getEvents(req, res) {
  const params = [req.params.id];
  mysqlPool
    .query(getUserEvents, params)
    .then(returnResponse)
    .catch(returnError);

  function returnResponse(eventsData) {
    let response = {};
    const events = eventsData.shift()
    if(events) {
        response.code = 200;
        response.payload = events;
    }
    else {
        response.code = 204;
        response.payload = {};
    }
    return res.status(response.code).json(response.payload);
  }

  function returnError(err) {
    console.log('err',err)
    let response = { code: 500 }
    response.payload = typeof err === 'string' ? { detail: err } : {};
    return res.status(response.code).json(response.payload);
  }
}

module.exports = getEvents;