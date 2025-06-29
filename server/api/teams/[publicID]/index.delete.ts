export default defineEventHandler(async (event) => {
  const { publicID } = await handleTeamIdParameter(event);

  try {
    const res = await usePrisma(event).teams.delete({
      where: {
        public_id: publicID,
      },
    });
    return { success: true, publicID: res.public_id };
  } catch (error) {
    console.error("Error deleting team:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to delete team",
    });
  }
});
