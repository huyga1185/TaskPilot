FROM node:22-alpine AS base
WORKDIR /app
COPY package-lock.json package.json ./

FROM base AS development
RUN npm ci
COPY . .
ENV NODE_ENV=development
ENV PORT=3000
EXPOSE ${PORT}
CMD ["npm", "run", "dev", "--", "--host"]

FROM base AS builder
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS production
WORKDIR /app
RUN apk add --no-cache tini
ENV NODE_ENV=production
ENV NITRO_PORT=80
ENV NITRO_HOST=0.0.0.0
COPY --from=builder /app/.output/ ./
# Drop root privileges for the runtime container.
RUN chown -R node:node /app
USER node
EXPOSE ${NITRO_PORT}
# Use tini as PID 1 so signals are forwarded and child processes are reaped.
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "/app/server/index.mjs"]
