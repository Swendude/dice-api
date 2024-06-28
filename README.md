# Dice Roll API

This is a simple express application using Prisma ORM. There are two endpoints:

- `GET /rolls` to retrieve an array of all the rolls in the system
- `GET /rolls?face={face: 100|20|12|10|8|6|4}&amount={n: number}` to roll `n` dice of face `face`

## run locally

Generate an image, for example

`docker build -t dice-api/latest .`

Using Docker, run an image like so:
`docker run -p 3000:3000 -v [NAME_OF_VOLUME]:/storage dice-api/latest`

Where `[NAME_OF_VOLUME]` is replaced by the name of a volume.
