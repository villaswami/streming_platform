const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');

router.get('/:id', contentController.getContentByID);
router.get('/seasons/:contentId', contentController.getSeasonsByContentID);
module.exports = router;