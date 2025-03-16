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
