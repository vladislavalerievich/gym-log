FROM python:3.10-slim

# Adding backend directory to make absolute filepaths consistent across services
WORKDIR /app/backend

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install Python dependencies
COPY requirements.txt /app/backend
RUN pip3 install --upgrade pip -r requirements.txt

COPY . /app/backend

ENV PORT 8000
EXPOSE 8000

RUN ["chmod", "+x", "/app/backend/entrypoint.sh"]
ENTRYPOINT ["/app/backend/entrypoint.sh"]
