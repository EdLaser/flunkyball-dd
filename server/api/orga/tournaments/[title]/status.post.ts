import { z } from "zod";

const changeStatusSchema = z.object({
  status: z.enum([
    'open',
    'finished',
    'in_progress',
  ]),
});

export default defineEventHandler(async (event) => {
  const { title } = await handleTournamentParameter(event);

  const { data, success } = await readValidatedBody(
    event,
    changeStatusSchema.safeParse
  );

  if (!success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid request body",
      data: data,
    });
  }

  try {
    const updated = await usePrisma(event).tournaments.update({
      where: { title },
      data: {
        status: data.status,
      },
      select: {
        title: true,
        status: true,
      },
    });
    if (!updated) {
      throw createError({
        statusCode: 404,
        statusMessage: "Tournament not found",
      });
    }

    return updated;
  } catch (error) {
    console.error("Error updating tournament status:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to update tournament status",
    });
  }
});
