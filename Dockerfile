# Build step #1: build the React frontend
FROM node:alpine as frontend-builder
WORKDIR /frontend
COPY ./frontend/ /frontend/
RUN npm install && npm run build

# Build step #2: build the backend API with the frontend as static files
FROM python:3.10-slim

WORKDIR /app/
COPY --from=frontend-builder /frontend/build/ /app/frontend/build/

# Move all static files other than index.html to root (for whitenoise middleware)
WORKDIR /app/frontend/build
RUN mkdir root && mv *.ico *.json root

WORKDIR /app
COPY ./backend/ /app/
RUN pip3 install --upgrade pip -r requirements.txt

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV DJANGO_SETTINGS_MODULE=backend.settings.prod

ARG PORT
ENV PORT=$PORT
EXPOSE $PORT

RUN python manage.py collectstatic --noinput

RUN ["chmod", "+x", "/app/entrypoint.sh"]
ENTRYPOINT ["/app/entrypoint.sh"]