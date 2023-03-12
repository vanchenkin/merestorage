FROM node:18-alpine AS builder
WORKDIR /app

ARG PORT=3000

COPY . .

RUN yarn install --immutable --mode=skip-build

RUN yarn run build:back && \
    yarn prisma generate && \
    yarn prod-install dist && \
    ls -lah

FROM node:18-alpine AS runner
WORKDIR /app

COPY --from=builder /app/dist .
COPY --from=builder /app/node_modules ./node_modules

EXPOSE $PORT

CMD ["yarn", "node", "backend/src/main"]
