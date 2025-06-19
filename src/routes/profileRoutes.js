const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.post('/create', profileController.createProfile);
router.get('/all', profileController.getAllProfiles);
router.post('/:id', profileController.getProfileByIdAndUserId);

router.put('/update', profileController.updateProfile);

module.exports = router;
