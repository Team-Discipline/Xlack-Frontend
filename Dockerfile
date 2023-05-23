FROM node:16-alpine

WORKDIR /app

COPY package.json ./

RUN apk update && apk add bash

RUN npm install --save --legacy-peer-deps
RUN npm install -g serve

COPY ./ ./

RUN npm run build

EXPOSE 3000

CMD ["serve","-l","3000","-s","/app/build"]
