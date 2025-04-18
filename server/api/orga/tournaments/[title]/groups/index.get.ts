export default defineEventHandler(async (event) => {
  const { title } = await handleTournamentParameter(event);

  const groupStage = await usePrisma(event).groups.findMany({
    where: {
      tournaments: {
        title,
      },
      stages: {
        stage_name: "group",
      },
    },
    select: {
      group_name: true,
      is_finalized: true,
      group_registrations: {
        select: {
          teams: {
            select: {
              public_id: true,
              name: true,
              players: {
                select: {
                  first_name: true,
                  last_name: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return groupStage;
});
