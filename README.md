# streming_platform

This is the backend server for a custom streaming platform built with **Node.js**, **Express**, and **SQLite3**. It supports user registration, profile management, watchlists, sports content tagging, and stream data retrieval.

## 🏗️ Features

- 👤 User Authentication (Email, Phone-based)
- 📺 Multiple User Profiles per Account
- 🔒 OTP-based verification support
- 📃 Content metadata with sports event tags
- 📶 Stream data fetch (audio languages, durations)
- ✅ Watchlist management

---

## 📂 Folder Structure

/config # Database config
/models # DB access logic for each module
/routes # Express routers (not uploaded but assumed)
/database.sqlite # SQLite file (created automatically)
/index.js # Main entry file

yaml
Copy
Edit

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/streaming-platform-backend.git
cd streaming-platform-backend
2. Install Dependencies
bash
Copy
Edit
npm install
3. Run the Server
bash
Copy
Edit
node index.js
The server will start (default: http://localhost:3000).

⚙️ Core Modules Overview
1. Authentication (auth.js)
createUser(name, email, password, phone, subscriptionType, subscriptionExpiry)

findUserByEmail(email)

findByPhone(phone)

getLatestOtpByPhone(phone)

getOtps()

getContentWithSportsEvents(type, sport)

2. Profiles (profiles.js)
createProfile(userId, name, avatar, isKid, ageGroup)

getAllProfiles()

getProfileByIdAndUserId(id, userId)

updateProfile(id, userId, name, avatar, isKid, ageGroup)

3. Streaming (stremer.js)
getStreamData(contentId, episodeId) → returns available audio languages and duration

getSportsDetails(sport) → fetch sport-related metadata

4. Watchlist (watchList.js)
add(profileId, contentId) → adds content to a user's watchlist

📡 Sample API Endpoints
Method	Route	Description
POST	/api/auth/register	Register a user
GET	/api/users	Fetch all users
POST	/api/profiles	Create user profile
POST	/api/watchlist	Add item to watchlist
GET	/api/stream/:contentId	Fetch audio + duration
GET	/api/sports/:sport	Get sports metadata

(Modify these based on your actual route file structure.)

🧰 Technologies Used
Node.js

Express.js

SQLite3

bcrypt (password hashing)

UUID / Date-fns (assumed for utilities)

📌 To Do / Future Scope
JWT-based Auth System

Full CRUD for Content & Episodes

Subscription & Billing Module

Admin Dashboard APIs

Mobile App API integration

📄 License
This project is licensed under the MIT License.
