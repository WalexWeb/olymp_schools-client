FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 8080

RUN chmod -R 755 /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]