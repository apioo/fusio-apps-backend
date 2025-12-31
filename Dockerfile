#stage 1
FROM node:22-alpine AS node
ENV NODE_OPTIONS=--openssl-legacy-provider
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
#stage 2
FROM nginx:alpine
ENV BASE_PATH=""
ENV API_URL=""
ENV APP_KEY=""
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/replace_env.sh /docker-entrypoint.d/replace_env.sh
RUN chmod +x /docker-entrypoint.d/replace_env.sh
COPY --from=node /app/dist/fusio/browser /usr/share/nginx/html
