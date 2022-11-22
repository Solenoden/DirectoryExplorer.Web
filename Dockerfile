ARG node_version
FROM node:$node_version as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build-prod

FROM nginx:latest
COPY --from=build-step /app/dist/DirectoryExplorerWeb /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 4200
CMD sed -i -e 's/4200/'"4200"'/g' /etc/nginx/conf.d/default.conf && envsubst </usr/share/nginx/html/environments/env.template.js> /usr/share/nginx/html/environments/env.js && nginx -g 'daemon off;'