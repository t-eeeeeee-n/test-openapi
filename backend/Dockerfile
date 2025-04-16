FROM node:18

WORKDIR /app

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

RUN npx prisma migrate deploy

# tsoaのルート生成
RUN npm run tsoa:gen

EXPOSE 3001

CMD ["npm", "run", "dev"]
