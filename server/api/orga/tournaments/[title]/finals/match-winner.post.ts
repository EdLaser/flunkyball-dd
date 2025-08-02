import { z } from "zod";

const matchWinnerSchema = z.object({
  matchId: z.string().uuid(),
  teamId: z.string().uuid(),
});

export default defineEventHandler(async (event) => {
  await handleTournamentParameter(event);

  const { success, data } = await readValidatedBody(
    event,
    matchWinnerSchema.safeParse
  );
  if (!success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid request body",
      data: data,
    });
  }

  const { matchId, teamId } = data;

  const updated = await usePrisma(event).matches.update({
    where: {
      match_id: matchId,
    },
    data: {
      teams_matches_match_winnerToteams: {
        connect: {
          id: teamId,
        },
      },
    },
    select: {
      match_id: true,
      teams_matches_home_team_idToteams: {
        select: {
          name: true,
          id: true,
        },
      },
      teams_matches_away_team_idToteams: {
        select: {
          name: true,
          id: true,
        },
      },
      teams_matches_match_winnerToteams: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });

  return updated;
});
