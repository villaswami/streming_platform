require('dotenv').config();
const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const contentRoutes = require('./routes/contentRoutes');
const streamRoutes = require('./routes/stremerRouters');
const wishListRoutes = require('./routes/watchlistRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/stream', streamRoutes);
app.use('/api/wishlist', wishListRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server running at http://localhost:3000');
});
 