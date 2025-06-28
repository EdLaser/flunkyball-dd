<template>
  <form @submit="onSubmit" class="space-y-6">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel class="font-semibold">Team Name</FormLabel>
        <FormControl>
          <div class="grid grid-cols-5 gap-6">
            <Input
              placeholder="Dein Team Name"
              class="border-primary/60 focus:border-primary/80 col-span-4"
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
          <Input
            placeholder="Dein Team Slogan"
            class="border-primary/60 focus:border-primary/80"
            v-bind="componentField"
          />
        </FormControl>
        <FormDescription class="text-secondary-foreground">
          Ein toller und motivierender Slogan.
        </FormDescription>
      </FormItem>
    </FormField>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <span class="md:col-span-2 text-xl">Spieler 1</span>
      <FormField name="member1.firstName" v-slot="{ componentField }">
        <FormItem>
          <FormLabel class="font-semibold">Vorname</FormLabel>
          <FormControl>
            <Input
              placeholder="Vorname Spieler 1"
              class="border-primary/60 focus:border-primary/80"
              v-bind="componentField"
            />
          </FormControl>
        </FormItem>
      </FormField>
      <FormField name="member1.lastName" v-slot="{ componentField }">
        <FormItem>
          <FormLabel class="font-semibold">Nachname</FormLabel>
          <FormControl>
            <Input
              placeholder="Nachname Spieler 1"
              class="border-primary/60 focus:border-primary/80"
              v-bind="componentField"
            />
          </FormControl>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="member1.slogan">
        <FormItem class="col-span-full">
          <FormLabel class="font-semibold">Spieler Slogan</FormLabel>
          <FormControl>
            <Input
              placeholder="Spieler Slogan"
              class="border-primary/60 focus:border-primary/80"
              v-bind="componentField"
            />
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
            <Input
              placeholder="Vorname Spieler 2"
              class="border-primary/60 focus:border-primary/80"
              v-bind="componentField"
            />
          </FormControl>
        </FormItem>
      </FormField>
      <FormField name="member2.lastName" v-slot="{ componentField }">
        <FormItem>
          <FormLabel class="font-semibold">Nachname</FormLabel>
          <FormControl>
            <Input
              placeholder="Nachname Spieler 2"
              class="border-primary/60 focus:border-primary/80"
              v-bind="componentField"
            />
          </FormControl>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="member2.slogan">
        <FormItem class="col-span-full">
          <FormLabel class="font-semibold">Spieler Slogan</FormLabel>
          <FormControl>
            <Input
              placeholder="Spieler Slogan"
              class="border-primary/60 focus:border-primary/80"
              v-bind="componentField"
            />
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

const isSubmitting = ref(false);

const { width } = useWindowSize();
const isMobile = computed(() => width.value < 768);

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
      slogan: z.string().max(100, {
        message: "Member Slogan must be less than 100 characters.",
      }),
    }),
    member2: z.object({
      firstName: z.string().min(2, {
        message: "Member name must be at least 2 characters.",
      }),
      lastName: z.string().min(2, {
        message: "Member name must be at least 2 characters.",
      }),
      slogan: z.string().max(100, {
        message: "Member Slogan must be less than 100 characters.",
      }),
    }),
  })
);

const form = useForm({
  validationSchema: teamSchema,
});

const onSubmit = form.handleSubmit(async (values) => {
  try {
    const res = await $fetch("/api/teams/new-team", {
      method: "POST",
      body: values,
    });
    if (!res.id) {
      throw new Error("Team registration failed");
    }
    toast.success("Team registered successfully!", {
      description: "PublicID: " + res.public_id,
    });
  } catch (error) {
    toast.error("Error registering team");
    console.error("Error registering team:", error);
    return;
  } finally {
    isSubmitting.value = false;
  }
});
</script>
