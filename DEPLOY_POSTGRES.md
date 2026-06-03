Postgres on Render — Setup & Deploy
=================================

This document shows how to switch the project from SQLite to Postgres on Render and ensure a smooth deployment.

1) Ensure requirements
- `dj-database-url` and `psycopg2-binary` are already in `backend/requirements.txt`.

2) Provision a managed Postgres on Render
- In the Render dashboard: New → Database → PostgreSQL → create a database.
- Copy the database URL (starts with `postgres://` or `postgresql://`).

3) Configure Render environment variables
- In your service (Web Service) settings, set these env vars:
  - `DATABASE_URL` = <the Postgres URL from Render>
  - `SECRET_KEY` = <generate a secret key>
  - `DEBUG` = False
  - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` (if using Cloudinary)

4) Release command (runs automatically if present)
- The repo already contains `render.yaml` with `releaseCommand`:
  ```bash
  cd backend && python manage.py migrate --noinput && python manage.py collectstatic --noinput
  ```
- The build/start/release commands must run from the `backend` folder because the Django project and requirements file live there.

5) Local testing with Postgres (optional)
- Quick with Docker:
  ```bash
  docker run --name pg-dev -e POSTGRES_PASSWORD=pass -p 5432:5432 -d postgres:15
  export DATABASE_URL=postgres://postgres:pass@localhost:5432/postgres
  cd backend
  pip install -r requirements.txt
  python manage.py migrate
  python manage.py runserver
  ```

6) Notes & best practices
- Do not commit secrets to the repo. Use Render dashboard env vars.
- After setting `DATABASE_URL`, Render will direct the app to Postgres. The `core/settings.py` already prefers `DATABASE_URL` when present.
- Keep `psycopg2-binary` in `backend/requirements.txt` for Render. It's already included.

7) Troubleshooting
- If you get `no such table` after deploy, ensure the `releaseCommand` ran successfully and that migrations completed without errors. Check deploy logs in Render.
- If static files are missing, ensure `collectstatic` ran and `STATIC_ROOT` is set (in `core/settings.py`). Consider enabling WhiteNoise (`USE_WHITENOISE=True`) for static serving.

If you want, I can: (A) automatically enable WhiteNoise in settings and update `requirements.txt`, or (B) create a script to run migrations and create a superuser non-interactively. Tell me which to do next.
