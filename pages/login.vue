<template>
  <div
    class="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4"
  >
    <!-- Replace Link with nuxt-link -->
    <nuxt-link
      to="/"
      class="absolute top-4 left-4 text-primary hover:-translate-x-1 duration-150 flex items-center"
    >
      <ArrowLeft class="mr-2" />
      Back to Home
    </nuxt-link>

    <Card class="w-full max-w-md">
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
        <!-- Tabs logic now within Vue. Keep same structure/naming for Tabs, etc. -->
        <Tabs defaultValue="login" class="w-full">
          <TabsList class="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <div className="relative mt-4 h-[300px]">
            <TabsContent value="login">
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
                    <Label for="login-password">Password</Label>
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
            </TabsContent>

            <!-- Register Tab -->
            <TabsContent value="register">
              <form
                @submit.prevent="handleRegister"
                class="space-y-4 h-full flex flex-col"
              >
                <div class="space-y-4">
                  <div class="space-y-2">
                    <Label for="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="your@email.com"
                      required
                      v-model="registerEmail"
                    />
                  </div>
                  <div class="space-y-2">
                    <Label for="register-password">Password</Label>
                    <Input
                      id="register-password"
                      type="password"
                      required
                      v-model="registerPassword"
                    />
                  </div>
                  <div class="space-y-2">
                    <Label for="register-confirm-password"
                      >Confirm Password</Label
                    >
                    <Input
                      id="register-confirm-password"
                      type="password"
                      required
                      v-model="registerConfirmPassword"
                    />
                  </div>
                  <Button
                    type="submit"
                    class="w-full bg-primary hover:bg-primary/80 text-white"
                  >
                    Register
                  </Button>
                </div>
              </form>
            </TabsContent>
          </div>
          <!-- Login Tab -->
        </Tabs>
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
import { vAutoAnimate } from "@formkit/auto-animate";

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
