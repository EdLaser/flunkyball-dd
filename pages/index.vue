<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm">
      <div class="container mx-auto py-6">
        <h1 class="text-4xl font-bold text-center text-amber-600">
          Flunkyball Tournaments
        </h1>
      </div>
    </header>

    <main class="container mx-auto px-4">
      <!-- Hero Section -->
      <section class="text-center py-20">
        <h2 class="text-5xl font-extrabold mb-4 text-gray-800">
          Experience the Thrill of Flunkyball!
        </h2>
        <p class="text-xl mb-8 text-gray-600">
          Join us for action-packed tournaments filled with laughter, skill, and
          a dash of chaos.
        </p>
        <Button
          class="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg"
        >
          Register Now
        </Button>
      </section>

      <!-- About the Game -->
      <section class="py-16">
        <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">
          What is Flunkyball?
        </h2>
        <div class="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p class="text-lg mb-4 text-gray-600">
              Flunkyball is an exciting sport where two teams of 2 players each
              compete by throwing a bottle at a bottle in the middle of the
              playing field.
            </p>
            <ul class="list-disc list-inside space-y-2 text-gray-600">
              <li>If you hit the middle bottle, your team can drink!</li>
              <li>
                The other team must reset the bottle and return to their
                baseline.
              </li>
              <li>First team to finish their drinks wins!</li>
            </ul>
          </div>
          <div class="relative h-64 md:h-full">
            <NuxtImg
              src="/img/start-throw.jpeg"
              alt="Flunkyball game in action"
              class="rounded-lg object-cover h-full w-full"
            />
          </div>
        </div>
      </section>

      <!-- Upcoming Tournament -->
      <section class="py-16">
        <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">
          Upcoming Tournament
        </h2>
        <Card class="bg-white">
          <CardHeader>
            <CardTitle class="flex items-center text-amber-600">
              <Calendar class="mr-2" />
              Summer Flunkyball Showdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-lg mb-2 text-gray-600">
              <strong>Date:</strong> July 15, 2023
            </p>
            <p class="text-lg mb-2 text-gray-600">
              <strong>Location:</strong> Sunny Park, Downtown
            </p>
            <p class="text-lg mb-4 text-gray-600">
              <strong>Prize:</strong> Glory, bragging rights, and a golden
              bottle trophy!
            </p>
            <Button class="bg-amber-600 hover:bg-amber-700 text-white"
              >Learn More</Button
            >
          </CardContent>
        </Card>
      </section>

      <!-- Past Tournament Results -->
      <section class="py-16">
        <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">
          Past Tournament Results
        </h2>
        <div class="grid md:grid-cols-3 gap-6">
          <Card
            :key="index"
            class="bg-white"
            v-for="(tournament, index) in pastTournaments"
          >
            <CardHeader>
              <CardTitle class="flex items-center text-amber-600">
                <Trophy class="mr-2" />
                {{ tournament.name }}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-gray-600">
                <strong>Winner:</strong> {{ tournament.winner }}
              </p>
              <p class="text-gray-600">
                <strong>Date:</strong> {{ tournament.date }}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <!-- Team Overview -->
      <section class="py-16">
        <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">
          Competing Teams
        </h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            :key="`${index}-${team.name}`"
            class="bg-white"
            v-for="(team, index) in teams"
          >
            <CardHeader>
              <CardTitle class="flex items-center text-amber-600">
                <Users class="mr-2" />
                {{ team.name }}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-gray-600">
                <strong>Members:</strong> {{ team.members.join(", ") }}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <!-- Registration CTA -->
      <section class="text-center py-20">
        <h2 class="text-4xl font-bold mb-4 text-gray-800">
          Ready to Join the Fun?
        </h2>
        <p class="text-xl mb-8 text-gray-600">
          Register now for our upcoming Flunkyball tournament and show off your
          bottle-tossing skills!
        </p>
        <Button
          class="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg flex items-center justify-center mx-auto"
        >
          <BeerIcon class="mr-2" />
          Register Your Team
        </Button>
      </section>
    </main>

    <footer class="bg-amber-600 text-white py-8">
      <div class="container mx-auto text-center">
        <p>&copy; 2023 Flunkyball Tournaments. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { BeerIcon } from 'lucide-vue-next';

const pastTournaments = ref([
  { name: "Spring Fling Flunky", winner: "Bottle Rockets", date: "April 2023" },
  {
    name: "Winter Wonderland Flunky",
    winner: "Ice Cold Slingers",
    date: "January 2023",
  },
  { name: "Autumn Bottle Bash", winner: "Leaf Lobbers", date: "October 2022" },
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
