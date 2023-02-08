FROM node:18.14.0-alpine3.16

ARG BUILD_COMMAND

WORKDIR /home/soa/backend

COPY package*.json ./
RUN CYPRESS_INSTALL_BINARY=0 npm ci && npm cache clear --force

COPY nx.json tsconfig.base.json ./
COPY libs libs
COPY apps apps

RUN ${BUILD_COMMAND} && rm -rf .angular .nx

