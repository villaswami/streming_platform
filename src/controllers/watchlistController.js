const watchlistModel = require('../models/watchList');

const addToWatchlist = (req, res) => {
  const { contentId, contentType } = req.body;
  const { profileId } = req.user;

  if (!contentId || !profileId) {
    return res.status(400).json({ error: 'Content ID and Profile ID are required' });
  }

  watchlistModel.add(profileId, contentId, (err) => {
    if (err) {
      if (err.code === 'SQLITE_CONSTRAINT') {
        return res.status(409).json({ error: 'Content already in watchlist' });
      }
      return res.status(500).json({ error: 'Failed to add to watchlist' });
    }

    res.json({ success: true, message: 'Content added to watchlist' });
  });
};

module.exports = { addToWatchlist };
