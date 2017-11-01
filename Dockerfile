FROM node:8

LABEL maintainer="Prasanth Vaaheeswaran"

EXPOSE 3000

WORKDIR /app
COPY . /app

RUN npm i

CMD ["npm", "start"]
