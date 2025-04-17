FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build


COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

EXPOSE 3001

CMD ["./entrypoint.sh"]