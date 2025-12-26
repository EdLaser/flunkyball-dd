import { getStageSchema } from "@@/server/utils/request-schemas";

export default defineEventHandler(async (event) => {
  const { title } = await handleTournamentParameter(event);
  const { data } = await getValidatedQuery(
    event,
    getStageSchema.safeParse
  );

  if (data?.stage) {
    const stage = await usePrisma().tournaments.findUnique({
      where: {
        title: title,
      },
      select: {
        stages: {
          select: {
            stage_name: true,
            groups: {
              select: {
                group_name: true,
                matches: {
                  distinct: [],
                },
              },
            },
          },
          where: {
            stage_name: data.stage,
          },
        },
      },
    });

    return stage;
  } else {
    const stages = await usePrisma().tournaments.findUnique({
      where: {
        title: title,
      },
      select: {
        stages: {
          select: {
            stage_name: true,
            groups: {
              select: {
                group_name: true,
                matches: {
                  distinct: [],
                },
              },
            },
          },
        },
      },
    });

    return stages;
  }
});
