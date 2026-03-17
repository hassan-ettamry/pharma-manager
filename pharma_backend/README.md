# PharmaManager Backend

Backend API for pharmacy management system built with Django REST Framework.

---

## 🚀 Tech Stack

- Python
- Django
- Django REST Framework
- PostgreSQL
- drf-spectacular (Swagger)

---

## ⚙️ Installation

cd pharma_backend
python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt

## 🔐 Environment Variables

Create .env file:

DEBUG=True
SECRET_KEY=your-secret-key

DB_NAME=pharma_db
DB_USER=postgres
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=5432

## 🛠️ Run the project

python manage.py migrate
python manage.py runserver

## 📄 API Documentation

Swagger available at:

http://127.0.0.1:8000/api/schema/swagger-ui/

## 📌 Main Features

### Medicaments
- CRUD operations
- Stock management
- Low stock alerts

### Categories
- CRUD categories
- Link with medicaments

### Sales (Ventes)
- Create sale with multiple items
- Automatic stock deduction
- Cancel sale → restore stock
- Total price calculation

## 🔗 API Endpoints

Method  | Endpoint                     | Description
--------|------------------------------|------------
GET     | /api/v1/medicaments/         | List medicaments
POST    | /api/v1/medicaments/         | Create medicament
GET     | /api/v1/categories/          | List categories
POST    | /api/v1/categories/          | Create category
GET     | /api/v1/ventes/              | List sales
POST    | /api/v1/ventes/              | Create sale
POST    | /api/v1/ventes/{id}/annuler/ | Cancel sale

## 👨‍💻 Author

Hassan Ettamry