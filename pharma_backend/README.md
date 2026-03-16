# PharmaManager Backend

## Installation

python -m venv venv
source venv/bin/activate

pip install -r requirements.txt

cp .env.example .env

python manage.py migrate
python manage.py runserver

Swagger:
http://localhost:8000/api/schema/swagger-ui/