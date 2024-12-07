# Dockerfile by Valentin Stamate
# Date 17.12.2023

FROM node:20-alpine as builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine as runner
WORKDIR /app
COPY env.mjs env.mjs
COPY next.config.mjs next.config.mjs
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json .
COPY --from=builder /app/package-lock.json .
EXPOSE 3000
ENTRYPOINT ["npm", "start"]
