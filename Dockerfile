# Use official Node.js LTS image
FROM node:18-alpine

WORKDIR /usr/src/app
COPY package.json package.json
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
