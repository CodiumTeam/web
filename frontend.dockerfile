FROM node:16
WORKDIR /code

ADD package-lock.json package.json ./
RUN npm install
ADD . .

CMD ["npm", "run", "start"]
