FROM node:16 AS builder

USER node

WORKDIR /code

COPY --chown=node:node .npmrc package-lock.json package.json ./
RUN npm install
COPY --chown=node:node . .
RUN npm run build

VOLUME ["/code", "/code/node_modules"]


FROM nginx AS server

COPY --from=builder /code/dist /usr/share/nginx/html
