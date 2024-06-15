FROM node:20

WORKDIR /server-dir

COPY . .

ENV DATABASE_URL="file:../storage/dev.db"

EXPOSE 3000:3000

RUN ["npm", "install"]

RUN ["npm", "run", "build"]

VOLUME [ "/storage" ]

CMD ["sh", "run.sh"]


EXPOSE 3000