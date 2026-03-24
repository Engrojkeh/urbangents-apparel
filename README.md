# Urbangents Apparel - Master System

Welcome to your final year project e-commerce website! The system is fully scaffolded based on your Master Blueprint.

## 1. Setup Your Database
Since this system relies on MySQL, you must initialize the database locally:
1. Open your MySQL client (e.g., XAMPP, phpMyAdmin, or MySQL Workbench).
2. Execute the `schema.sql` script located in this root directory to automatically create the `urbangents_db` database and its 4 tables (`Users`, `Products`, `Orders`, `Order_Items`).

## 2. Configure Environment Variables
Inside the `backend/` folder, you will find a `.env.example` file. 
1. Copy its contents or rename it to `.env`.
2. Update the `DB_PASSWORD` to match your local MySQL root password.
3. Update the `PAYSTACK_SECRET_KEY` and `PAYSTACK_PUBLIC_KEY` with your actual Paystack test API keys before attempting the checkout flow.

## 3. Run the Servers

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
# Note: if nodemon is not installed, use `node server.js`
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

## User Experience Roles
- **Shopper**: Access the default `http://localhost:5173/` store to view dynamic products and use the AJAX shopping cart.
- **Admin**: Go to `http://localhost:5173/login`, and use your admin credentials (or use `admin@urbangents.com` / `admin123` for the dummy route) to access the dashboard where you can see live Revenue and upload product photos directly using the Mobile Camera.

Good luck with your final year project presentation!
