export default defineEventHandler(async (event) => {
  return (await usePrisma().players.count()) ?? 0;
});
