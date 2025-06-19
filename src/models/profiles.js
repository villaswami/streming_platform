const db = require('../config/database');
const createProfile = (userId, name, avatar,isKid,ageGroup, callback) => {
  const query = `INSERT INTO profiles (user_id, name, avatar,is_kids,age_group) VALUES (?, ?, ?, ?, ?)`;
  db.run(query, [userId, name, avatar,isKid,ageGroup], function (err) {
    callback(err, this?.lastID);
  });
}

const getAllProfiles=(callback) => {
  const query = `SELECT * FROM profiles`;
  db.all(query, [], callback);
}
const getProfileByIdAndUserId = (id, userId, callback) => {
  const query = `SELECT * FROM profiles WHERE id = ? AND user_id = ?`;
  db.get(query, [id, userId], callback);
}


const updateProfile = (id, userId, name, avatar, isKid, ageGroup, callback) => {
  const query = `UPDATE profiles SET name = ?, avatar = ?, is_kids = ?, age_group = ? WHERE id = ? AND user_id = ?`;
  db.run(query, [name, avatar, isKid, ageGroup, id, userId], function (err) {
    callback(err);
  });
}
module.exports = { createProfile, getAllProfiles, getProfileByIdAndUserId , updateProfile };