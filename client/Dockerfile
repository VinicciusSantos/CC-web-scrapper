FROM node:14

RUN npm install -g @angular/cli 

WORKDIR /usr/src/client

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4200

CMD ng serve --host 0.0.0.0 