FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 5005

CMD ["sh", "-c", "npx prisma migrate dev && node index.js"]