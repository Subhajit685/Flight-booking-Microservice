FROM node:alpine

WORKDIR /app/notification

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4003

CMD [ "npm", "run", "start" ]