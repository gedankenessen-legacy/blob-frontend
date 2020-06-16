# Build
FROM node:12.18-alpine3.12 AS build
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json", "./"]
RUN npm install
COPY . .
RUN npm run build

# Run
FROM nginx:alpine
# COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/blob /usr/share/nginx/html
