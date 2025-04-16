FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# tsoaのルート生成
RUN npm run tsoa:gen

EXPOSE 3001
CMD ["npm", "run", "dev"]
