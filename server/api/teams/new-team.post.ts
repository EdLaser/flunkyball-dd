import { z } from "zod";

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

export default defineEventHandler(async (event) => {
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
});
