FROM node:22.16.0-alpine
LABEL authors="marcus.sjoholm"

USER root
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
COPY .yarnrc.yml ./

RUN corepack enable
RUN yarn install

COPY ./dist ./dist

EXPOSE 3000
ENTRYPOINT ["node", "dist/index.js"]