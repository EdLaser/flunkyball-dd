import { PrismaClient } from "@@/prisma/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

let prismaClient: PrismaClient;

export const usePrisma = () => {
  if (!prismaClient) {
    prismaClient = new PrismaClient({
      log: ["warn", "error"],
      adapter,
    });
  }

  return prismaClient;
};
