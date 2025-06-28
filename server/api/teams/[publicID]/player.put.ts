import { z } from "zod";

const addPlayerSchema = z.object({
  playerPublicID: z.array(z.string().min(5)),
});

export default defineEventHandler(async (event) => {
  const { publicID } = await handleTeamIdParameter(event);

  const { data, success } = await readValidatedBody(
    event,
    addPlayerSchema.safeParse
  );
  if (!success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid player public ID",
    });
  }
  const team = await usePrisma(event).teams.findUnique({
    where: {
      public_id: publicID,
    },
    select: {
      public_id: true,
      id: true,
      _count: {
        select: {
          players: true,
        },
      },
    },
  });

  if (!team || !team.public_id) {
    throw createError({
      statusCode: 404,
      statusMessage: "Team not found",
    });
  }

  if (team._count.players >= 2) {
    throw createError({
      statusCode: 400,
      statusMessage: "Team already has 2 players",
    });
  }

  try {
    const player = await usePrisma(event).players.updateMany({
      where: {
        public_id: {
          in: data.playerPublicID,
        },
      },
      data: {
        plays_in: {
          set: team.id,
        },
      },
    });

    if (!player.count || player.count === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: "Player not found",
      });
    }

    return {
      success: true,
      count: player.count,
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to add player to team",
    });
  }
});
