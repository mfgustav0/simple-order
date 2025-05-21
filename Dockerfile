FROM node:23.11.0-alpine3.20 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install -g @nestjs/cli@11.0.6

RUN npm install --omit=dev

COPY . .

RUN npm run build

FROM node:23.11.0-alpine3.20

WORKDIR /app

USER node

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

EXPOSE 3000

CMD ["node", "dist/main.js"]