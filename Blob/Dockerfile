# Build
FROM node:12.18-alpine3.12 AS build
WORKDIR /usr/src/app
COPY ["Blob/package.json", "Blob/package-lock.json", "./"]
RUN npm install
COPY Blob/ .
RUN npm run build

# Run
FROM nginx:alpine
# COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/Blob /usr/share/nginx/html
