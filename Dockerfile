# Pull official base image
FROM node:lts-alpine AS BUILD_IMAGE

# Install build dependencies
RUN apk --no-cache add --virtual builds-deps build-base python

# Set working directory
WORKDIR /usr/src/app

# Copy package.json & package-lock.json files
COPY package*.json ./

# Install NPM packages
RUN npm install

# Copy source files
COPY . .

# Build
RUN npm run build

# Remove development dependencies
RUN npm prune --production

# Main Image
FROM nginx:alpine 

# Copy from build image
COPY --from=BUILD_IMAGE  /usr/src/app/build /usr/share/nginx/html

#copy from the conf file to set the refresh issue in ngnix 
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]