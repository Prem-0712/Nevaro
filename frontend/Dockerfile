FROM node:lts-bookworm

WORKDIR /workspace/frontend

COPY package.json package-lock.json ./

RUN npm install -g npm@11.11.0 && \
    npm ci

COPY . .

CMD [ "sleep", "infinity" ]