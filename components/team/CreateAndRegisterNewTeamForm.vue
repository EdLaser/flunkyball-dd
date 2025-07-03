<template>
  <form @submit="onSubmit" class="space-y-6">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel class="font-semibold">Team Name</FormLabel>
        <FormControl>
          <div class="grid grid-cols-5 gap-6">
            <Input
              placeholder="Dein Team Name"
              class="col-span-4"
              v-bind="componentField"
            />
            <Button
              @click="form.setFieldValue('name', getRandomTeamName())"
              class="col-span-1"
              :size="isMobile ? 'icon' : null"
            >
              <span v-show="!isMobile">Zufällig</span>
              <Dices class="w-5 h-5" />
            </Button>
          </div>
        </FormControl>
        <FormDescription class="text-secondary-foreground">
          Wähle einen tollen Team Namen.
        </FormDescription>
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="slogan">
      <FormItem>
        <FormLabel class="font-semibold">Team Slogan</FormLabel>
        <FormControl>
          <Input placeholder="Dein Team Slogan" v-bind="componentField" />
        </FormControl>
        <FormDescription class="text-secondary-foreground">
          Ein toller und motivierender Slogan.
        </FormDescription>
      </FormItem>
    </FormField>

    <FormField
      v-slot="{ value, handleChange }"
      v-if="nextUpcomingTournament"
      name="registerForUpcomingTournament"
    >
      <FormItem
        class="flex flex-row items-start gap-x-3 space-y-0 p-4 border rounded-md bg-gray-50"
      >
        <FormControl>
          <Checkbox
            class="h-5 w-5"
            :model-value="value"
            @update:model-value="handleChange"
          />
        </FormControl>
        <div class="space-y-1 leading-none">
          <FormLabel class="font-semibold">
            Für das nächste Turnier anmelden
          </FormLabel>
          <FormDescription>
            <strong>Turnier:</strong> {{ nextUpcomingTournament.title }}, am
            {{
              new Date(nextUpcomingTournament.tournamentDate).toLocaleString(
                "de-DE",
                {
                  dateStyle: "long",
                  timeStyle: "short",
                }
              )
            }}
            <br />
            <strong>Ort:</strong>
            {{ nextUpcomingTournament.location }}
            <br />
            <strong>Details: </strong>{{ nextUpcomingTournament.description }}
          </FormDescription>
        </div>
      </FormItem>
    </FormField>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <span class="md:col-span-2 text-xl">Spieler 1</span>
      <FormField name="member1.firstName" v-slot="{ componentField }">
        <FormItem>
          <FormLabel class="font-semibold">Vorname</FormLabel>
          <FormControl>
            <Input placeholder="Vorname Spieler 1" v-bind="componentField" />
          </FormControl>
        </FormItem>
      </FormField>
      <FormField name="member1.lastName" v-slot="{ componentField }">
        <FormItem>
          <FormLabel class="font-semibold">Nachname</FormLabel>
          <FormControl>
            <Input placeholder="Nachname Spieler 1" v-bind="componentField" />
          </FormControl>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="member1.slogan">
        <FormItem class="col-span-full">
          <FormLabel class="font-semibold"
            >Spieler Slogan
            <small class="font-normal">(optional)</small></FormLabel
          >
          <FormControl>
            <Input placeholder="Spieler Slogan" v-bind="componentField" />
          </FormControl>
        </FormItem>
      </FormField>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <span class="md:col-span-2 text-xl">Spieler 2</span>
      <FormField name="member2.firstName" v-slot="{ componentField }">
        <FormItem>
          <FormLabel class="font-semibold">Vorname</FormLabel>
          <FormControl>
            <Input placeholder="Vorname Spieler 2" v-bind="componentField" />
          </FormControl>
        </FormItem>
      </FormField>
      <FormField name="member2.lastName" v-slot="{ componentField }">
        <FormItem>
          <FormLabel class="font-semibold">Nachname</FormLabel>
          <FormControl>
            <Input placeholder="Nachname Spieler 2" v-bind="componentField" />
          </FormControl>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="member2.slogan">
        <FormItem class="col-span-full">
          <FormLabel class="font-semibold"
            >Spieler Slogan
            <small class="font-normal">(optional)</small></FormLabel
          >
          <FormControl>
            <Input placeholder="Spieler Slogan" v-bind="componentField" />
          </FormControl>
        </FormItem>
      </FormField>
    </div>

    <div class="flex justify-center">
      <Button
        type="submit"
        size="lg"
        :disabled="isSubmitting"
        class="text-white text-xl"
      >
        {{ isSubmitting ? "Registering..." : "Team Anmelden" }}
        <Beer class="inline w-6 h-6 ml-2" />
      </Button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { z } from "zod";
import { useForm } from "vee-validate";
import { capitalize } from "vue";
import { toTypedSchema } from "@vee-validate/zod";
import { Dices, Beer } from "lucide-vue-next";
import { toast } from "vue-sonner";
import { useWindowSize } from "@vueuse/core";
import { Checkbox } from "@/components/ui/checkbox";

const isSubmitting = ref(false);

const { width } = useWindowSize();
const isMobile = computed(() => width.value < 768);

const tournamentsStore = useTournamentsStore();
callOnce("tournaments", () => tournamentsStore.fetchAllTournaments());

const { nextUpcomingTournament } = storeToRefs(tournamentsStore);

const getRandomTeamName = () => {
  return capitalize(randomName());
};

const teamSchema = toTypedSchema(
  z.object({
    name: z.string().min(2, {
      message: "Team name must be at least 2 characters.",
    }),
    slogan: z.string().max(100, {
      message: "Team Slogan must be less than 100 characters.",
    }),
    member1: z.object({
      firstName: z.string().min(2, {
        message: "Member name must be at least 2 characters.",
      }),
      lastName: z.string().min(2, {
        message: "Member name must be at least 2 characters.",
      }),
      slogan: z
        .string()
        .max(100, {
          message: "Member Slogan must be less than 100 characters.",
        })
        .optional(),
    }),
    member2: z.object({
      firstName: z.string().min(2, {
        message: "Member name must be at least 2 characters.",
      }),
      lastName: z.string().min(2, {
        message: "Member name must be at least 2 characters.",
      }),
      slogan: z
        .string()
        .max(100, {
          message: "Member Slogan must be less than 100 characters.",
        })
        .optional(),
    }),
    registerForUpcomingTournament: z.boolean().optional(),
  })
);

const form = useForm({
  validationSchema: teamSchema,
});

const onSubmit = form.handleSubmit(async (values) => {
  try {
    const res = await $fetch("/api/teams/new-team", {
      method: "POST",
      body: {
        ...values,
        registerForUpcomingTournament: values.registerForUpcomingTournament
          ? nextUpcomingTournament.value?.id
          : undefined,
      },
    });
    if (!res.id) {
      throw new Error("Team registration failed");
    }
    toast.success("Team registered successfully!", {
      description: "PublicID: " + res.public_id,
    });
    form.resetForm();
    setTimeout(() => {
      return navigateTo({ path: "/teams" });
    }, 1000);
  } catch (error: any) {
    if (error.data && error.data.message) {
      toast.error("Error registering team: " + error.data.message);
    } else {
      toast.error("Error registering team");
    }
    return;
  } finally {
    isSubmitting.value = false;
  }
});
</script>
