const express = require('express');
const router = express.Router();
const  addToWatchlist  = require('../controllers/watchlistController');


router.post('/watchlist/add', addToWatchlist.addToWatchlist);

module.exports = router;