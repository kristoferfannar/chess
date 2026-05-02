FROM oven/bun AS builder
WORKDIR /app
COPY package.json  ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
CMD ["node", "server.js"]
