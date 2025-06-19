const e = require('express');
const db = require('../config/database');

const getStreamData = (contentId, episodeId, callback) => {
  const langQuery = `
    SELECT l.name, cl.type 
    FROM content_languages cl
    JOIN languages l ON cl.language_id = l.id
    WHERE cl.content_id = ?
  `;

  const durationQuery = episodeId
    ? `SELECT duration FROM episodes WHERE id = ? AND season_id IN (SELECT id FROM seasons WHERE content_id = ?)`
    : `SELECT 7200 AS duration`;

  db.all(langQuery, [contentId], (err, langRows) => {
    if (err) return callback(err);
    console.log(langRows,episodeId, contentId);

    const audio = langRows.filter(r => r.type === 'audio').map(r => r.name);
    //we dont have subtitles in out table so it it show empty array
   // const subtitle = langRows.filter(r => r.type === 'subtitle').map(r => r.name);

    if (episodeId) {
      db.get(durationQuery, [episodeId, contentId], (err2, row) => {
        if (err2) return callback(err2);
        return callback(null, { audio, duration: row ? row.duration : undefined });
      });
    } else {
      callback(null, { audio, duration: 7200 }); // Default duration for movie/live
    }
  });
};

const getSportsDetails=(sport, callback) => {
  const query = `
    SELECT * FROM sports_events WHERE sport = ?
  `;
  db.get(query, [sport], (err, row) => {
    if (err) return callback(err);
    callback(null, row);
  });
};

module.exports = { getStreamData, getSportsDetails };
