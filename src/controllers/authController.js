const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/auth');
const register = (req, res) => {
  const { name, email, password, phone, subscriptionType, subscriptionExpiry } = req.body;

console.log(req.body);
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).send({ error: 'Hashing failed' });
    User.createUser(name, email, hash, phone, subscriptionType, subscriptionExpiry, (err, userId) => {
      if (err) {
        console.error('DB Insert Error:', err); // Add this
        return res.status(400).send({ error: 'Email already exists or DB error' });
      }
      res.send({ success: true, message: 'User registered successfully', userId });
    });
  });
};
const login = (req, res) => {
  const { email, password } = req.body;
  console.log('Login request:', req.body);

  User.findUserByEmail(email, (err, user) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send({ error: 'Internal server error' });
    }

    if (!user) {
      return res.status(401).send({ error: 'Invalid credentials' });
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(401).send({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });

      User.getProfileById(user.id, (err, profiles) => {
        if (err) {
          console.error('DB Error while fetching profiles:', err);
          return res.status(500).send({ error: 'Failed to retrieve user profiles' });
        }

        res.send({
          success: true,
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            subscriptionType: user.subscription_type,
            subscriptionExpiry: user.subscription_expiry
          },
          profiles 
        });
      });
    });
  });
};

const getAllUsers = (req, res) => {
  User.getAllUsers((err, users) => {
    if (err) return res.status(500).send({ error: 'Failed to retrieve users' });
    res.send({ success: true, users });
  });
};





 const verifyOtp= (req, res) => {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({ error: 'Phone and OTP are required' });
    }

    User.getLatestOtpByPhone(phone, (err, row) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (!row || row.otp !== otp) {
        console.error('OTP verification failed:', { phone, otp, row });
        return res.status(401).json({ error: 'Invalid or expired OTP' });
      }

      // Find or create user for mobile login
      User.findByPhone(phone, (err, user) => {
        if (err) return res.status(500).json({ error: 'User lookup failed' });

        if (!user) {
         res.status(200).json({ message: 'New user, please register', newUser: true });
        

         
        } else {
          const token = jwt.sign({ id: user.id, phone }, 'jwt_secret', { expiresIn: '1h' });
          return res.json({ message: 'OTP verified', token, newUser: false });
        }
      });
    });
  }
const getOtps= (req, res) => {
  User.getOtps((err, otps) => {
    if (err) return res.status(500).send({ error: 'Failed to retrieve OTPs' });
    res.send({ success: true, otps });
  });
};

const getContentWithSportsEvents = (req, res) => {
  const { type,sports } = req.body;
  console.log('Request body:', req.body);
  User.getContentWithSportsEvents(type,sports, (err, content) => {
    if (err)  {console.log(err); return res.status(500).send({ error: 'Failed to retrieve content' });}
    res.send({ success: true, content });
  });
};

module.exports = {
  register,
  login,
  getAllUsers,
  verifyOtp,
  getOtps,
  getContentWithSportsEvents
};