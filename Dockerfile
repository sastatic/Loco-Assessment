FROM node:18
WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .
RUN touch .env

RUN npx prisma generate
RUN npx prisma migrate deploy

EXPOSE 3000

CMD ["npm", "start"]
