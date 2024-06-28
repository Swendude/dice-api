FROM node:20

WORKDIR /server-dir

COPY . .

ENV DATABASE_URL="file:/storage/dev.db"

EXPOSE 3000

# Install deps
RUN ["npm", "install"]

# Mount a volume
VOLUME "/storage"

# Run build (`prisma db push` followed by `tsc`)
RUN ["npm", "run", "build"]

ENTRYPOINT ["npm", "run"]

CMD ["start"]


EXPOSE 3000