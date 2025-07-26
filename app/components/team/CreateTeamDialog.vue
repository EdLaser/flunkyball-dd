<template>
  <div>
    <Dialog>
      <DialogTrigger as-child>
        <Button variant="outline">Team Erstellen <Users /></Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Team Erstellen</DialogTitle>
          <DialogDescription>
            Erstelle ein neues Team, indem du die erforderlichen Informationen
            eingibst.
          </DialogDescription>
        </DialogHeader>
        <form id="createTeamForm" @submit="onSubmit">
          <FormField v-slot="{ componentField }" name="name">
            <FormItem>
              <FormLabel>Teamname</FormLabel>
              <FormControl>
                <Input type="text" v-bind="componentField" />
              </FormControl>
              <FormDescription>
                Der Name deines Teams, der in der Liga angezeigt wird.
              </FormDescription>
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="slogan">
            <FormItem>
              <FormLabel>Slogan</FormLabel>
              <FormControl>
                <Input type="text" v-bind="componentField" />
              </FormControl>
              <FormDescription>
                Ein kurzer Slogan, der dein Team beschreibt.
                <small>(max. 100 Zeichen)</small>
              </FormDescription>
            </FormItem>
          </FormField>
        </form>
        <DialogFooter>
          <Button type="submit" form="createTeamForm">
            Erstellen <Users />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import { Users } from "lucide-vue-next";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { z } from "zod";
import { toast } from "vue-sonner";

const form = useForm({
  validationSchema: toTypedSchema(
    z.object({
      name: z.string().min(1, "Team name is required"),
      slogan: z
        .string()
        .min(4, "Slogan is required")
        .max(100, "Slogan must be less than 100 characters"),
    })
  ),
});

const onSubmit = form.handleSubmit(async (values) => {
  try {
    // Call your API to create the team
    await $fetch("/api/teams/new-team", {
      method: "POST",
      body: values,
    });
    toast.success("Team erfolgreich erstellt!");
    form.resetForm();
  } catch (error: any) {
    if (error.data) {
      toast.error("Failed to create team: " + error.data.message);
    } else {
      toast.error("Failed to create team: " + error.message);
    }
  }
});
</script>
