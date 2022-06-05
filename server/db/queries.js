const GET_USER = `SELECT * FROM users WHERE email = ?`;

const GET_USER_BY_ID = `SELECT * FROM users WHERE id = ?`;

const GET_USER_CONSENTS_USING_EMAIL = `
  SELECT t1.type as id, t2.enabled 
  FROM consents t1
  LEFT JOIN users_consents t2 
  ON t1.id = t2.consent_id
  WHERE user_id = (SELECT id FROM users WHERE email = ?)`;

const GET_USER_CONSENTS = `
  SELECT t1.type, t2.user_id, t2.id as id
  FROM consents t1
  LEFT JOIN users_consents t2 
  ON t1.id = t2.consent_id
  WHERE t2.user_id = ?`;

const POST_USER = `INSERT INTO users (id, email) VALUES (?, ?)`;

const POST_USER_CONSENT = `
  INSERT INTO users_consents 
  (id, user_id, consent_id, enabled) 
  VALUES (?, ?, ?, ?)
`;

const POST_EVENT = `
  INSERT INTO users_consents_events  
    ( id, new_value, users_consents_id, user_id ) 
    VALUES (?, ?, ?, ?)`;

// delete all events associated to the ids of consents linked to a certain user
const DELETE_USER_CONSENTS_EVENTS = `
  DELETE FROM users_consents_events 
  WHERE users_consents_id in (
    SELECT id 
    FROM users_consents 
    WHERE user_id = (
      SELECT id 
      FROM users 
      WHERE email = ?
    )
  );
`;

// delete all consents linked to a certain user
const DELETE_USER_CONSENTS = `
  DELETE FROM users_consents 
  WHERE user_id = (
    SELECT id 
    FROM users 
    WHERE email = ?
  )
`;

const DELETE_USER = `DELETE FROM users WHERE email = ?;`;

const GET_CONSENTS = `SELECT id, type FROM consents`;

const UPDATE_USER_CONSENT = `
  UPDATE users_consents 
  SET enabled = ? 
  WHERE id = ?
`;

const GET_USER_EVENTS = `
  SELECT * 
  FROM users_consents_events 
  WHERE user_id = ?
  ORDER BY created ASC
`

module.exports = {
  GET_USER,
  GET_CONSENTS,
  GET_USER_CONSENTS_USING_EMAIL,
  GET_USER_CONSENTS,
  DELETE_USER_CONSENTS_EVENTS,
  DELETE_USER_CONSENTS,
  DELETE_USER,
  POST_USER,
  UPDATE_USER_CONSENT,
  POST_USER_CONSENT,
  POST_EVENT,
  GET_USER_BY_ID,
  GET_USER_EVENTS
}