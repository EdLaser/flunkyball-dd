import { getStageSchema } from "~/server/utils/request-schemas.ts";

export default defineEventHandler(async (event) => {
  const { title } = await handleTournamentParameter(event);
  const { data } = await getValidatedRouterParams(
    event,
    getStageSchema.safeParse
  );

  if (data?.stage) {
    const stage = await usePrisma(event).tournaments.findUnique({
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
                  distinct: []
                }
              },
            },
          },
          where: {
            stage_name: data.stage,
          },
        },
      },
    });
  }
});
