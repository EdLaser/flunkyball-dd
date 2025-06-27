import { PrismaClient } from "@prisma/client/edge.js";

let prismaClient: PrismaClient;

export const usePrisma = (event: any) => {
  if (!prismaClient) {
    prismaClient = new PrismaClient({
      log: ["warn", "error"],
    });
  }

  return prismaClient;
};
