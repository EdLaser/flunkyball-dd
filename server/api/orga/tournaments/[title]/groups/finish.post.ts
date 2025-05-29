import { z } from "zod";

const groupIdSchema = z.object({
  groupId: z.string().min(1, "Group ID is required"),
});

export default defineEventHandler(async (event) => {
  const { data, success } = await readValidatedBody(
    event,
    groupIdSchema.safeParse
  );

  if (!success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid group ID",
      data: data,
    });
  }

  const { groupId } = data;

  const groupPhase = await usePrisma(event).matches.groupBy({
    by: ["match_winner"],
    where: {
      groups: {
        group_id: groupId,
      },
    },
    _count: {
      match_winner: true,
    },
    orderBy: {
      _count: {
        match_winner: "desc",
      },
    },
    take: 1,
  });

  console.log(
    "Group Phase:",
    groupPhase.map((item) => ({
      winner: item.match_winner,
      count: item._count.match_winner,
    }))
  );
});
