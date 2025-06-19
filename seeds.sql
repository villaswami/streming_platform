-- Insert languages
INSERT INTO languages (name) VALUES 
  ('English'), ('Hindi'), ('Tamil'), ('Telugu'), ('Malayalam');

-- Insert genres
INSERT INTO genres (name) VALUES 
  ('Action'), ('Drama'), ('Thriller'), ('Comedy'), ('Documentary');

-- Insert subscriptions
INSERT INTO subscriptions (name, price, duration, features, devices_allowed, quality, downloads_allowed) VALUES
  ('Mobile', 149, 'monthly', '1 mobile device, HD streaming, Ads on some content', 1, 'HD', 0),
  ('Super', 899, 'yearly', '2 devices, Full HD streaming, All content, Live sports', 2, 'Full HD', 1),
  ('Premium', 1499, 'yearly', '4 devices, 4K streaming, Ad-free', 4, '4K', 1);

-- Insert content
INSERT INTO content (title, type, description, rating, imdb_rating, release_date, is_hotstar_special, thumbnail) VALUES
  ('Avengers: Endgame', 'movie', 'Superheroes unite to defeat Thanos', 'U/A 13+', 8.4, '2019-04-26', 0, 'thumbnail_avengers.jpg'),
  ('The Mandalorian', 'series', 'A bounty hunter travels across galaxies', 'U/A 13+', 8.7, '2019-11-12', 1, 'thumbnail_mando.jpg'),
  ('India vs Pakistan - Asia Cup', 'sports', 'Live cricket match', 'U', 0, '2024-09-15', 1, 'thumbnail_match.jpg');

-- Map content to genres
INSERT INTO content_genres (content_id, genre_id) VALUES
  (1, 1), (1, 3),
  (2, 1), (2, 5),
  (3, 2);

-- Map content to languages
INSERT INTO content_languages (content_id, language_id, type) VALUES
  (1, 1, 'audio'), (1, 2, 'audio'), (1, 1, 'subtitle'),
  (2, 1, 'audio'), (2, 2, 'subtitle'), (2, 3, 'subtitle'),
  (3, 1, 'audio');

-- Insert sports event
INSERT INTO sports_events (content_id, sport, tournament, match, status, start_time, venue) VALUES
  (3, 'Cricket', 'Asia Cup 2024', 'India vs Pakistan', 'upcoming', '2024-09-15T19:30:00+05:30', 'Dubai Stadium');

-- Insert channel
INSERT INTO channels (name, category, language, stream_url, is_premium) VALUES
  ('Star Sports 1', 'Sports', 'English', 'https://stream.sport1.com', 1);

-- Insert programs
INSERT INTO channel_programs (channel_id, title, description, start_time, end_time, program_date) VALUES
  (1, 'Live Cricket: India vs Pakistan', 'Match coverage and commentary', '14:00', '23:00', '2024-09-15');

-- Insert a user with pre-hashed password (replace with bcrypt hashes!)
INSERT INTO users (name, email, password, phone, country, subscription_type, subscription_expiry)
VALUES ('Test User', 'test@example.com', '$2a$10$EXAMPLEBCRYPT123456', '+919999000001', 'IN', 'Premium', '2025-12-31');

-- Insert profiles
INSERT INTO profiles (user_id, name, avatar, is_kids, age_group)
VALUES (1, 'John', 'avatar_1', 0, NULL), (2, 'Kids', 'avatar_2', 1, '7-12');

-- Insert watchlist
INSERT INTO watchlist (profile_id, content_id)
VALUES (1, 1), (2, 2);

-- Insert watch history
INSERT INTO watch_history (profile_id, content_id, resume_time, device)
VALUES (1, 1, 1500, 'web'), (2, 2, 400, 'mobile');
