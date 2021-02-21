FROM node:14
RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm rebuild bcrypt --build-from-source
COPY . .
RUN cd /app/client && npm install
RUN cd /app/client && npm run build
RUN cd /app

CMD ["npm", "start"]
