const db = require('../config/database');

const createUser = (name, email, hashedPassword, phone, subscriptionType, subscriptionExpiry, callback) => {
  const query = `INSERT INTO users (name, email, password, phone, subscription_type, subscription_expiry) VALUES (?, ?, ?, ?, ?, ?)`;
  db.run(query, [name, email, hashedPassword, phone, subscriptionType, subscriptionExpiry], function (err) {
    callback(err, this?.lastID);
  });
  //console.log(a);

};

const findUserByEmail = (email, callback) => {
  db.get(`SELECT * FROM users WHERE email = ?`, [email], callback);
 
};
const getProfileById = (id, callback) => {
  db.get(`SELECT * FROM profiles WHERE id = ?`, [id], callback);
};

const getAllUsers = (callback) => {
  db.all(`SELECT * FROM users`, [], callback);
};
const findByPhone= (phone, callback) => {
  db.get(`SELECT * FROM users WHERE phone = ?`, [phone], callback);
}


const getLatestOtpByPhone= (phone, callback) => {
    const query = `SELECT * FROM otps WHERE phone = ? ORDER BY created_at DESC LIMIT 1`;
    db.get(query, [phone], callback);
  }
  const getOtps = ( callback) => {
  const query = `SELECT * FROM otps `;
  db.all(query, [], callback);
};

const getContentWithSportsEvents=(type,sports, callback) => {
  const query = `SELECT content.*, sports_events.sport, sports_events.status
    FROM content
    INNER JOIN sports_events ON content.id = sports_events.content_id
    WHERE content.type = ? AND sports_events.sport = ?`;
  db.all(query, [type,sports], callback);
};

module.exports = { createUser, findUserByEmail, getAllUsers,getProfileById, findByPhone, getLatestOtpByPhone,getOtps,getContentWithSportsEvents};
