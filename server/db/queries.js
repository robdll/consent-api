const GET_USER = `SELECT * FROM users WHERE email = ?`;
const GET_USER_CONSENTS = `
  SELECT t1.type as id, t2.enabled 
  FROM consents t1
  LEFT JOIN users_consents t2 
  ON t1.id = t2.consent_id
  WHERE user_id = (SELECT id FROM users WHERE email = ?)`;

const POST_USER = `INSERT INTO users (id, email) VALUES (?, ?)`;

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

// const POST_EVENT = `SELECT * FROM users`;

// const GET_CONSENTS = `SELECT * FROM users`;

module.exports = {
  GET_USER,
  GET_USER_CONSENTS,
  POST_USER,
  DELETE_USER_CONSENTS_EVENTS,
  DELETE_USER_CONSENTS,
  DELETE_USER
}