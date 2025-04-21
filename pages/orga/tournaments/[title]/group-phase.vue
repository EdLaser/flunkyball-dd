<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <header class="shadow-md bg-primary text-primary-foreground">
      <div class="container px-4 py-6 mx-auto">
        <h1 class="text-3xl font-bold">Gruppenphase {{ tournament?.title }}</h1>
      </div>
    </header>

    <main class="container px-4 py-8 mx-auto space-y-4">
      <Tabs default-value="matches" class="w-full">
        <TabsList>
          <TabsTrigger value="matches"> Spiele </TabsTrigger>
          <TabsTrigger value="ranking"> Ranking </TabsTrigger>
        </TabsList>
        <TabsContent value="matches">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="ranking"> Change your password here. </TabsContent>
      </Tabs>
    </main>
  </div>
</template>

<script lang="ts" setup>
const title = useRoute().params.title as string;

useHead({
  title: `Gruppenphase: ${decodeURIComponent(title)}`,
});

definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});

const {
  data: tournament,
  status,
  error,
  refresh,
} = await useFetch(() => `/api/tournament-details/${title}`, {
  getCachedData(key, nuxtApp) {
    return getCachedDataOrFetch(key, nuxtApp);
  },
});
</script>
