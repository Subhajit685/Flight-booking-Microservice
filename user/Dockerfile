FROM node:alpine

WORKDIR /app/user

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4004

CMD [ "npm", "run", "start" ]