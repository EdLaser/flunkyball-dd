import { usePrisma } from "~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  const tournaments = await usePrisma(event).tournaments.findMany({
    select: {
      title: true,
      description: true,
      price: true,
      tournament_date: true,
      location: true,
    },
    where: {
      tournament_date: {
        gte: new Date(),
      },
    },
  });

  return tournaments ?? [];
});
