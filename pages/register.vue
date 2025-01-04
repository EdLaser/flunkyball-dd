<template>
  <div
    class="min-h-screen bg-background flex flex-col items-center justify-center p-4"
  >
    <Card class="w-full max-w-2xl">
      <CardHeader>
        <CardTitle
          class="text-2xl font-bold text-center text-gray-800 dark:text-gray-50"
        >
          Willkommen bei unseren Flunkyball Turnieren!
        </CardTitle>
        <CardDescription class="text-center text-gray-600 dark:text-gray-100">
          Registriere dich, um an unseren Turnieren teilzunehmen.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Stepper
          v-slot="{ isNextDisabled, isPrevDisabled, nextStep, prevStep }"
          v-model="stepIndex"
          class="block w-full"
          :validation-schema="registerSchema"
        >
          <form @submit.prevent="onSubmit">
            <div class="flex w-full flex-start gap-2">
              <StepperItem
                v-for="step in steps"
                :key="step.step"
                v-slot="{ state }"
                class="relative flex w-full flex-col items-center justify-center"
                :step="step.step"
              >
                <StepperSeparator
                  v-if="step.step !== steps[steps.length - 1].step"
                  class="absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
                />

                <StepperTrigger as-child>
                  <Button
                    :variant="
                      state === 'completed' || state === 'active'
                        ? 'default'
                        : 'outline'
                    "
                    size="icon"
                    class="z-10 rounded-full shrink-0"
                    :class="[
                      state === 'active' &&
                        'ring-2 ring-ring ring-offset-2 ring-offset-background',
                    ]"
                    :disabled="!meta.valid"
                  >
                    <component :is="step.icon" class="w-4 h-4" />
                  </Button>
                </StepperTrigger>

                <div class="mt-5 flex flex-col items-center text-center">
                  <StepperTitle
                    :class="[state === 'active' && 'text-primary']"
                    class="text-sm font-semibold transition lg:text-base"
                  >
                    {{ step.title }}
                  </StepperTitle>
                  <StepperDescription
                    :class="[state === 'active' && 'text-primary']"
                    class="sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm"
                  >
                    {{ step.description }}
                  </StepperDescription>
                </div>
              </StepperItem>
            </div>

            <div class="flex flex-col gap-4 mt-4">
              <template v-if="stepIndex <= 2">
                <FormField v-slot="{ componentField }" name="firstName">
                  <FormItem v-auto-animate>
                    <FormLabel>Vorname</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        :disabled="stepIndex === 2"
                        v-bind="componentField"
                      />
                    </FormControl>
                  </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="lastName">
                  <FormItem v-auto-animate>
                    <FormLabel>Nachname</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        :disabled="stepIndex === 2"
                        v-bind="componentField"
                      />
                    </FormControl>
                  </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="slogan">
                  <FormItem v-auto-animate>
                    <FormLabel>Slogan</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Dein Slogan / Mantra"
                        :disabled="stepIndex === 2"
                        v-bind="componentField"
                      />
                    </FormControl>
                  </FormItem>
                </FormField>
                <template v-if="createAccount" v-auto-animate="">
                  <div class="grid grid-cols-2 gap-4">
                    <div class="col-span-1">
                      <Label for="email"> Email </Label>
                      <Input id="email" type="email" required v-model="email" />
                    </div>
                    <div class="cols-span-1">
                      <Label for="password"> Passwort </Label>
                      <Input id="password" type="password" required v-model="password" />
                    </div>
                  </div>
                </template>
              </template>

              <template v-if="stepIndex === 3">
                <PlayerCreatedCard
                  v-if="createdPlayer"
                  :player="createdPlayer"
                />
              </template>
            </div>

            <div class="flex items-center justify-between mt-4">
              <Button
                :disabled="isPrevDisabled"
                variant="outline"
                size="sm"
                @click="prevStep()"
              >
                Zurück
              </Button>
              <div
                v-if="stepIndex === 2"
                v-auto-animate
                class="space-x-2 flex items-center"
              >
                <Switch v-model:checked="createAccount" />
                <small class="text-muted-foreground">Account anlegen</small>
              </div>
              <Button
                v-if="stepIndex < 2"
                :disabled="isNextDisabled || !meta.valid"
                :type="'button'"
                size="sm"
                @click="nextStep()"
              >
                Weiter
              </Button>
              <Button
                v-else-if="stepIndex === 2"
                :disabled="isNextDisabled || !meta.valid"
                :type="'submit'"
                size="sm"
              >
                Registrieren
              </Button>
            </div>
          </form>
        </Stepper>
      </CardContent>
      <CardFooter class="flex justify-center">
        <Beer class="text-primary mr-2" />
        <span class="text-gray-600 dark:text-gray-100">
          Join the Flunkyball community!
        </span>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { UserCheck, Beer, User, UserSearch } from "lucide-vue-next";
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import { toast } from "vue-sonner";
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";

useHead({
  title: "Registrieren",
});

definePageMeta({
  title: "Registrieren",
  description: "Registriere dich für unsere Flunkyball Turniere.",
  name: "Registrieren",
});

const createAccount = ref(false);

const loading = ref(false);
const stepIndex = ref(1);

const email = ref("");
const password = ref("");

const createSuccessfull = ref(false);
const createdPlayer = ref<{
  firstName: string;
  lastName: string | null;
  slogan: string | null;
  publicID: string | null;
  phone: string | null;
}>();

const registerUser = async (player: {
  firstName: string;
  lastName: string | null;
  slogan?: string;
}) => {
  loading.value = true;
  try {
    const res = await $fetch("/api/players/new-player", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(player),
    });

    if (res.publicID) {
      createSuccessfull.value = true;
      createdPlayer.value = res;
      stepIndex.value = 3;
    }

    if (createAccount) {
      const result = await $fetch("/api/register", {
        method: "POST",
        body: {
          password: password.value,
          email: email.value,
          publicID: res.publicID,
        },
      });
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const registerSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  slogan: z.string().optional(),
});

const { handleSubmit, meta } = useForm({
  validationSchema: toTypedSchema(registerSchema),
  initialValues: {
    firstName: "",
    lastName: "",
    slogan: "Flunkyball is love Flunkyball is life",
  },
});

const onSubmit = handleSubmit(async (values) => {
  await registerUser(values);
});

const steps = [
  {
    step: 1,
    title: "Du",
    description: "Erzähl uns etwas über dich.",
    icon: User,
  },
  {
    step: 2,
    title: "Deine Daten",
    description: "Daten Prüfen.",
    icon: UserSearch,
  },
  {
    step: 3,
    title: "Fertig",
    description: "Dein Player Account.",
    icon: UserCheck,
  },
];
</script>
