const db=require('../config/database');
const getContentByID = (id, callback) => {
  const query = `SELECT 
  c.id AS contentId,
  c.title,
  c.type,
  c.description,
  c.rating,
  c.imdb_rating,
  c.release_date,
  c.is_hotstar_special,
  c.thumbnail,
  cl.type AS languageType,
  l.name AS languageName
FROM content c
JOIN content_languages cl ON c.id = cl.content_id
JOIN languages l ON cl.language_id = l.id
WHERE c.id = ?`;

  db.all(query, [id], (err, rows) => {
    if (err) return callback(err);
    if (!rows.length) return callback(null, null);
console.log(rows);
    const first = rows[0];
    console.log(first);
    const content = {
      contentId: first.contentId,
      title: first.title,
      type: first.type,
      description: first.description,
      rating: first.rating,
      imdb_rating: first.imdb_rating,
      release_date: first.release_date,
      is_hotstar_special: first.is_hotstar_special,
      thumbnail: first.thumbnail
    };

    // Language aggregation
    const languages = { audio: [], subtitle: [] };
    rows.forEach(row => {
        console.log(row.languageName, row.languageType);
      if (row.languageType === 'audio') {
        if (!languages.audio.includes(row.languageName)) {
          languages.audio.push(row.languageName);
        }
        //acctule we have to check subtile by we dont have any subtile in our database
      } else if (row.languageName === 'English') {
        if (!languages.subtitle.includes(row.languageName)) {
          languages.subtitle.push(row.languageName);
        }
      }
    });

    callback(null, { content, languages });
  });
}


const getSeasonsBYContentID = (contentId, callback) => {
  const query = `SELECT 
  s.id AS seasonId,
  s.content_id,
  s.season_number,
  s.year,
  s.description
FROM seasons s
WHERE s.content_id = ?
ORDER BY s.season_number;`;
  db.all(query, [contentId], callback);
}

module.exports = { getContentByID, getSeasonsBYContentID };