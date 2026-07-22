# Library Management System 📚

A full-stack, beginner-friendly Library Management System built with **React.js**, **Node.js (Express.js)**, and **MySQL**.

---

## 📁 Project Structure

```text
library_mgmt_system/
├── backend/                  # Express.js API & MySQL Backend
│   ├── config/               # Database connection configurations
│   ├── controllers/          # Request handlers and business logic
│   ├── database/             # SQL scripts for table schemas & seed data
│   ├── middleware/           # Custom Express middlewares (error handling, etc.)
│   ├── models/               # MySQL database queries and data operations
│   ├── routes/               # API route definitions
│   ├── utils/                # Utility helpers (e.g., standard response formatters)
│   ├── .env.example          # Environment variables template
│   ├── .gitignore            # Git ignore file for backend
│   ├── app.js                # Express app configuration & middleware setup
│   ├── package.json          # Backend dependencies & npm scripts
│   └── server.js             # Entry point to start HTTP server
│
├── frontend/                 # React.js (Vite) Single Page Application
│   ├── public/               # Static assets served directly
│   ├── src/
│   │   ├── assets/           # Dynamic assets (styles, images, icons)
│   │   ├── components/       # Reusable UI components (Navbar, Cards, Footer)
│   │   ├── hooks/            # Custom React hooks
│   │   ├── layouts/          # Page layout components (MainLayout)
│   │   ├── pages/            # Main application views (Home, Books, Dashboard)
│   │   ├── services/         # API integration services (Axios / Fetch)
│   │   ├── utils/            # Helper functions & constants
│   │   ├── App.jsx           # Main App component & route mapping
│   │   ├── index.css         # Global application styling
│   │   └── main.jsx          # React entry point mounting to DOM
│   ├── .env.example          # Frontend environment variables template
│   ├── .gitignore            # Git ignore file for frontend
│   ├── index.html            # Main HTML document template
│   ├── package.json          # Frontend dependencies & npm scripts
│   └── vite.config.js        # Vite build tool configuration
│
└── README.md                 # Project overview and setup documentation
```

---

## 🚀 Quick Start Guide

### 1. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Configure your MySQL credentials in .env
# Import backend/database/schema.sql into your MySQL server
npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

---

## 🗄️ Database Setup
Execute the SQL script located in `backend/database/schema.sql` inside MySQL Workbench or MySQL CLI to create the necessary database and tables.
