export default defineEventHandler(async (event) => {
  const players = await usePrisma(event).players.findMany({
    select: {
      first_name: true,
      last_name: true,
      public_id: true,
      teams: {
        select: {
          name: true,
        },
      },
    },
    where: {
      public_id: {
        not: {
          equals: null,
        },
      },
    },
  });
  return players.map((player) => ({
    firstName: player.first_name,
    lastName: player.last_name,
    publicId: player.public_id,
    playsIn: player.teams?.name ?? null,
  }));
});
