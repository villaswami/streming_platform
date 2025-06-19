const streamController = require('../controllers/stremerController');
const express = require('express');
const router = express.Router();
router.get('/stream/:contentId', streamController.getStreamByContentId);
router.get('/sport/live', streamController.getSportsStream);
module.exports = router;