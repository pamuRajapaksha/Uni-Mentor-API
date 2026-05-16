# Uni-Mentor – Peer-to-Peer Academic Mentorship API

**Connect junior students with senior peers who have already mastered the modules you are struggling with.**

---

## Problem Description

In many university IT programmes, knowledge transfer between cohorts is informal and fragmented. A **2nd-year student** tackling **Data Structures & Algorithms (DSA)** or **Computer Networking** often has no structured way to find a **3rd- or 4th-year peer** who has already passed those modules with strong results.

Common pain points include:

- **Lost institutional memory** — tips, study patterns, and module-specific advice live in private chats and disappear after seniors graduate.
- **Unequal access** — students with existing senior connections get help faster; others are left behind.
- **No central directory** — there is no shared record of *who* can mentor *which module*, at *what level*, and *how to reach them*.

This gap slows learning, increases anxiety before exams, and underuses the expertise already present on campus.

---

## Proposed Solution

**Uni-Mentor** is a RESTful backend API that formalises peer-to-peer academic mentorship. Senior students register as **mentors** with their module expertise, academic year, and a short bio. Junior students (or faculty) can query the API to discover who is available to help.

The API bridges the knowledge-transfer gap by:

1. **Persisting mentor profiles** in MongoDB so listings survive beyond a single semester.
2. **Exposing standard HTTP endpoints** (Create, Read, Update, Delete) that any client can consume — Postman, a mobile app, or the optional React frontend.
3. **Enforcing unique mentor emails** to prevent duplicate registrations and keep the directory trustworthy.

---

## Key Features

| Feature | Description |
|--------|-------------|
| **Create Mentor** | Register a new senior student as a mentor with name, email, expertise, year, and bio. |
| **List All Mentors** | Retrieve every mentor profile from the database. |
| **Update Mentor** | Modify an existing mentor record by MongoDB `_id`. |
| **Delete Mentor** | Remove a mentor from the directory when they graduate or opt out. |
| **Duplicate Prevention** | Rejects registration if the email is already in use. |
| **CORS Support** | Configurable cross-origin access for the optional React frontend. |
| **Optional React UI** | A Vite + React client in `/frontend` demonstrates full CRUD against the API. |

---

## Technologies Used

- **Node.js** — JavaScript runtime for the server
- **Express.js** — Web framework and REST routing
- **MongoDB** — NoSQL database for mentor documents
- **Mongoose** — ODM for schema validation and MongoDB interaction
- **dotenv** — Environment variable management
- **body-parser** — JSON request body parsing
- **nodemon** — Auto-restart during development
- **Postman** — API testing and demonstration (recommended for examiners)
- **GitHub** — Version control and project hosting
- **React.js + Vite** *(optional)* — Modern frontend accelerated with **Cursor AI Vibe Coding**

---

## Detailed API Endpoints

**Base URL:** `http://localhost:8000`  
**Route prefix:** `/api/mentor`

All mentor resources share the following JSON shape:

| Field | Type | Required | Example |
|-------|------|----------|---------|
| `name` | String | Yes | `"Amaya Perera"` |
| `email` | String | Yes (unique) | `"amaya@university.lk"` |
| `expertise` | String | Yes | `"Data Structures & Algorithms"` |
| `year` | Number | Yes | `3` |
| `bio` | String | Yes | `"DSA lab tutor; happy to review past papers."` |

---

### POST `/api/mentor/create`

Creates a new mentor profile.

**Request body**

```json
{
  "name": "Amaya Perera",
  "email": "amaya@university.lk",
  "expertise": "Data Structures & Algorithms",
  "year": 3,
  "bio": "Scored 85+ in DSA; available for weekly study sessions and past-paper walkthroughs."
}
```

**Success response** `200 OK`

```json
{
  "_id": "674a1b2c3d4e5f6789012345",
  "name": "Amaya Perera",
  "email": "amaya@university.lk",
  "expertise": "Data Structures & Algorithms",
  "year": 3,
  "bio": "Scored 85+ in DSA; available for weekly study sessions and past-paper walkthroughs.",
  "__v": 0
}
```

**Error response** `400 Bad Request` (duplicate email)

```json
{
  "message": "Mentor already exists."
}
```

---

### GET `/api/mentor/getall`

Returns all registered mentors.

**Request body:** none

**Success response** `200 OK`

```json
[
  {
    "_id": "674a1b2c3d4e5f6789012345",
    "name": "Amaya Perera",
    "email": "amaya@university.lk",
    "expertise": "Data Structures & Algorithms",
    "year": 3,
    "bio": "Scored 85+ in DSA; available for weekly study sessions and past-paper walkthroughs.",
    "__v": 0
  },
  {
    "_id": "674a1b2c3d4e5f6789012346",
    "name": "Kasun Silva",
    "email": "kasun@university.lk",
    "expertise": "Computer Networking",
    "year": 4,
    "bio": "CCNA-oriented mentoring; subnetting and OSI model deep dives.",
    "__v": 0
  }
]
```

**Error response** `404 Not Found` (empty collection)

```json
{
  "message": "No mentors found."
}
```

---

### PUT `/api/mentor/update/:id`

Updates an existing mentor. Replace `:id` with the mentor's MongoDB `_id`.

**Example URL:** `PUT http://localhost:8000/api/mentor/update/674a1b2c3d4e5f6789012345`

