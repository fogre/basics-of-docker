FROM node:lts-alpine

RUN apk add dumb-init

ENV NODE_ENV production
  
WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci --only=production

USER node

CMD ["dumb-init", "node", "./bin/www"]