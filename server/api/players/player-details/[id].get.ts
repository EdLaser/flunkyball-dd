export default defineEventHandler(async (event) => {
  const publicID = getRouterParam(event, "id");

  const decodedId = decodeURIComponent(publicID ?? "");

  const playerDetails = await usePrisma(event).players.findUnique({
    select: {
      first_name: true,
      last_name: true,
      slogan: true,
      phone: true,
      public_id: true,
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

  const gamesPlayed = playerDetails?.teams
    ? playerDetails?.teams._count?.tournament_registrations
    : 0;

  const transformed = {
    firstName: playerDetails?.first_name ?? "",
    lastName: playerDetails?.last_name ?? "",
    slogan: playerDetails?.slogan ?? "",
    phone: playerDetails?.phone ?? "",
    publicID: playerDetails?.public_id ?? "",
    gamesPlayed: gamesPlayed,
  };

  return transformed;
});
