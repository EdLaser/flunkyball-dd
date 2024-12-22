<template>
  <div class="min-h-screen bg-background">
    <header class="bg-primary text-primary-foreground shadow-md">
      <div class="container mx-auto py-6 px-4">
        <h1 class="text-3xl font-bold">Flunkyball Organization Dashboard</h1>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8">
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Tournaments" value="12" :icon="Trophy" />
        <StatCard title="Active Teams" value="48" :icon="Users" />
        <StatCard title="Upcoming Events" value="3" :icon="Calendar" />
        <StatCard title="Venues" value="5" :icon="MapPin" />
      </div>

      <div class="grid gap-6 mt-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Tournaments</CardTitle>
            <CardDescription
              >Overview of the latest Flunkyball tournaments</CardDescription
            >
          </CardHeader>
          <CardContent>
            <TournamentList />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Teams</CardTitle>
            <CardDescription>Highest ranked Flunkyball teams</CardDescription>
          </CardHeader>
          <CardContent>
            <TeamList />
          </CardContent>
        </Card>
      </div>

      <div class="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>Key metrics for the organization</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              class="h-[300px] flex items-center justify-center bg-muted rounded-md"
            >
              <BarChart class="h-16 w-16 text-muted-foreground" />
              <span class="ml-4 text-muted-foreground"
                >Performance chart placeholder</span
              >
            </div>
          </CardContent>
        </Card>
      </div>

      <div class="mt-8 flex justify-end">
        <!-- NuxtLink replaces next/link -->
        <NuxtLink to="/tournaments/create">
          <Button>Create New Tournament</Button>
        </NuxtLink>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

import { Trophy, Users, Calendar, MapPin, BarChart } from "lucide-vue-next";

// Replace these with the actual Vue paths for your UI components:
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TournamentList from "@/components/TournamentList.vue";
import TeamList from "@/components/TeamList.vue";
import StatCard from "@/components/StatCard.vue";
</script>
