#stage 1
FROM node:alpine as node
ENV NODE_OPTIONS=--openssl-legacy-provider
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
#stage 2
FROM nginx:alpine
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=node /app/dist/developer /usr/share/nginx/html
