import { z } from "zod";

const createOrAssignTeamQuery = z.object({
  "create-team": z
    .string()
    .optional()
    .refine((val) => {
      return val === "true";
    }),
});

const newTeamSchema = z.object({
  name: z.string().min(2, {
    message: "Team name must be at least 2 characters.",
  }),
  slogan: z.string().max(100, {
    message: "Team Slogan must be less than 100 characters.",
  }),
  member1: z.object({
    firstName: z.string().min(2, {
      message: "Member name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
      message: "Member name must be at least 2 characters.",
    }),
    slogan: z.string().max(100, {
      message: "Member Slogan must be less than 100 characters.",
    }),
  }),
  member2: z.object({
    firstName: z.string().min(2, {
      message: "Member name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
      message: "Member name must be at least 2 characters.",
    }),
    slogan: z.string().max(100, {
      message: "Member Slogan must be less than 100 characters.",
    }),
  }),
});

const playersToTeamsSchema = z.object({
  teamPublicId: z.string().min(4),
  player1: z.object({
    publicID: z.string().min(4),
  }),
  player2: z.object({
    publicID: z.string().min(4),
  }),
});

export default defineEventHandler(async (event) => {
  const { data: queryData } = await getValidatedQuery(
    event,
    createOrAssignTeamQuery.safeParse
  );

  if (queryData?.["create-team"]) {
    const { data, success } = await readValidatedBody(
      event,
      newTeamSchema.safeParse
    );

    if (!success) {
      throw createError({
        statusCode: 400,
        message: "Invalid input data",
      });
    }
    try {
      const team = await usePrisma(event).teams.create({
        data: {
          name: data.name,
          slogan: data.slogan,
          players: {
            create: [
              {
                first_name: data.member1.firstName,
                last_name: data.member1.lastName,
                slogan: data.member1.slogan,
              },
              {
                first_name: data.member2.firstName,
                last_name: data.member2.lastName,
                slogan: data.member2.slogan,
              },
            ],
          },
        },
      });
      return team;
    } catch (error) {
      console.error("Error creating team:", error);
      throw createError({
        statusCode: 500,
        message: "Failed to create team: " + error,
      });
    }
  } else {
    const { data, success } = await readValidatedBody(
      event,
      playersToTeamsSchema.safeParse
    );

    if (!success) {
      throw createError({
        statusCode: 400,
        message: "Invalid input data",
      });
    }
    const team = await usePrisma(event).teams.findUnique({
      where: {
        public_id: data.teamPublicId,
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

    if (!team) {
      throw createError({
        statusCode: 404,
        data: "Team nicht gefunden.",
      });
    }

    try {
      const players = await usePrisma(event).players.updateManyAndReturn({
        where: {
          public_id: {
            in: [data.player1.publicID, data.player2.publicID],
          },
        },
        data: {
          plays_in: {
            set: team.id,
          },
        },
      });
      return players.length;
    } catch (error) {
      console.error("Error assigning players to team:", error);
      throw createError({
        statusCode: 500,
        message: "Failed to assign players to team: " + error,
      });
    }
  }
});
