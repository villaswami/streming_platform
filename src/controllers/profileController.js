const profile= require('../models/profiles');

const createProfile = (req, res) => {
  const { userId, name, avatar, isKid, ageGroup } = req.body;

  if (!userId || !name) {
    return res.status(400).send({ error: 'User ID and name are required' });
  }

  profile.createProfile(userId, name, avatar, isKid, ageGroup, (err, profileId) => {
    if (err) {
      console.error('DB Insert Error:', err);
      return res.status(500).send({ error: 'Failed to create profile' });
    }
    res.send({ success: true, message: 'Profile created successfully', profileId });
  });
}


const getAllProfiles = (req, res) => {
    profile.getAllProfiles((err,profiles)=>{
        if(err) {
            
            return res.status(500).send({ error: 'Failed to fetch profiles' });
        }
        res.send({ success: true, profiles });
    });
}

const getProfileByIdAndUserId = (req, res) => {
  const { id } = req.params;
  const userId = req.body.userId;
  profile.getProfileByIdAndUserId(id, userId, (err, profile) => {
    if (err) {
      return res.status(500).send({ error: 'Failed to fetch profile' });
    }
    res.send({ success: true, profile });
  });
};
const updateProfile = (req, res) => {
  const { id, userId, name, avatar, isKid, ageGroup } = req.body;   

  if (!id || !userId) {
    return res.status(400).send({ error: 'ID and User ID are required' });
  }

  profile.updateProfile(id, userId, name, avatar, isKid, ageGroup, (err) => {
    if (err) {
      console.error('DB Update Error:', err);
      return res.status(500).send({ error: 'Failed to update profile' });
    }
    res.send({ success: true, message: 'Profile updated successfully' });
  });
};


module.exports = { createProfile,
    getAllProfiles,
    getProfileByIdAndUserId,
    updateProfile
 };