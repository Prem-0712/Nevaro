run:
	python manage.py runserver 0.0.0.0:8000

makemigrations:
	python manage.py makemigrations

migrate:
	python manage.py migrate

i:
	uv pip install --system $(pkg)

debug:
	python -m debugpy --listen 0.0.0.0:5678 manage.py runserver 0.0.0.0:8000

seed:
	python manage.py seed_users

flush:
	python manage.py flush --noinput

load:
	python manage.py loaddata ./full_data.json