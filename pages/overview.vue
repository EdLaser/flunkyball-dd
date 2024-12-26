<template>
  <div class="container mx-auto py-10 px-4">
    <h1 class="text-3xl font-bold mb-8 text-primary">Flunkyball Overview</h1>

    <div class="flex flex-col lg:flex-row gap-8">
      <main class="flex-grow">
        <div class="mb-6">
          <Select v-model="selectedTournament">
            <SelectTrigger class="w-full md:w-[300px]">
              <SelectValue placeholder="Nach Turnier filtern" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="tournament in allTournaments"
                :key="tournament.title"
                :value="tournament.title"
              >
                {{ tournament.title }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div class="grid gap-6 md:grid-cols-3 mb-8">
          <Card v-for="info in quickInfos" :key="info.title">
            <CardHeader
              class="flex flex-row items-center justify-between space-y-0 pb-2"
            >
              <CardTitle class="text-sm font-medium">
                {{ info.title }}
              </CardTitle>
              <component
                :is="info.icon"
                class="h-6 w-6 text-muted-foreground"
              />
            </CardHeader>
            <CardContent>
              <NumberTicker
                :value="info.count ?? 0"
                :decimal-places="0"
                class="text-2xl font-bold block"
              />
              <NuxtLink
                :to="info.link"
                class="text-sm text-primary hover:underline"
              >
                Alle anzeigen
              </NuxtLink>
            </CardContent>
          </Card>
        </div>

        <div class="grid gap-6 md:grid-cols-2 mb-8">
          <Card>
            <CardHeader>
              <CardTitle class="flex items-center">
                <TrendingUp class="mr-2 h-6 w-6 text-primary" />
                Turnier Teilnahmen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <LineChart
                v-if="tournamentParticipation"
                :data="tournamentParticipation"
                index="title"
                :categories="['registrations']"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle class="flex items-center">
                <Award class="mr-2 h-6 w-6 text-primary" />
                Top Teams
              </CardTitle>
            </CardHeader>
            <CardContent> </CardContent>
          </Card>
        </div>

        <div class="grid gap-6 md:grid-cols-2 mb-8">
          <Card>
            <CardHeader>
              <CardTitle class="flex items-center">
                <Calendar class="mr-2 h-6 w-6 text-primary" />
                Nächste Turniere
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul class="space-y-2">
                <li
                  v-for="tournament in upcomingTournaments"
                  class="flex justify-between"
                >
                  <span>{{ tournament.title }}</span>
                  <span class="font-semibold">
                    {{ tournament.tournamentDate.toLocaleDateString("de-DE") }}
                  </span>
                </li>
              </ul>
              <Button
                asChild
                class="w-full mt-4 bg-primary text-primary-foreground"
              >
                <Link href="/tournaments">
                  View All Tournaments
                  <ArrowRight class="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle class="flex items-center">
                <Beer class="mr-2 h-6 w-6 text-primary" />
                Flunkyball Fun Facts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul class="space-y-2">
                <li>Average game duration: 15 minutes</li>
                <li>Most bottles flipped in one game: 42</li>
                <li>Longest winning streak: 8 games</li>
                <li>Most popular team size: 3 players</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>

      <aside class="lg:w-64 flex-shrink-0">
        <OverviewSidebar topTeams="{topTeams}" topPlayers="{topPlayers}" />
      </aside>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  Users,
  Trophy,
  User,
  Calendar,
  TrendingUp,
  Award,
  ArrowRight,
  Beer,
} from "lucide-vue-next";
import NumberTicker from "~/components/inspira/NumberTicker.vue";
import { LineChart } from "~/components/ui/chart-line";

const { data: allTournaments } = await useFetch(
  "/api/tournaments/all-tournaments",
  {
    transform: (data) => {
      return data.map((t) => ({
        ...t,
        tournamentDate: new Date(t.tournamentDate),
      }));
    },
  }
);

const { data: totalPlayers } = await useFetch("/api/players/total-players");
const { data: totalTeams } = await useFetch("/api/teams/total-teams");
const { data: tournamentParticipation } = await useFetch(
  "/api/tournaments/participation"
);

const selectedTournament = ref("");

const tournamentsFiltered = computed(() => {
  if (!allTournaments.value) return [];
  if (!selectedTournament.value) return allTournaments.value;
  return allTournaments.value.filter(
    (t) => t.title === selectedTournament.value
  );
});

const upcomingTournaments = computed(() => {
  if (!allTournaments.value) return [];
  return allTournaments.value.filter((t) => t.tournamentDate > new Date());
});

const quickInfos = computed(() => {
  return [
    {
      title: "Turniere",
      count: 15,
      link: "/tournaments",
      icon: Trophy,
    },
    {
      title: "Spieler",
      count: totalPlayers.value,
      link: "/players",
      icon: User,
    },
    { title: "Teams", count: totalTeams.value, link: "/teams", icon: Users },
  ];
});
</script>
