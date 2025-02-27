FROM node:23-alpine

WORKDIR /usr/src/app

COPY package.json .

RUN npm install -g typescript pnpm

COPY . .

RUN pnpm install --ignore-scripts

RUN npx turbo build --filter=ws...

EXPOSE 8080

CMD [ "npm", "run", "start:ws" ]
