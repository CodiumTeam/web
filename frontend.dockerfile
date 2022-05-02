FROM node:16
WORKDIR /code

ADD package-lock.json package.json ./
RUN npm i

CMD ["npm", "run", "start"]
