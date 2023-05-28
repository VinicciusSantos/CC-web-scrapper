FROM node:18

# Instalar o Chromium, o Chromium WebDriver e o ffmpeg
RUN apt-get update \
    && apt-get install -y chromium chromium-driver ffmpeg

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Define o diretório de destino dos arquivos no contêiner
ENV APP_FILES_DIR /usr/src/app/public/downloads

# Cria a pasta para salvar os arquivos
RUN mkdir -p $APP_FILES_DIR

# Define a pasta como um volume no contêiner
VOLUME $APP_FILES_DIR

EXPOSE 3000

CMD [ "npm", "start" ]
