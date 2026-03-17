# PharmaManager

Full-stack pharmacy management system built with Django REST Framework and React.

---

## 🚀 Project Overview

PharmaManager is a web application that allows pharmacists to:

- Manage medicaments
- Handle sales transactions
- Monitor stock levels
- Get alerts for low stock

This project was developed as part of a technical test.

---

## 🧰 Tech Stack

### Backend
- Django
- Django REST Framework
- PostgreSQL
- drf-spectacular (Swagger)

### Frontend
- React (Vite)
- Axios
- React Router

---

## 📁 Project Structure

```
pharma-manager/
├── pharma_backend/  # Django API
└── pharma_frontend/ # React app
```

---

## ⚙️ Setup Instructions

### 🔹 Backend

```bash
cd pharma_backend

python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt

python manage.py migrate
python manage.py runserver
```

Swagger:

```
http://127.0.0.1:8000/api/schema/swagger-ui/
```

---

### 🔹 Frontend

```bash
cd pharma_frontend

npm install
npm run dev
```

App:

```
http://localhost:5173
```

---

## ✅ Features

### Medicaments
- Add / update / delete medicaments
- Search and filter
- Stock management
- Low stock alerts

### Sales
- Create sales with multiple items
- Automatic stock deduction
- Cancel sale → restore stock

### Dashboard
- Overview of medicaments and sales

---

## 📌 API Endpoints

```
/api/v1/medicaments/
/api/v1/categories/
/api/v1/ventes/
```

---

## 🎯 Key Concepts Implemented

- Clean architecture (API / hooks / UI)
- Separation of concerns
- RESTful API design
- Nested serializers
- Transaction management
- Stock consistency logic

---

## 👨‍💻 Author

Hassan Ettamry