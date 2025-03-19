FROM node:22-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./
COPY /apps/consumer/prisma prisma

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

FROM node:22-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production --legacy-peer-deps

COPY --chown=node:node --from=development /usr/src/app/prisma /app/prisma
COPY --chown=node:node --from=development /usr/src/app/src /app/src

USER node

CMD ["node", "dist/apps/consumer/main"]