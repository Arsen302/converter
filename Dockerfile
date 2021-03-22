FROM node:latest

WORKDIR /src/index

COPY package*.json ./

RUN npm install
# RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD [ "node", "build/index.js" ]