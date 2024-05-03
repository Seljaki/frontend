FROM node:latest

WORKDIR /frontend

COPY . .

RUN npm install
RUN npm build

CMD [ "npm", "start" ]