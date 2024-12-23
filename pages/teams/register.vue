<template>
  <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-extrabold text-primary mb-2">
          Join the Flunkyball League
        </h1>
        <p class="text-xl text-primary/80">
          Melde dein Team an und werde Teil der Flunkyball Liga!
        </p>
      </div>
      <!-- Card -->
      <Card class="backdrop-blur-sm bg-white/80 shadow-xl border-primary/20">
        <CardHeader class="space-y-1">
          <CardTitle class="text-2xl font-bold text-center"
            >Team anmelden</CardTitle
          >
          <CardDescription class="text-center">
            Füll das Formular aus und werde Teil der Flunkyball Liga!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <!-- Icons Row -->
          <div class="flex justify-center space-x-6 mb-6">
            <div class="flex flex-col items-center">
              <Beer
                class="h-12 w-12 text-primary mb-2 hover:scale-110 duration-200"
              />
              <span class="text-sm font-semibold">Beer</span>
            </div>
            <div class="flex flex-col items-center">
              <Trophy
                class="h-12 w-12 text-primary mb-2 hover:scale-110 duration-200"
              />
              <span class="text-sm font-semibold">Triumph</span>
            </div>
            <div class="flex flex-col items-center">
              <Users
                class="h-12 w-12 text-primary mb-2 hover:scale-110 duration-200"
              />
              <span class="text-sm font-semibold">Teamwork</span>
            </div>
          </div>

          <form @submit.prevent="onSubmit" class="space-y-6">
            <FormField v-slot="{ componentField }" name="name">
              <FormItem>
                <FormLabel class="font-semibold">Team Name</FormLabel>
                <FormControl>
                  <div class="grid grid-cols-5 gap-6">
                    <Input
                      placeholder="Dein Team Name"
                      class="border-primary/60 focus:border-primary/80 col-span-4"
                      v-bind="componentField"
                      required
                    />
                    <Button
                      @click="form.setFieldValue('name', getRandomTeamName())"
                      class="col-span-1 text-xs h-full w-full"
                    >
                      Zufälliger Name
                    </Button>
                  </div>
                </FormControl>
                <FormDescription class="text-gray-700">
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
                    required
                  />
                </FormControl>
                <FormDescription class="text-gray-700">
                  Ein toller und motivierender Slogan.
                </FormDescription>
              </FormItem>
            </FormField>

            <!-- Captain & Second Member -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Captain -->
              <FormField name="member1" v-slot="{ componentField }">
                <FormItem>
                  <FormLabel class="font-semibold">Spieler 1</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name Spieler 1"
                      class="border-primary/60 focus:border-primary/80"
                      v-bind="componentField"
                      required
                    />
                  </FormControl>
                </FormItem>
              </FormField>
              <!-- Second Member -->
              <FormField v-slot="{ componentField }" name="member2">
                <FormItem>
                  <FormLabel class="font-semibold">Name Spieler 2</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name Spieler 2"
                      class="border-primary/60 focus:border-primary/80"
                      v-bind="componentField"
                      required
                    />
                  </FormControl>
                </FormItem>
              </FormField>
            </div>

            <!-- Email -->
            <FormField v-slot="{ componentField }" name="email">
              <FormItem>
                <FormLabel class="font-semibold">Kontakt Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter contact email"
                    class="border-primary/60 focus:border-primary/80"
                    v-bind="componentField"
                    required
                  />
                </FormControl>
                <FormDescription class="text-gray-700">
                  Wir nutze deine EMail für die Kommunikation.
                </FormDescription>
              </FormItem>
            </FormField>

            <!-- Submit Button -->
            <Button
              type="submit"
              :disabled="isSubmitting"
              class="w-full text-white text-xl"
            >
              {{ isSubmitting ? "Registering..." : "Register Team" }}
            </Button>
          </form>
        </CardContent>
      </Card>

      <!-- Link to View Teams -->
      <div class="mt-8 text-center">
        <p class="text-gray-700">
          Already registered?
          <NuxtLink to="/" class="text-gray-500 hover:underline">
            View all teams
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Beer, Trophy, Users } from "lucide-vue-next";
import { toast } from "vue-sonner";

// Zod for validation
import * as z from "zod";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { capitalize } from "vue";

const isSubmitting = ref(false);

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
    member1: z.string().min(2, {
      message: "Member name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    member2: z.string().min(2, {
      message: "Member name must be at least 2 characters.",
    }),
  })
);

const form = useForm({
  initialValues: {
    name: "",
    member1: "",
    email: "",
    member2: "",
  },
  validationSchema: teamSchema,
});

const onSubmit = form.handleSubmit((values) => {
  console.log("Form submitted!", values);
});
</script>
