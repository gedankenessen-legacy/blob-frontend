# Build
FROM node:12.18-alpine3.12 AS build
WORKDIR /usr/src/app
COPY ["Blob/Blobpackage.json", "Blob/package-lock.json", "Blob/./"]
RUN npm install
COPY . .
RUN npm run build

# Run
FROM nginx:alpine
# COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/Blob /usr/share/nginx/html
