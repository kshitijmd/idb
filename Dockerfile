FROM node:8

# Create working directory for image
WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 9000

CMD ["npm", "start"]
