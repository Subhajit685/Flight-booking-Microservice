FROM node:alpine

WORKDIR /app/booking

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4002

CMD [ "npm", "run", "start" ]