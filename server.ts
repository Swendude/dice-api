import express from "express";
import { z } from "zod";
import { PrismaClient, Prisma } from "@prisma/client";

const app = express();
const port = process.env.PORT || 3000;

const DiceValidator = z.object({
  face: z.coerce
    .number()
    .pipe(
      z.union([
        z.literal(100),
        z.literal(20),
        z.literal(12),
        z.literal(10),
        z.literal(8),
        z.literal(6),
        z.literal(4),
      ])
    ),
  amount: z.coerce.number().gt(0),
});

type result = number[];
type problem = { message: string; error?: any };

const prisma = new PrismaClient();

app.get("/roll", async (req, res: express.Response<result | problem>) => {
  const parsedQuery = DiceValidator.safeParse(req.query);
  if (!parsedQuery.success) {
    res
      .status(400)
      .send({ message: "Error in query", error: parsedQuery.error.flatten() });
  } else {
    const result = [
      ...new Array(parsedQuery.data.amount).fill(0).map((i) => {
        return Math.ceil(Math.random() * parsedQuery.data.face);
      }),
    ];
    await prisma.roll.create({
      data: {
        result: JSON.stringify(result),
      },
    });
    res.send(result);
  }
});

app.get(
  "/rolls",
  async (req, res: express.Response<Prisma.RollGetPayload<{}>[]>) => {
    const lastRolls = await prisma.roll.findMany({
      take: 20,
    });
    res.send(lastRolls);
  }
);

app.listen(port, () => {
  console.log(`Dice Roll app listening on port ${port}`);
});
