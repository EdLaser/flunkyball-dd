<template>
  <div
    class="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4"
  >
    <NuxtLink
      to="/"
      class="absolute top-4 left-4 text-primary hover:-translate-x-1 duration-150 flex items-center"
    >
      <ArrowLeft class="mr-2" />
      Back to Home
    </NuxtLink>

    <Card class="w-full max-w-md">
      <NuxtLink to="/register" class="py-3">Join the Community</NuxtLink>
      <CardHeader>
        <CardTitle class="text-2xl font-bold text-center text-gray-800">
          Willkommen bei unseren Flunkyball Turnieren!
        </CardTitle>
        <CardDescription class="text-center text-gray-600">
          Loge dich ein oder registriere dich, um an unseren Turnieren
          teilzunehmen.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <!-- Note @submit.prevent instead of onSubmit -->
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
      <CardFooter class="flex justify-center">
        <Beer class="text-primary mr-2" />
        <span class="text-gray-600">Join the Flunkyball community!</span>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, Beer } from "lucide-vue-next";
import { toast } from "vue-sonner";

// Local state using refs
const loginEmail = ref("");
const loginPassword = ref("");
const registerEmail = ref("");
const registerPassword = ref("");
const registerConfirmPassword = ref("");

// Methods
function handleLogin() {
  // TODO: Implement login logic
  console.log("Login:", {
    email: loginEmail.value,
    password: loginPassword.value,
  });
}

function handleRegister() {
  // Check password match
  if (registerPassword.value !== registerConfirmPassword.value) {
    alert("Passwords do not match");
    return;
  }
  // TODO: Implement registration logic
  console.log("Register:", {
    email: registerEmail.value,
    password: registerPassword.value,
  });
}
</script>
