FROM node:lts-alpine

WORKDIR /usr/src/app

COPY . .

ENV REACT_APP_BACKEND_URL http://localhost:3001

RUN npm install

CMD ["npm", "start"]