export default defineEventHandler(async (event) => {
  return (await usePrisma(event).players.count()) ?? 0;
});
