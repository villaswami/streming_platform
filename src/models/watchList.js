const db = require('../config/database');

const add = (profileId, contentId, callback) => {
  const query = `
    INSERT INTO watchlist (profile_id, content_id)
    VALUES (?, ?)
  `;
  db.run(query, [profileId, contentId], callback);
};

module.exports = { add };
