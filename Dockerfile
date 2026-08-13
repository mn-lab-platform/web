FROM node:26-alpine AS build
WORKDIR /app
COPY package*.json .
RUN npm ci && npm cache clean --force
COPY . .
RUN npm run build

FROM joseluisq/static-web-server:2-alpine
WORKDIR /public

COPY --from=build /app/dist /public

ENV SERVER_PORT=80
ENV SERVER_ROOT=/public
ENV SERVER_COMPRESSION=true 

EXPOSE 80