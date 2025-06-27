import { z } from "zod";
import { handleTeamIdParameter } from "~/server/utils/request-schemas";

const removePlayerSchema = z.object({
  playerPublicID: z.string().min(5),
});

export default defineEventHandler(async (event) => {
  const { publicID } = await handleTeamIdParameter(event);

  const { data, success } = await readValidatedBody(
    event,
    removePlayerSchema.safeParse
  );
  if (!success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid player public ID",
    });
  }

  const res = await usePrisma(event).teams.findUnique({
    where: {
      public_id: publicID,
    },
    select: {
      public_id: true,
      players: {
        where: {
          public_id: data.playerPublicID,
        },
        select: {
          public_id: true,
        },
      },
    },
  });

  if (!res || !res.public_id) {
    throw createError({
      statusCode: 404,
      statusMessage: "Team not found",
    });
  }

  if (res.players.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: "Player not found in the team",
    });
  }

  try {
    const res = await usePrisma(event).players.update({
      where: {
        public_id: data.playerPublicID,
      },
      data: {
        plays_in: {
          set: null, // Remove the player from the team
        },
      },
    });
    return res.public_id
      ? { success: true }
      : createError({
          statusCode: 404,
          statusMessage: "Player not found or not part of the team",
        });
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to remove player from team",
    });
  }
});
