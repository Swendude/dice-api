FROM node:20-slim

WORKDIR /server-dir

COPY . .

RUN ["npm", "install"]

RUN ["npm", "run", "build"]

CMD ["npm", "start"]

EXPOSE 3000