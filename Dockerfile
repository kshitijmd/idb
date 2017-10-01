FROM node:8

ADD . /app
# Create working directory for image
WORKDIR /app

RUN npm install

EXPOSE 9000

CMD ["npm", "start"]
