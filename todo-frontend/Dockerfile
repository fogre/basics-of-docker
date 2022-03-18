# BUILD STAGE
FROM node:lts-alpine AS build-stage

WORKDIR /usr/src/app

COPY . .

ENV NODE_ENV production

ENV REACT_APP_BACKEND_URL http://localhost:3001

RUN npm ci

RUN CI=true npm test

RUN npm run build

#Nginx serve
FROM nginx:1.20-alpine

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html