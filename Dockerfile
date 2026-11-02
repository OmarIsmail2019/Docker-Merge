# FROM node:18
# WORKDIR /app
# COPY package*.json .
# ARG NODE_ENV
# RUN if [ "$NODE_ENV" = "production" ]; \
#     then npm install --only=production; \
#     else npm install; \
#     fi
# COPY . .
# EXPOSE 3000
# CMD ["npm" , "run" , "start-dev"]


# This is a multi-stage Dockerfile that builds two separate images for development and production environments. 
# The first stage is for development, where it installs all dependencies and runs the application in development mode.
# The second stage is for production, where it only installs production dependencies and runs the application in production mode.
# the base image is the same for both stages, which is the official Node.js 18 image.
FROM node:18 as base



FROM base as development
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm" , "run" , "start-dev"]

FROM base as production
WORKDIR /app
COPY package*.json .
RUN npm install --only=production
COPY . .
EXPOSE 3000
CMD ["npm" , "start"]