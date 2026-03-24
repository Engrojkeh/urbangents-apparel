-- MySQL Schema for Urbangents Apparel

-- Create Database
CREATE DATABASE IF NOT EXISTS urbangents_db;
USE urbangents_db;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS Users (
    user_id VARCHAR(36) PRIMARY KEY, -- UUID
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('shopper', 'admin') DEFAULT 'shopper',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Products Table
CREATE TABLE IF NOT EXISTS Products (
    product_id VARCHAR(36) PRIMARY KEY, -- UUID
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0,
    category VARCHAR(100),
    size VARCHAR(50),
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Orders Table
CREATE TABLE IF NOT EXISTS Orders (
    order_id VARCHAR(36) PRIMARY KEY, -- UUID
    user_id VARCHAR(36) NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    shipping_address JSON NOT NULL, -- Storing JSON object for address
    payment_status ENUM('Pending', 'Paid', 'Failed') DEFAULT 'Pending',
    delivery_status ENUM('Processing', 'Shipped', 'Delivered') DEFAULT 'Processing',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- 4. Order_Items Table
CREATE TABLE IF NOT EXISTS Order_Items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(36) NOT NULL,
    product_id VARCHAR(36) NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE RESTRICT
);

-- Insert dummy Admin user (Optional, the user can change this via code or DB)
-- Note: Replace password_hash with an actual bcrypt hash before running if needed
-- INSERT INTO Users (user_id, full_name, email, password_hash, role) 
-- VALUES ('admin-uuid-1234', 'Admin User', 'admin@urbangents.com', '$2b$10$YourHashedPasswordHere', 'admin');
