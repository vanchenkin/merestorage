# Postgres для локальной разработки

1. Установить Docker
2. Создать где-нибудь файл docker-compose.yml
3. Вставить туда код ниже
4. Запустить командой ```docker compose up -d```

### docker-compose.yml
```
version: "3.9"
services:
  postgres:
    image: postgres:14
    environment:
      POSTGRES_DB: merestorage
      POSTGRES_USER: root
      POSTGRES_PASSWORD: root
      PGDATA: "/var/lib/postgresql/data/pgdata"
    volumes:
      - .:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U root -d merestorage"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 10s
    restart: unless-stopped

```