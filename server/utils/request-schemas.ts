import { z } from "zod";

export const tournamentTitleSchema = z.object({
  title: z
    .string()
    .min(1)
    .transform((val) => decodeURIComponent(val)),
});

export const getStageSchema = z.object({
  stage: z.enum(["group", "finals"]).optional(),
});

export const stageSchema = z.object({
  stage: z.enum(["group", "finals"]),
});


export const handleTournamentParameter = async (event: any) => {
  const { data, success } = await getValidatedRouterParams(
    event,
    tournamentTitleSchema.safeParse
  );
  if (!success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid tournament title",
    });
  }
  return data;
};

export const stageSchemaWithGroups = z.object({
  stage: z.enum(["group", "finals"]),
  groups: z.array(
    z.object({
      group: z.string(),
      teams: z.array(
        z.object({
          public_id: z.string(),
          name: z.string(),
        })
      ),
    })
  ),
});
