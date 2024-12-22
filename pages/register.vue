<template>
  <div
    class="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4"
  >
    <NuxtLink
      to="/"
      class="absolute top-4 left-4 text-primary hover:-translate-x-1 duration-150 flex items-center"
    >
      <ArrowLeft class="mr-2" />
      Zurück
    </NuxtLink>

    <Card class="w-full max-w-2xl">
      <CardHeader>
        <CardTitle class="text-2xl font-bold text-center text-gray-800">
          Willkommen bei unseren Flunkyball Turnieren!
        </CardTitle>
        <CardDescription class="text-center text-gray-600">
          Registriere dich, um an unseren Turnieren teilzunehmen.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form
          v-slot="{ meta, values, validate }"
          as=""
          keep-values
          :validation-schema="toTypedSchema(registerSchema[stepIndex - 1])"
        >
          <Stepper
            v-slot="{ isNextDisabled, isPrevDisabled, nextStep, prevStep }"
            v-model="stepIndex"
            class="block w-full"
          >
            <form
              @submit="
                (e) => {
                  e.preventDefault();
                  validate();

                  if (stepIndex === steps.length && meta.valid) {
                    onSubmit(values);
                  }
                }
              "
            >
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
                      :disabled="state !== 'completed' && !meta.valid"
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
                <template v-if="stepIndex === 1">
                  <FormField v-slot="{ componentField }" name="firstName">
                    <FormItem v-auto-animate>
                      <FormLabel>Vorname</FormLabel>
                      <FormControl>
                        <Input type="text" v-bind="componentField" />
                      </FormControl>
                    </FormItem>
                  </FormField>

                  <FormField v-slot="{ componentField }" name="lastName">
                    <FormItem v-auto-animate>
                      <FormLabel>Nachname</FormLabel>
                      <FormControl>
                        <Input type="text" v-bind="componentField" />
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
                          v-bind="componentField"
                        />
                      </FormControl>
                    </FormItem>
                  </FormField>
                </template>

                <template v-if="stepIndex === 2">
                  <FormField v-slot="{ componentField }" name="email">
                    <FormItem v-auto-animate>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" v-bind="componentField" />
                      </FormControl>
                    </FormItem>
                  </FormField>

                  <FormField v-slot="{ componentField }" name="password">
                    <FormItem v-auto-animate>
                      <FormLabel>Passwort</FormLabel>
                      <FormControl>
                        <Input type="password" v-bind="componentField" />
                      </FormControl>
                    </FormItem>
                  </FormField>

                  <FormField v-slot="{ componentField }" name="confirmPassword">
                    <FormItem v-auto-animate>
                      <FormLabel>Passwort bestätigen</FormLabel>
                      <FormControl>
                        <Input type="password" v-bind="componentField" />
                      </FormControl>
                    </FormItem>
                  </FormField>
                </template>

                <template v-if="stepIndex === 3">
                  <FormField v-slot="{ componentField, value }" name="otp">
                    <FormItem class="my-14 mx-auto flex flex-col items-center">
                      <Label class="text-center text-lg">OTP</Label>
                      <PinInput
                        id="otp"
                        :model-value="value"
                        placeholder="○"
                        class="flex gap-2 items-center mt-1 justify-between"
                        otp
                        type="number"
                        :name="componentField.name"
                        @complete="handleComplete"
                        @update:model-value="
                            (arrStr: any) => {
                              setFieldValue('otp', arrStr.filter(Boolean));
                            }
                          "
                      >
                        <PinInputGroup>
                          <PinInputInput
                            v-for="(id, index) in 6"
                            :key="id"
                            :index="index"
                          /> </PinInputGroup
                      ></PinInput>
                      <small class="text-center text-gray-500 max-w-md"
                        >Du hast dein <b>O</b>ne <b>T</b>ime <b>P</b>asswort per
                        Email erhalten. Bitte Prüfe auch deinen
                        Spam-Ordner.</small
                      >
                    </FormItem>
                  </FormField>
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
                <div class="flex items-center gap-3">
                  <Button
                    v-if="stepIndex <= 3"
                    :type="meta.valid ? 'button' : 'submit'"
                    :disabled="isNextDisabled"
                    size="sm"
                    @click="meta.valid && nextStep()"
                  >
                    {{ stepIndex === 2 ? "Registrieren" : "Weiter" }}
                  </Button>
                </div>
              </div>
            </form>
          </Stepper>
        </Form>
      </CardContent>
      <CardFooter class="flex justify-center">
        <Beer class="text-primary mr-2" />
        <span class="text-gray-600">Join the Flunkyball community!</span>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, Beer, User, Mail, MailCheck } from "lucide-vue-next";
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import { toast } from "vue-sonner";
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";

const onSubmit = (values: any) => {
  toast({
    title: "You submitted the following values:",
    description: h(
      "pre",
      { class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
      h("code", { class: "text-white" }, JSON.stringify(values, null, 2))
    ),
  });
};

const registerSchema = [
  z.object({
    firstName: z.string(),
    lastName: z.string(),
    slogan: z.string(),
  }),
  z
    .object({
      email: z.string().email(),
      password: z.string().min(2).max(50),
      confirmPassword: z.string(),
    })
    .refine(
      (values) => {
        return values.password === values.confirmPassword;
      },
      {
        message: "Passwörter müssen übereinstimmen!",
        path: ["confirmPassword"],
      }
    ),
  z.object({
    otp: z.array(z.coerce.string()).length(6),
  }),
];

const { handleSubmit, setFieldValue } = useForm({
  validationSchema: registerSchema,
  initialValues: {
    firstName: "",
    lastName: "",
    slogan: "Flunkyball is love Flunkyball is life",
    password: "",
    confirmPassword: "",
    otp: [],
  },
});

const handleComplete = (e: string[]) => console.log(e.join(""));

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
    description: "Erstelle ein Konto.",
    icon: Mail,
  },
  {
    step: 3,
    title: "Account bestätigen",
    description: "Bestätige dein Konto.",
    icon: MailCheck,
  },
];

const stepIndex = ref(1);
</script>
