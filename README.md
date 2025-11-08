# VerseSpace

[![License: ISC](https://img.shields.io/badge/license-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Stack](https://img.shields.io/badge/stack-MERN-orange.svg)](#)
[![Status](https://img.shields.io/badge/status-active-success.svg)](#)

> VerseSpace is a lightweight social micro‑poetry platform built with the MERN stack. It enables creators to write and share short poems, lets readers interact via likes, and provides profile and avatar management.

---

## Table of contents

1. [Quick summary](#quick-summary)
2. [Highlights & features](#highlights--features)
3. [Tech stack](#tech-stack)
4. [Repository layout](#repository-layout)
5. [Getting started (local development)](#getting-started-local-development)
	 - [Prerequisites](#prerequisites)
	 - [Install and run](#install-and-run)
6. [Configuration & environment variables](#configuration--environment-variables)
7. [API reference (high level)](#api-reference-high-level)
8. [Data models](#data-models)
9. [Uploads & Cloudinary](#uploads--cloudinary)
10. [Testing, linting & quality gates](#testing-linting--quality-gates)
11. [Deployment guidance](#deployment-guidance)
12. [Troubleshooting & common issues](#troubleshooting--common-issues)
13. [Contributing](#contributing)
14. [License & credits](#license--credits)

---

## Quick summary

- **Project**: VerseSpace
- **Purpose**: A social micro‑poetry app (create, like, browse short poems)
- **Frontend**: Vite + React
- **Backend**: Node.js + Express
- **Database**: MongoDB (Mongoose)
- **Assets**: Cloudinary for image uploads

This document is intended for contributors, maintainers, and deployers who need a clear developer onboarding and operational reference.

## Highlights & features

- JWT-based authentication
- Profile management with avatar uploads
- Create / update / delete poems (author-only for edits/deletes)
- Like / unlike functionality with counts and lists
- Explore / Feed pages with pagination / infinite scroll support
- Uploads via `multer` and Cloudinary integration

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), Tailwind / utility CSS, Zustand (state) |
| HTTP client | axios |
| Icons | react-icons / lucide-react |
| Backend | Node.js, Express |
| Database | MongoDB (Mongoose) |
| Uploads | multer + Cloudinary |
| Auth | JSON Web Tokens (JWT) |

## Repository layout

Top-level folders:

- `client/` — React frontend (Vite)
- `server/` — Express backend
- `uploads/` — optional local storage for dev

Key paths:

- `client/src/` — frontend source (components, pages)
- `client/package.json` — frontend scripts / deps
- `server/src/index.js` — server bootstrap
- `server/src/config/` — `db.js`, `cloudinary.js`
- `server/src/controllers/` — request handlers
- `server/src/routes/` — router definitions
- `server/src/models/` — Mongoose schemas (`User.js`, `Poem.js`)

## Getting started (local development)

### Prerequisites

- Node.js 18+ and npm (or yarn)
- MongoDB (local or Atlas)
- Optional: Cloudinary account for uploads

### Install and run

Open two terminals and run server and client separately. Commands below are for Windows `cmd.exe`.

Server

```cmd
cd server
npm install
# create .env using server/.env.example
npm start
```

Client

```cmd
cd client
npm install
# create .env using client/.env.example (set VITE_API_BASE_URL)
npm run dev
```

Notes

- API root: `http://localhost:5000/api` by default (depends on `PORT`)
- Use `nodemon` for automatic server restarts during development

## Configuration & environment variables

See `server/.env.example` and `client/.env.example` for templates. Important server keys:

```env
PORT=5000
MONGO_URI=<your_mongo_uri>
JWT_SECRET=<secret>
CLOUDINARY_CLOUD_NAME=<name>
CLOUDINARY_API_KEY=<key>
CLOUDINARY_API_SECRET=<secret>
```

Client:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Security: never commit `.env` files. Use your host/CI secrets for production.

## API reference (high level)

Base path: `/api`

Authentication

- POST `/api/auth/signup` — register: `{ username, email, password }` (public)
- POST `/api/auth/signin` — login: `{ email, password }` → returns JWT (public)

Users

- GET `/api/users/:id` — get profile (auth)
- PUT `/api/users/:id` — update profile (auth)
- PUT `/api/users/:id/avatar` — upload avatar (multipart/form-data, auth)
- GET `/api/users/:id/poems` — poems by user
- GET `/api/users/:id/liked` — poems liked by user

Poems

- POST `/api/poems/create` — create poem (auth)
- GET `/api/poems/` — list poems (public)
- GET `/api/poems/:id` — poem details
- PUT `/api/poems/:id` — update poem (auth/author)
- DELETE `/api/poems/:id` — delete poem (auth/author)
- PUT `/api/poems/:id/like` — like/unlike (auth)

Authentication header format:

```
Authorization: Bearer <token>
```

## Data models

- User: { username, email, passwordHash, avatarUrl, bio, createdAt }
- Poem: { content, author: ObjectId(User), likes: [ObjectId], likeCount, createdAt, updatedAt }

For exact fields and validation rules, open:

- `server/src/models/User.js`
- `server/src/models/Poem.js`

## Uploads & Cloudinary

- The server uses `multer` for multipart handling. Uploaded images are forwarded to Cloudinary via `server/src/config/cloudinary.js`.
- For quick local development, the `uploads/` folder can store files temporarily, but production should use Cloudinary or another remote storage provider.

## Troubleshooting & common issues

- MongoDB connection errors: validate `MONGO_URI` and network access (Atlas IP whitelist).
- Upload issues: ensure Cloudinary keys are correct and accessible in environment.
- Client cannot reach API: verify `VITE_API_BASE_URL` and server CORS configuration.

If reporting issues, include:

1. Steps to reproduce
2. Relevant logs and request payloads (sanitize secrets)
3. Node/npm versions and OS

## Contributing

Contributions are welcome. A minimal contribution workflow:

1. Fork the repo and create a branch: `git checkout -b feat/your-feature`
2. Implement your change and add tests
3. Run linting and tests locally
4. Open a PR with a descriptive title and testing steps


## License & credits

This project is licensed under the **ISC License**. See `package.json` for details.

Core contributors: theEquinoxDev

Feel free to reach out for questions or support!