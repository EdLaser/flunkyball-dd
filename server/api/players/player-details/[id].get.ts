export default defineEventHandler(async (event) => {
  const publicID = getRouterParam(event, "id");

  const decodedId = decodeURIComponent(publicID ?? "");

  const playerDetails = await usePrisma(event).players.findUnique({
    select: {
      first_name: true,
      last_name: true,
      slogan: true,
      phone: true,
      teams: {
        select: {
          _count: {
            select: {
              tournament_registrations: true,
            },
          },
        },
      },
    },
    where: {
      public_id: decodedId,
    },
  });

  return playerDetails;
});
