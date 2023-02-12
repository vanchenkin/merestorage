FROM node:18-alpine AS builder
WORKDIR /app

ARG PORT=3000
ARG VITE_API_URL

COPY . .

RUN yarn install --immutable --mode=skip-build && \
    yarn run build && \
    yarn prod-install dist && \
    ls -lah

FROM node:18-alpine AS runner
WORKDIR /app

COPY --from=builder /app/dist .

EXPOSE $PORT

CMD ["yarn", "node", "backend/src/main"]
