#stage 1
FROM node:18-alpine as node
ENV NODE_OPTIONS=--openssl-legacy-provider
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
#stage 2
FROM nginx:alpine
ENV BASE_PATH=""
ENV API_URL=""
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/replace_env.sh /docker-entrypoint.d/replace_env.sh
RUN chmod +x /docker-entrypoint.d/replace_env.sh
COPY --from=node /app/dist/fusio /usr/share/nginx/html
COPY --from=node /app/dist/fusio/index.html /usr/share/index.html
