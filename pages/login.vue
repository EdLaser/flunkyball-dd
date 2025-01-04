<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-4">
    <Card class="w-full max-w-md">
      <CardHeader>
        <CardTitle
          class="text-2xl font-bold text-center text-gray-800 dark:text-gray-50"
        >
          Willkommen bei unseren Flunkyball Turnieren!
        </CardTitle>
        <CardDescription class="text-center text-gray-600 dark:text-gray-100">
          Loge dich ein oder registriere dich, um an unseren Turnieren
          teilzunehmen.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid grid-cols-2 gap-5 mb-5 px-8">
          <span class="text-sm col-span-2 text-center text-muted-foreground">
            Anmelden als...
          </span>
          <Button
            :variant="!loginAsStaff ? 'default' : 'outline'"
            :class="{
              'text-white ': !loginAsStaff,
            }"
            class="transition-colors duration-200 rounded-xl"
            @click="toggleLoginAsStaff"
          >
            Spieler/in
          </Button>
          <Button
            :variant="loginAsStaff ? 'default' : 'outline'"
            :class="{
              'text-white ': loginAsStaff,
            }"
            class="transition-colors duration-200 rounded-xl"
            @click="toggleLoginAsStaff"
          >
            Mitwirkende/r
          </Button>
        </div>
        <form
          @submit.prevent="handleLogin"
          class="space-y-4 h-full flex flex-col"
        >
          <div class="space-y-4">
            <div class="space-y-2">
              <Label for="login-email">Email</Label>
              <Input
                id="login-email"
                type="email"
                placeholder="your@email.com"
                required
                v-model="loginEmail"
              />
            </div>
            <div class="space-y-2">
              <Label for="login-password">Passwort</Label>
              <Input
                id="login-password"
                type="password"
                required
                v-model="loginPassword"
              />
            </div>
            <Button
              type="submit"
              class="w-full bg-primary hover:bg-primary/80 text-white"
            >
              Login
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <NuxtLink to="/register" class="flex justify-center w-full">
          <Beer class="text-primary mr-2" />
          <span class="text-primary hover:underline animate-pulse">
            Join the Flunkyball community!
          </span>
        </NuxtLink>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Beer } from "lucide-vue-next";
import { toast } from "vue-sonner";

definePageMeta({
  title: "Login",
  name: "Einloggen",
});

const { loggedIn, fetch } = useUserSession();

if (loggedIn.value) await navigateTo("/");

// Local state using refs
const loginEmail = ref("");
const loginPassword = ref("");
const loginAsStaff = ref(false);

const route = useRoute();

const toggleLoginAsStaff = () => {
  loginAsStaff.value = !loginAsStaff.value;
};

const signIgnUser = async (email: string, password: string) => {
  try {
    const url = loginAsStaff.value ? "/api/orga/login" : "/api/login";
    const result = await $fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!result) {
      throw new Error(result);
    } else if (result === "OK") {
      await fetch();
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

// Methods
const handleLogin = async () => {
  const success = await signIgnUser(loginEmail.value, loginPassword.value);

  if (success) {
    toast.success("Erfolgreich eingeloggt!");
    return navigateTo(loginAsStaff ? "/orga" : "/");
  } else {
    toast.error("Ein Fehler ist aufgetreten!");
  }
};
</script>
