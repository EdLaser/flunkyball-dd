<template>
  <div class="bg-background container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-primary mb-6">Flunkyball Orte</h1>

    <Card>
      <CardHeader>
        <CardTitle>Flunkyball Orte</CardTitle>
        <CardDescription>
          Bearbeiten und Anzeigen von Spielorten.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Adresse</TableHead>
              <TableHead>Wegbeschreibung</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="(location, index) in locations" :key="index">
              <TableCell class="font-medium">
                {{ location.name }}
              </TableCell>
              <TableCell>
                {{ location.street }}, {{ location.house_number }},
                {{ location.postal_code }} {{ location.city }}
              </TableCell>
              <TableCell>
                {{ location.directions ?? "-" }}
              </TableCell>
              <TableCell class="max-w-xs truncate">
                {{ location.description ?? "-" }}
              </TableCell>
              <TableCell>
                <div class="flex space-x-2">
                  <Button variant="outline" size="icon">
                    <Edit class="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    @click="deleteLocation(index)"
                  >
                    <Trash2 class="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    <div class="flex justify-end w-full">
      <Dialog>
        <DialogTrigger as-child>
          <Button class="mt-6">
            <Plus class="mr-2 h-4 w-4" /> Neuen Ort hinzufügen
          </Button>
        </DialogTrigger>

        <DialogContent class="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Ort hinzufgen</DialogTitle>
            <DialogDescription>
              Gib die Details für die neue Location ein.
            </DialogDescription>
          </DialogHeader>

          <Form>
            <form @submit.prevent="onSubmit()" class="space-y-4">
              <!-- Location Name -->
              <FormField v-slot="{ componentField }" name="name">
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input v-bind="componentField" />
                  </FormControl>
                </FormItem>
              </FormField>

              <div class="grid grid-cols-3 md:grid-cols-5 gap-3">
                <FormField v-slot="{ componentField }" name="street">
                  <FormItem class="col-span-2 md:col-span-4">
                    <FormLabel>Straße</FormLabel>
                    <FormControl>
                      <Input v-bind="componentField" />
                    </FormControl>
                  </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="house_number">
                  <FormItem class="col-span-1 md:col-span-1">
                    <FormLabel>Nr.</FormLabel>
                    <FormControl>
                      <Input v-bind="componentField" />
                    </FormControl>
                  </FormItem>
                </FormField>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <FormField v-slot="{ componentField }" name="postal_code">
                  <FormItem>
                    <FormLabel>PLZ</FormLabel>
                    <FormControl>
                      <Input v-bind="componentField" />
                    </FormControl>
                  </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="city">
                  <FormItem>
                    <FormLabel>Stadt</FormLabel>
                    <FormControl>
                      <Input v-bind="componentField" />
                    </FormControl>
                  </FormItem>
                </FormField>
              </div>

              <!-- Directions -->
              <FormField v-slot="{ componentField }" name="directions">
                <FormItem>
                  <FormLabel>Wegbeschreibung</FormLabel>
                  <FormControl>
                    <Textarea v-bind="componentField" />
                  </FormControl>
                  <FormDescription>
                    Gib eine kurze Wegbeschreibung (optional) an.
                  </FormDescription>
                </FormItem>
              </FormField>

              <!-- Description -->
              <FormField v-slot="{ componentField }" name="description">
                <FormItem>
                  <FormLabel>Weitere Details</FormLabel>
                  <FormControl>
                    <Textarea v-bind="componentField" />
                  </FormControl>
                  <FormDescription>
                    Beschreibe kurz die Location (optional).
                  </FormDescription>
                </FormItem>
              </FormField>
              <div class="flex justify-end w-full">
                <Button type="submit"> <Plus />Hinzufügen </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { z } from "zod";
import { Dialog } from "@/components/ui/dialog";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Plus, Edit, Trash2 } from "lucide-vue-next";
import { toast } from "vue-sonner";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";

definePageMeta({
  middleware: "auth",
  title: "Orte (Orga)",
  name: "Orte (Orga)",
  breadcrumb: [
    {
      text: "Lcoations",
      href: "/orga/locations",
    },
  ],
  layout: "dashboard",
  pageTransition: {
    name: "page",
    mode: "out-in",
  },
});

const locationSchema = z.object({
  name: z.string().min(2, "Location name must be at least 2 characters."),
  street: z.string().min(2, "Street must be at least 2 characters."),
  city: z.string().min(2, "City must be at least 2 characters."),
  postal_code: z
    .string()
    .min(5, "Postal code must be at least 2 characters.")
    .regex(/^\d{5}$/),
  house_number: z
    .string()
    .min(1, "House number must be at least 1 character.")
    .regex(/^\d+([a-zA-Z]?|\/\d+|-\d+)?$/, "House number must be a number."),
  description: z
    .string()
    .max(200, "Description must not exceed 500 characters.")
    .optional(),
  directions: z
    .string()
    .max(200, "Directions must not exceed 500 characters.")
    .optional(),
});

// Type from Zod
type LocationType = z.infer<typeof locationSchema>;

// Mock data
const initialLocations: Array<LocationType> = [
  {
    name: "Eiffel Tower",
    street: "Champ de Mars",
    city: "Paris",
    postal_code: "75007",
    house_number: "5",
    description: "An iconic wrought-iron lattice tower in Paris.",
  },
  {
    name: "Louvre Museum",
    street: "Rue de Rivoli",
    city: "Paris",
    postal_code: "75001",
    house_number: "99",
    description: "The world's largest art museum and a historic monument.",
  },
  {
    name: "Château de Chambord",
    street: "Place Saint-Louis",
    city: "Chambord",
    postal_code: "41250",
    house_number: "1",
    description: "A magnificent Renaissance-style château in the Loire Valley.",
  },
  {
    name: "Mont Saint-Michel",
    street: "Le Mont-Saint-Michel",
    city: "Mont-Saint-Michel",
    postal_code: "50170",
    house_number: "2",
    description:
      "A stunning island commune with an abbey and medieval architecture.",
  },
  {
    name: "Cathédrale Notre-Dame de Strasbourg",
    street: "Place de la Cathédrale",
    city: "Strasbourg",
    postal_code: "67000",
    house_number: "10",
    description: "A Gothic cathedral with intricate details and a tall spire.",
  },
];

const { data: locations } = await useFetch("/api/orga/locations");

const form = useForm({
  validationSchema: toTypedSchema(locationSchema),
});

const onSubmit = form.handleSubmit((values) => {
  console.log("Form submitted!", values);
});

function deleteLocation(index: number) {
  toast("Location Deleted", {
    description: "The location has been successfully deleted.",
  });
}
</script>
