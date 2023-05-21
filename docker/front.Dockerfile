FROM node:18-alpine AS alpine
WORKDIR /app

ARG VITE_API_URL

COPY . .

RUN yarn install --immutable

RUN yarn prisma generate && \
    yarn run build:front

FROM nginx:alpine

WORKDIR /app

COPY --from=alpine /app/dist/client ./static
COPY --from=alpine /app/docker/nginx.conf /etc/nginx/nginx.conf