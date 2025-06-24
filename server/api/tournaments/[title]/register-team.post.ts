import { z } from "zod";

const registerTeamForTournamentSchema = z.object({
  teamId: z.string().min(1, "Team ID ist erforderlich"),
});

export default defineEventHandler(async (event) => {
  const { title } = await handleTournamentParameter(event);

  const { data, success } = await readValidatedBody(
    event,
    registerTeamForTournamentSchema.safeParse
  );

  if (!success) {
    throw createError({
      statusCode: 400,
      data: "Ungültige Daten",
    });
  }

  try {
    const registration = await usePrisma(event).tournament_registrations.create(
      {
        data: {
          tournaments: {
            connect: {
              title,
            },
          },
          teams: {
            connect: {
              id: data.teamId,
            },
          },
        },
      }
    );

    return {
      success: true,
      registrationId: registration.registration_id,
      message: "Team erfolgreich für das Turnier registriert.",
    };
  } catch (error) {
    console.error("Fehler bei der Registrierung des Teams:", error);
    throw createError({
      statusCode: 500,
      data: "Fehler bei der Registrierung des Teams.",
    });
  }
});
