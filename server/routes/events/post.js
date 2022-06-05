'use strict';

const mysqlPool = require('../../db/mysqldb');
const { v4: uuidv4 } = require('uuid');

const getUserById = require('../../db/queries').GET_USER_BY_ID;
const getConsentsQuery = require('../../db/queries').GET_CONSENTS;
const getUserConsentsQuery = require('../../db/queries').GET_USER_CONSENTS;
const updateUserConsentQuery = require('../../db/queries').UPDATE_USER_CONSENT;
const createUserConsentQuery = require('../../db/queries').POST_USER_CONSENT;
const createEventQuery = require('../../db/queries').POST_EVENT;

async function postEvent(req, res) {

    const user_id = req.body.user.id;

    const userExist = await mysqlPool.queryAsync(getUserById, [user_id])

    // return if user not found
    if(!userExist.length) {
        return res.status(404).end();
    }

    // filter out any invalid modeled consents
    let consents = req.body.consents.filter( element => {
        const hasNeededProps = element.hasOwnProperty('id') && element.hasOwnProperty('enabled')
        const hasValidTypeProps = typeof element.id === 'string' && typeof element.enabled === 'boolean'
        return hasNeededProps && hasValidTypeProps
    });

    // filter out any unknonw consent type
    const acceptedConsents = await mysqlPool.queryAsync(getConsentsQuery);
    consents = consents.filter( element => acceptedConsents.map( i => i.type).includes(element.id) )

    // no update required if no consents are left
    if(!consents.length) {
        return res.status(200).end();
    }

    // get existing user consents
    let userConsents = await mysqlPool.queryAsync(getUserConsentsQuery, [user_id]);

    // map each consent as a promise to either create consent and event or update consent and create event
    const promises = consents.map( element => {
        const foundConsent = userConsents.find( (userConsent) => userConsent.type === element.id)
        if(foundConsent) {
            const params = [element.enabled, foundConsent.id]
            const eventParams = [uuidv4(), ...params]
            return mysqlPool.queryAsync(updateUserConsentQuery, params)
                .then( (r) => {
                    return mysqlPool.queryAsync(createEventQuery, eventParams)
                })
        } else {
            // create
            const userConsentId = uuidv4();
            const consent_id = acceptedConsents.find( i => i.type === element.id).id
            const params = [userConsentId, user_id, consent_id, element.enabled]
            const eventParams = [uuidv4(), element.enabled, userConsentId]
            return mysqlPool
                .queryAsync(createUserConsentQuery, params)
                .then( () => {
                    return mysqlPool.queryAsync(createEventQuery, eventParams)
                })
        }
    })
    
    Promise.all(
        promises
    ).then(returnResponse)
        .catch(returnError);

  function returnResponse(user) {
    return res.status(201).end();
  }

  function returnError(err) {
      console.log(err)
    let response = {}
    if( err && err.code && err.code === 'ER_DUP_ENTRY') {
        response.code = 409
    } 
    return res.status(response.code || 500).end();
  }

}

module.exports = postEvent;