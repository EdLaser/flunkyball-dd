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
        <Button class="px-6 py-3 rounded-lg"> Jetzt Anmelden </Button>
      </section>

      <!-- About the Game -->
      <section class="py-16">
        <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">
          Was ist Flunkyball?
        </h2>
        <div class="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <p class="text-lg mb-4 text-gray-600">
              Flunkyball ist ein aufregender Sport, bei dem zwei Teams mit
              jeweils zwei Spielern gegeneinander antreten, indem sie eine
              Flasche auf eine Flasche in der Mitte des Spielfelds werfen.
            </p>
            <ul class="space-y-2 text-gray-600">
              <li class="flex items-center">
                <BeerIcon class="text-primary inline-block mr-2 h-6 w-6" />
                Wenn du die mittlere Flasche triffst, darf dein Team trinken!
              </li>
              <li class="flex items-center">
                <BeerIcon class="text-primary inline-block mr-2 h-6 w-6" />
                Das andere Team muss die Flasche aufstellen und zur Grundlinie
                zurückkehren.
              </li>
              <li class="flex items-center">
                <BeerIcon class="text-primary inline-block mr-2 h-6 w-6" />
                Das Team, das zuerst alle Biere geleert hat, gewinnt!
              </li>
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
        <div class="space-y-4">
          <TournamentCard
            :tournament="tournament"
            v-for="tournament in upcomingTournaments"
          />
        </div>
      </section>

      <!-- Past Tournament Results -->
      <section class="py-16">
        <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">
          Ergebnisse vergangener Turniere
        </h2>
        <div class="grid md:grid-cols-3 gap-6">
          <PastTournamenCard
            :tournament="tournament"
            v-for="tournament in pastTournaments"
          />
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

      <section>
        <HeroImageSlider />
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
  status: upcomingStatus,
  error: upcomingError,
} = useFetch("/api/upcoming-tournaments");

const {
  data: pastTournaments,
  status: pastStatus,
  error: pastError,
} = useFetch("/api/past-tournaments");

const teams = ref([
  { name: "Bottle Bashers", members: ["Alice", "Bob"] },
  { name: "Flunky Fanatics", members: ["Charlie", "Diana"] },
  { name: "Tipsy Tossers", members: ["Eve", "Frank"] },
  { name: "Sling Kings", members: ["Grace", "Henry"] },
  { name: "Bottle Battlers", members: ["Ivy", "Jack"] },
  { name: "Chaos Crew", members: ["Kate", "Liam"] },
]);
</script>
