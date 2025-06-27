<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <header class="shadow-md bg-primary text-primary-foreground">
      <div class="container px-4 py-6 mx-auto">
        <h1 class="text-3xl font-bold">{{ tournament?.title }}</h1>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container px-4 py-8 mx-auto space-y-4">
      <div class="grid gap-6 md:grid-cols-3">
        <!-- Left Column (2/3) -->
        <div class="space-y-6 md:col-span-2">
          <!-- Tournament Details -->
          <Card>
            <CardHeader>
              <CardTitle class="flex justify-between">
                Turnier Details
                <TournamentStatusBadge
                  v-if="tournament?.status"
                  :status="tournament.status"
                  @update:status="handleUpdateTournamentStatus"
                />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p class="mb-4 text-muted-foreground">
                {{ tournament?.description }}
              </p>

              <div class="flex flex-col space-y-2">
                <div class="flex items-center">
                  <Calendar class="w-4 h-4 mr-2 text-primary" />
                  <span>{{ tournament?.tournamentDate }}</span>
                </div>
                <div class="flex items-center">
                  <MapPin class="w-4 h-4 mr-2 text-primary" />
                  <span>{{ tournament?.location }}</span>
                </div>
                <div class="flex items-center">
                  <Users class="w-4 h-4 mr-2 text-primary" />
                  <span
                    >{{
                      tournament?.tournamentRegistrations?.length
                    }}
                    Teams</span
                  >
                </div>
              </div>
            </CardContent>
          </Card>

          <StagesGroupStageCard
            :has-group-phase="amountGroupStageMatches !== -1"
            :group-stage-has-matches="amountGroupStageMatches > 0"
          />
        </div>

        <!-- Right Column (1/3) -->
        <div class="space-y-6">
          <!-- Participating Teams -->
          <Card>
            <CardHeader>
              <CardTitle>Teilnehmende Teams</CardTitle>
            </CardHeader>
            <CardContent>
              <ul
                class="space-y-4"
                v-if="
                  tournament?.tournamentRegistrations &&
                  tournament?.tournamentRegistrations.length > 0
                "
              >
                <li
                  v-for="team in tournament?.tournamentRegistrations"
                  :key="team.name ?? team.slogan + team.players"
                  class="flex items-center space-x-2"
                >
                  <TeamAvatar :team="team" />
                </li>
              </ul>
              <p v-else>Keine Teams angemeldet.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { Calendar, MapPin, Users } from "lucide-vue-next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { tournament_status } from "@prisma/client";
import { toast } from "vue-sonner";

const route = useRoute();

useHead({
  title: `Turnier Details: ${decodeURIComponent(route.params.title as string)}`,
});

definePageMeta({
  title: "Turnier Details",
  middleware: "auth",
  layout: "dashboard",
  description: "Details zum Turnier",
});

const groupStageStore = useGroupStageStore();

onMounted(() => {
  groupStageStore.fetchGroupStage();
});

const {
  data: tournament,
  status,
  error,
  refresh,
} = await useFetch(() => `/api/tournament-details/${route.params.title}`, {
  getCachedData(key, nuxtApp) {
    // TODO: Fix this to displayed the time when the data was cached
    return getCachedDataOrFetch(key, nuxtApp);
  },
});

const amountGroupStageMatches = computed(() => {
  if (!tournament.value?.stages) return -1;
  const groupStage = tournament.value.stages.find(
    (stage) => stage.stageName === "group"
  );
  if (!groupStage) return -1;
  return groupStage.matches.length;
});

const handleUpdateTournamentStatus = async (status: tournament_status) => {
  if (!tournament.value?.title) {
    console.error("Tournament ID is not available");
    return;
  }
  try {
    const res = await $fetch(
      `/api/orga/tournaments/${tournament.value.title}/status`,
      {
        method: "POST",
        body: { status },
      }
    );
    if (res.title && res.status === status) {
      toast.success("Tournament status updated successfully");
    } else {
      toast.error("Failed to update tournament status");
    }
    refresh(); // Refresh the tournament data after updating status
  } catch (error) {
    toast.error("Failed to update tournament status");
  }
};
</script>
