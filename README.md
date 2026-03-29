# Urbangents Apparels

A premium menswear e-commerce platform with a modern editorial "Atelier" aesthetic. Built as part of a final year engineering project.

## Live Demo
Deployed on [Vercel](https://vercel.com) — see the live site for a full demo.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | TiDB (MySQL-compatible, serverless) |
| Auth | JWT + bcrypt |
| Deployment | Vercel |

## Features
- 🛍️ Dynamic product catalog with editorial asymmetric grid layout
- 🔐 User authentication with role-based access (shopper & admin)
- 🛒 Persistent shopping cart with size/color selection
- 📦 Admin dashboard with full product CRUD and order management
- 📱 Fully mobile-responsive with smooth CSS animations
- 🌙 Dark-mode luxury design inspired by high-end streetwear brands

## Local Development

### Prerequisites
- Node.js v18+
- A MySQL-compatible database instance

### Backend
```bash
cd backend
cp .env.example .env   # fill in your own environment values
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and the backend on `http://localhost:5000` by default.

> **Note:** You will need to supply your own environment variables. See `backend/.env.example` for the required keys. Do not commit any `.env` files.

## Project Structure
```
urbangents-apparel/
├── backend/          # Express API, auth, product & order routes
│   └── .env.example  # Environment variable template
├── frontend/         # React + Vite app
│   └── src/
│       ├── pages/    # Home, Shop, Cart, Login, Admin, etc.
│       ├── components/  # Navbar and shared UI
│       └── context/  # CartContext (global state)
└── README.md
```

## License
This project is for academic and portfolio purposes.
