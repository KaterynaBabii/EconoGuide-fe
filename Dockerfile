FROM node:18-alpine as build

WORKDIR /app

ARG REACT_APP_GCP_PROJECT_ID
ARG REACT_APP_API_URL
ARG REACT_APP_ENVIRONMENT=production

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"] 