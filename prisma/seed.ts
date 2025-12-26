import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import Papa from "papaparse";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  }),
});

// CSV parsing helper using PapaParse
function parseCSV(csvContent: string): Record<string, any>[] {
  const result = Papa.parse(csvContent, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: false,
    transform: (value, header) => {
      // Handle null/empty values
      if (value === "" || value === null || value === undefined) {
        return null;
      }
      // Handle date values
      if (header.includes("date") || header === "created_at") {
        return new Date(value);
      }
      return value;
    },
  });

  return result.data as Record<string, any>[];
}

async function main() {
  console.log("🌱 Starting seed...");

  // Read CSV files
  const testTournamentDir = join(__dirname, "..", "test-tournament");

  const tournamentCSV = readFileSync(
    join(testTournamentDir, "tournament.csv"),
    "utf-8"
  );
  const teamsCSV = readFileSync(join(testTournamentDir, "teams.csv"), "utf-8");
  const playersCSV = readFileSync(
    join(testTournamentDir, "players.csv"),
    "utf-8"
  );
  const registrationsCSV = readFileSync(
    join(testTournamentDir, "registrations.csv"),
    "utf-8"
  );

  // Parse CSV data
  const tournamentData = parseCSV(tournamentCSV);
  const teamsData = parseCSV(teamsCSV);
  const playersData = parseCSV(playersCSV);
  const registrationsData = parseCSV(registrationsCSV);

  console.log(`📋 Parsed ${tournamentData.length} tournament(s)`);
  console.log(`👥 Parsed ${teamsData.length} teams`);
  console.log(`🎮 Parsed ${playersData.length} players`);
  console.log(`📝 Parsed ${registrationsData.length} registrations`);

  // 1. Create location first (required for tournament)
  console.log("\n📍 Creating location...");
  const location = await prisma.locations.upsert({
    where: { location_id: "1e8d144e-dacc-404a-a9d8-33cff019cb4d" },
    update: {},
    create: {
      location_id: "1e8d144e-dacc-404a-a9d8-33cff019cb4d",
      name: "Test Location",
      street: "Teststraße",
      city: "Berlin",
      postal_code: "10115",
      house_number: "1",
      description: "Test tournament location",
      directions: "Turn left at the beer garden",
      created_at: new Date(),
    },
  });
  console.log(`✅ Location created: ${location.name}`);

  // 2. Create tournament
  console.log("\n🏆 Creating tournament...");
  for (const tournament of tournamentData) {
    await prisma.tournaments.upsert({
      where: { id: tournament.id },
      update: {},
      create: {
        id: tournament.id,
        title: tournament.title,
        description: tournament.description,
        tournament_date: tournament.tournament_date,
        price: tournament.price,
        created_at: tournament.created_at,
        status: tournament.status as any,
        location_id: tournament.location_id,
      },
    });
    console.log(`✅ Tournament created: ${tournament.title}`);
  }

  // 3. Create teams
  console.log("\n👥 Creating teams...");
  for (const team of teamsData) {
    await prisma.teams.upsert({
      where: { id: team.id },
      update: {},
      create: {
        id: team.id,
        name: team.name,
        slogan: team.slogan,
        created_at: team.created_at,
        public_id: team.public_id,
      },
    });
  }
  console.log(`✅ Created ${teamsData.length} teams`);

  // 4. Create players
  console.log("\n🎮 Creating players...");
  for (const player of playersData) {
    await prisma.players.upsert({
      where: { id: player.id },
      update: {},
      create: {
        id: player.id,
        created_at: player.created_at,
        first_name: player.first_name,
        last_name: player.last_name,
        slogan: player.slogan,
        plays_in: player.plays_in,
        public_id: player.public_id,
        phone: player.phone,
      },
    });
  }
  console.log(`✅ Created ${playersData.length} players`);

  // 5. Create tournament registrations
  console.log("\n📝 Creating tournament registrations...");
  for (const registration of registrationsData) {
    await prisma.tournament_registrations.upsert({
      where: { registration_id: registration.registration_id },
      update: {},
      create: {
        registration_id: registration.registration_id,
        created_at: registration.created_at,
        tournament_id: registration.tournament_id,
        team_id: registration.team_id,
      },
    });
  }
  console.log(
    `✅ Created ${registrationsData.length} tournament registrations`
  );

  console.log("\n🎉 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
