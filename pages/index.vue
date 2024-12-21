<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm">
      <div class="container mx-auto py-6">
        <h1 class="text-4xl font-bold text-center text-primary">
          Flunkyball-Turniere Dresden
        </h1>
      </div>
    </header>

    <main class="container mx-auto px-4">
      <!-- Hero Section -->
      <section class="text-center py-20">
        <h2 class="text-5xl font-extrabold mb-4 text-gray-800">
          Erlebe den Nervenkitzel von Flunkyball!
        </h2>
        <p class="text-xl mb-8 text-gray-600">
          Nimm an actiongeladenen Turnieren voller Spaß, Sport und einer Prise
          Chaos teil.
        </p>
        <Button class="px-6 py-3 rounded-lg">
          Jetzt Anmelden
        </Button>
      </section>

      <!-- About the Game -->
      <section class="py-16">
        <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">
          Was ist Flunkyball?
        </h2>
        <div class="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p class="text-lg mb-4 text-gray-600">
              Flunkyball ist ein aufregender Sport, bei dem zwei Teams mit
              jeweils zwei Spielern gegeneinander antreten, indem sie eine
              Flasche auf eine Flasche in der Mitte des Spielfelds werfen.
            </p>
            <ul class="list-disc list-inside space-y-2 text-gray-600">
              <li>
                Wenn du die mittlere Flasche triffst, darf dein Team trinken!
              </li>
              <li>
                Das andere Team muss die Flasche aufstellen und zur Grundlinie
                zurückkehren.
              </li>
              <li>Das Team, das zuerst alle Biere geleert hat, gewinnt!</li>
            </ul>
          </div>
          <div class="relative h-64 md:h-full">
            <NuxtImg
              src="/img/start-throw.jpeg"
              alt="Flunkyball-Spiel in Aktion"
              class="rounded-lg object-cover h-full w-full"
            />
          </div>
        </div>
      </section>

      <!-- Upcoming Tournament -->
      <section class="py-16">
        <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">
          Anstehendes Turnier
        </h2>
        <TournamentCard
          :tournament="tournament"
          v-for="tournament in upcomingTournaments"
        />
      </section>

      <!-- Past Tournament Results -->
      <section class="py-16">
        <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">
          Ergebnisse vergangener Turniere
        </h2>
        <div class="grid md:grid-cols-3 gap-6">
          <Card
            :key="index"
            class="bg-white"
            v-for="(tournament, index) in pastTournaments"
          >
            <CardHeader>
              <CardTitle class="flex items-center text-primary">
                <Trophy class="mr-2" />
                {{ tournament.name }}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-gray-600">
                <strong>Gewinner:</strong> {{ tournament.winner }}
              </p>
              <p class="text-gray-600">
                <strong>Datum:</strong> {{ tournament.date }}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <!-- Team Overview -->
      <section class="py-16">
        <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">
          Antretende Teams
        </h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            :key="`${index}-${team.name}`"
            class="bg-white"
            v-for="(team, index) in teams"
          >
            <CardHeader>
              <CardTitle class="flex items-center text-primary">
                <Users class="mr-2" />
                {{ team.name }}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-gray-600">
                <strong>Mitglieder:</strong> {{ team.members.join(", ") }}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <!-- Registration CTA -->
      <section class="text-center py-20">
        <h2 class="text-4xl font-bold mb-4 text-gray-800">
          Bereit, dabei zu sein?
        </h2>
        <p class="text-xl mb-8 text-gray-600">
          Melde dich jetzt für unser bevorstehendes Flunkyball-Turnier an und
          zeig deine Wurfkünste!
        </p>
        <Button
          class="px-6 py-3 rounded-lg flex items-center justify-center mx-auto"
        >
          <BeerIcon class="mr-2" />
          Melde dein Team an
        </Button>
      </section>
    </main>

    <footer class="bg-primary text-white py-8">
      <div class="container mx-auto text-center">
        <p>&copy; Edi Z, Ruben K. All Beers reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { BeerIcon, Users, Trophy } from "lucide-vue-next";

const {
  data: upcomingTournaments,
  status,
  error,
} = useFetch("/api/upcoming-tournaments", {
  transform: (data) => ({
    ...data.map((tournament) => ({
      tournamentDate: new Date(tournament.tournament_date).toLocaleString(
        "de-DE"
      ),
      ...tournament,
    })),
  }),
});

const pastTournaments = ref([
  { name: "Spring Fling Flunky", winner: "Bottle Rockets", date: "April 2023" },
  {
    name: "Winter Wonderland Flunky",
    winner: "Ice Cold Slingers",
    date: "Januar 2023",
  },
  { name: "Autumn Bottle Bash", winner: "Leaf Lobbers", date: "Oktober 2022" },
]);

const teams = ref([
  { name: "Bottle Bashers", members: ["Alice", "Bob"] },
  { name: "Flunky Fanatics", members: ["Charlie", "Diana"] },
  { name: "Tipsy Tossers", members: ["Eve", "Frank"] },
  { name: "Sling Kings", members: ["Grace", "Henry"] },
  { name: "Bottle Battlers", members: ["Ivy", "Jack"] },
  { name: "Chaos Crew", members: ["Kate", "Liam"] },
]);
</script>
