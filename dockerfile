FROM node:10-stretch
RUN mkdir /code
COPY . /code
WORKDIR /code
RUN npm i

CMD nodemon index.js