-- USERS
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  phone TEXT UNIQUE,
  country TEXT,
  subscription_type TEXT,
  subscription_expiry TEXT
);

-- PROFILES
CREATE TABLE IF NOT EXISTS profiles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  name TEXT,
  avatar TEXT,
  is_kids BOOLEAN,
  age_group TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- CONTENT (Movies, Shows, Sports, etc.)
CREATE TABLE IF NOT EXISTS content (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  type TEXT, -- movie, series, sports, documentary
  description TEXT,
  rating TEXT,
  imdb_rating REAL,
  release_date TEXT,
  is_hotstar_special BOOLEAN DEFAULT 0,
  thumbnail TEXT
);

-- GENRES
CREATE TABLE IF NOT EXISTS genres (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE
);

-- CONTENT_GENRES (many-to-many)
CREATE TABLE IF NOT EXISTS content_genres (
  content_id INTEGER,
  genre_id INTEGER,
  FOREIGN KEY (content_id) REFERENCES content(id) ON DELETE CASCADE,
  FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE CASCADE,
  PRIMARY KEY (content_id, genre_id)
);

-- LANGUAGES
CREATE TABLE IF NOT EXISTS languages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL
);

-- CONTENT_LANGUAGES (audio/subtitle mapping)
CREATE TABLE IF NOT EXISTS content_languages (
  content_id INTEGER,
  language_id INTEGER,
  type TEXT, -- audio or subtitle
  FOREIGN KEY (content_id) REFERENCES content(id) ON DELETE CASCADE,
  FOREIGN KEY (language_id) REFERENCES languages(id),
  PRIMARY KEY (content_id, language_id, type)
);

-- SERIES SEASONS
CREATE TABLE IF NOT EXISTS seasons (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content_id INTEGER,
  season_number INTEGER,
  year INTEGER,
  description TEXT,
  FOREIGN KEY (content_id) REFERENCES content(id) ON DELETE CASCADE
);

-- EPISODES
CREATE TABLE IF NOT EXISTS episodes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  season_id INTEGER,
  title TEXT,
  episode_number INTEGER,
  duration INTEGER,
  air_date TEXT,
  FOREIGN KEY (season_id) REFERENCES seasons(id) ON DELETE CASCADE
);

-- SPORTS EVENTS
CREATE TABLE IF NOT EXISTS sports_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content_id INTEGER,
  sport TEXT,
  tournament TEXT,
  match TEXT,
  status TEXT, -- upcoming/live/completed
  start_time TEXT,
  venue TEXT,
  FOREIGN KEY (content_id) REFERENCES content(id) ON DELETE CASCADE
);

-- WATCHLIST
CREATE TABLE IF NOT EXISTS watchlist (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  profile_id INTEGER,
  content_id INTEGER,
  added_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE,
  FOREIGN KEY (content_id) REFERENCES content(id) ON DELETE CASCADE
);

-- WATCH HISTORY
CREATE TABLE IF NOT EXISTS watch_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  profile_id INTEGER,
  content_id INTEGER,
  episode_id INTEGER, -- nullable if not a series
  resume_time INTEGER,
  device TEXT,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (profile_id) REFERENCES profiles(id),
  FOREIGN KEY (content_id) REFERENCES content(id),
  FOREIGN KEY (episode_id) REFERENCES episodes(id)
);

-- LIVE CHANNELS
CREATE TABLE IF NOT EXISTS channels (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  category TEXT,
  language TEXT,
  stream_url TEXT,
  is_premium BOOLEAN DEFAULT 0
);

-- CHANNEL PROGRAMS (EPG)
CREATE TABLE IF NOT EXISTS channel_programs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  channel_id INTEGER,
  title TEXT,
  description TEXT,
  start_time TEXT,
  end_time TEXT,
  program_date TEXT,
  FOREIGN KEY (channel_id) REFERENCES channels(id) ON DELETE CASCADE
);

-- SUBSCRIPTION PLANS
CREATE TABLE IF NOT EXISTS subscriptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  price INTEGER,
  duration TEXT, -- monthly, yearly
  features TEXT,
  devices_allowed INTEGER,
  quality TEXT,
  downloads_allowed BOOLEAN
);

-- DEVICE MANAGEMENT
CREATE TABLE IF NOT EXISTS devices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  profile_id INTEGER,
  device_type TEXT,
  device_id TEXT,
  added_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (profile_id) REFERENCES profiles(id)
);
