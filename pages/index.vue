<template>
  <div class="min-h-screen bg-background">
    <header>
      <div class="container mx-auto py-6">
        <h1 class="text-4xl font-bold text-center text-primary">
          Flunkyball-Turniere Dresden
        </h1>
      </div>
    </header>

    <main class="container mx-auto px-4">
      <!-- Hero Section -->
      <section class="text-center py-20">
        <h2
          class="text-5xl font-extrabold mb-4 text-gray-800 dark:text-gray-50"
        >
          Erlebe den Nervenkitzel von Flunkyball!
        </h2>
        <p class="text-xl mb-10 text-gray-600 dark:text-gray-100">
          Nimm an actiongeladenen Turnieren voller Spaß, Sport und einer Prise
          Chaos teil.
        </p>
        <RainbowButton
          class="px-4 py-8 group space-x-4"
          :speed="8"
          @click="navigateTo('/teams/register')"
        >
          <BeerIcon />
          <span class="text-lg md:text-3xl"> Jetzt Anmelden </span>
          <BeerIcon class="-scale-x-100" />
        </RainbowButton>
      </section>

      <!-- About the Game -->
      <section class="py-16">
        <h2
          class="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-50"
        >
          Was ist Flunkyball?
        </h2>
        <div
          class="grid md:grid-cols-2 gap-6 items-center text-gray-600 dark:text-gray-100"
        >
          <div>
            <p class="text-lg mb-4">
              Flunkyball ist ein aufregender Sport, bei dem zwei Teams mit
              jeweils zwei Spielern gegeneinander antreten, indem sie eine
              Flasche auf eine Flasche in der Mitte des Spielfelds werfen.
            </p>
            <ul class="space-y-2 list-disc list-inside">
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
        <h2
          class="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-50"
        >
          Anstehende Turniere
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
        <h2
          class="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-50"
        >
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
        <h2
          class="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-50"
        >
          Antretende Teams
        </h2>
      </section>

      <section>
        <HeroImageSlider />
      </section>

      <!-- Registration CTA -->
      <section class="text-center py-20">
        <h2 class="text-4xl font-bold mb-4 text-gray-600 dark:text-gray-100">
          Bereit, dabei zu sein?
        </h2>
        <p class="text-xl mb-8 text-gray-600 dark:text-gray-100">
          Melde dich jetzt für unser bevorstehendes Flunkyball-Turnier an und
          zeig deine Wurfkünste!
        </p>
        <NuxtLink
          to="/teams/register"
          class="text-2xl dark:text-white underline hover:text-primary dark:hover:text-primary"
        >
          Melde dein Team an
        </NuxtLink>
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
import RainbowButton from "~/components/inspira/RainbowButton.vue";
import PastTournamenCard from "~/components/tournament/PastTournamenCard.vue";

useHead({
  title: "Flunkyball Turniere Dresden",
});

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
</script>
