FROM node:18.14.0-alpine3.16 as builder

WORKDIR /home/soa/frontend

COPY package*.json ./
RUN CYPRESS_INSTALL_BINARY=0 npm ci && npm cache clear --force

COPY nx.json tsconfig.base.json ./
COPY libs libs
COPY apps apps
RUN npx nx run esports:build:production && rm -rf .angular .nx

FROM nginx:1.21.6-alpine AS runtime

COPY --from=builder /home/soa/frontend/dist/apps/esports /usr/share/nginx/www
COPY docker/ui/nginx/nginx.conf /etc/nginx/templates/default.conf.template
COPY docker/ui/nginx/includes/* /etc/nginx/templates/
