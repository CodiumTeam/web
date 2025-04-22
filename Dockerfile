FROM node:16 AS builder

WORKDIR /code

COPY .npmrc package-lock.json package.json ./
RUN npm install
COPY . .
RUN npm run build

VOLUME ["/code"]


FROM nginx AS server

COPY --from=builder /code/dist /usr/share/nginx/html
