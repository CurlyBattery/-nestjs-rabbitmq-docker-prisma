FROM node:alpine As development

RUN apk add --no-cache openssl

WORKDIR /usr/src/app

COPY  package*.json ./

COPY /apps/consumer/prisma ./prisma

COPY wait-for.sh ./
RUN chmod +x ./wait-for.sh

RUN npm install --legacy-peer-deps

RUN npx prisma generate