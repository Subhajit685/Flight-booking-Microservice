FROM node:alpine

WORKDIR /app/airplane

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4001

CMD [ "npm", "run", "start" ]
