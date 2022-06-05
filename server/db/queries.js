const GET_USER = `SELECT * FROM users WHERE email = ?`;
const GET_USER_CONSENTS = `
  SELECT t1.type as id, t2.enabled 
  FROM consents t1
  LEFT JOIN users_consents t2 
  ON t1.id = t2.consent_id
  WHERE user_id = (SELECT id FROM users WHERE email = ?)`;

const POST_USER = `INSERT INTO users (id, email) VALUES (?, ?)`;

// const DELETE_USER = `SELECT * FROM users`;

// const POST_EVENT = `SELECT * FROM users`;

// const GET_CONSENTS = `SELECT * FROM users`;

module.exports = {
  GET_USER,
  GET_USER_CONSENTS,
  POST_USER
}