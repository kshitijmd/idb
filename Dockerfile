FROM node:8

ADD . /app
# Create working directory for image
WORKDIR /app

RUN npm install

EXPOSE 80

CMD npm run dev