**Request body** (partial or full update)

```json
{
  "expertise": "DSA & Discrete Mathematics",
  "bio": "Now also tutoring discrete maths revision groups."
}
```

**Success response** `201 Created`

```json
{
  "_id": "674a1b2c3d4e5f6789012345",
  "name": "Amaya Perera",
  "email": "amaya@university.lk",
  "expertise": "DSA & Discrete Mathematics",
  "year": 3,
  "bio": "Now also tutoring discrete maths revision groups.",
  "__v": 0
}
```

**Error response** `404 Not Found`

```json
{
  "message": "Mentor not found."
}
```

---

### DELETE `/api/mentor/delete/:id`

Deletes a mentor by MongoDB `_id`.

**Example URL:** `DELETE http://localhost:8000/api/mentor/delete/674a1b2c3d4e5f6789012345`

**Request body:** none

**Success response** `201 Created`

```json
{
  "message": "Mentor deleted successfully."
}
```

**Error response** `404 Not Found`

```json
{
  "message": "Mentor not found."
}
```

**Server error** `500 Internal Server Error` (all endpoints)

```json
{
  "error": "Internal Server Error."
}
```

---

## Setup Instructions

### Prerequisites

Install the following before cloning the repository:

| Tool | Purpose | Recommended version |
|------|---------|---------------------|
| [Node.js](https://nodejs.org/) | Run the API and frontend | LTS (v18+) |
| [MongoDB](https://www.mongodb.com/try/download/community) | Database server | 6.x or 7.x |
| [MongoDB Compass](https://www.mongodb.com/products/compass) | GUI to view collections | Latest |
| [Postman](https://www.postman.com/downloads/) | Test REST endpoints | Latest |
| [Git](https://git-scm.com/) | Clone and manage the repo | Latest |

### MongoDB Compass configuration

1. Start the **MongoDB** service on your machine (default port `27017`).
2. Open **MongoDB Compass** and connect with:
   ```
   mongodb://localhost:27017
   ```
3. The API uses the database **`uni_mentor`** (created automatically on first write). Mentor documents are stored in the **`mentors`** collection.
4. After running `POST /api/mentor/create`, refresh Compass to inspect saved documents.

### Environment variables

Create a `.env` file in the project root (same folder as `index.js`):

```env
PORT=8000
MONGO_URL=mongodb://localhost:27017/uni_mentor
FRONTEND_URL=http://localhost:5173
```

| Variable | Description |
|----------|-------------|
| `PORT` | Port the Express server listens on (default fallback: `5000`) |
| `MONGO_URL` | MongoDB connection string including database name |
| `FRONTEND_URL` | Allowed origin for CORS (optional React app) |

> **Note:** Do not commit `.env` to GitHub. Keep credentials and connection strings local only.

### Project structure

```
Uni-Mentor-API/
├── index.js                 # Server entry point
├── controller/
│   └── mentorController.js  # CRUD business logic
├── model/
│   └── mentorModel.js       # Mongoose schema
├── route/
│   └── mentorRoute.js       # Express routes
├── frontend/                # Optional React + Vite UI
├── package.json
└── .env                     # Local configuration (not in repo)
```

---

## How to Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/pamuRajapaksha/Uni-Mentor-API.git
cd Uni-Mentor-API
```

### 2. Install backend dependencies

```bash
npm install
```

### 3. Configure environment

Create the `.env` file as described in [Setup Instructions](#setup-instructions).

### 4. Start the API server

```bash
npm start
```

Expected console output:

```
Database connected successfully.
Server is running on port: 8000
```

### 5. Test with Postman

1. Import or create requests for the four endpoints listed above.
2. Set **Headers** → `Content-Type: application/json` for POST and PUT.
3. Use the JSON examples in this README as request bodies.
4. Copy a mentor `_id` from a GET response when testing UPDATE and DELETE.

### 6. *(Optional)* Run the React frontend

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:5173** in your browser. In development, Vite proxies `/api` requests to `http://localhost:8000`, so the UI works without extra CORS configuration.

For production builds, copy `frontend/.env.example` to `frontend/.env` and set:

```env
VITE_API_URL=http://localhost:8000
```

---

## Bonus: AI Assistance & Vibe Coding

The core assessment deliverable for this module is the **REST API** (Node.js, Express, MongoDB, Mongoose). The optional **React frontend** in the `frontend/` folder was developed using **Cursor AI** and **Vibe Coding** workflows to demonstrate how modern teams accelerate UI work without replacing fundamental backend skills.

What Vibe Coding added in practice:

- **Rapid scaffolding** — React component structure, form state, and API helper modules (`mentorApi.js`) were generated and refined iteratively in Cursor.
- **Consistent CRUD wiring** — The UI mirrors the same four endpoints documented above (create, list, update, delete).
- **Developer focus** — Less time on boilerplate meant more time validating API contracts, error handling, and MongoDB data integrity.

The frontend is a **bonus demonstration layer** for examiners and peers; the API remains fully testable and gradable on its own via **Postman**.

---

## Author & Repository

- **GitHub:** [pamuRajapaksha/Uni-Mentor-API](https://github.com/pamuRajapaksha/Uni-Mentor-API)
- **Licence:** ISC

---

*Built for 2nd Year IT students — bridging the gap between those who are learning and those who have already succeeded.*
