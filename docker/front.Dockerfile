FROM node:18-alpine AS alpine
WORKDIR /app

COPY . .

RUN yarn install --immutable --mode=skip-build && \
    yarn run build && \
    ls -lah

FROM nginx:alpine

WORKDIR /app

COPY --from=alpine /app/dist/client ./static
COPY --from=alpine /app/docker/nginx.conf /etc/nginx/nginx.conf