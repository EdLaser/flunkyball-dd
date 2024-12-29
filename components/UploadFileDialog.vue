<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Upload, X } from "lucide-vue-next";
import { toast } from "vue-sonner";

const { session } = useUserSession();

const selectedFile = ref(null);
const loading = ref(false);
const uploadMessage = ref("");

const handleFileChange = (event: any) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
  } else {
    toast("No file selected.");
  }
};

const uploadFile = async () => {
  if (!selectedFile.value) {
    toast("Please select a file first!");
    return;
  }

  const formData = new FormData();
  formData.append("file", selectedFile.value);

  try {
    loading.value = true;
    uploadMessage.value = "";

    const response = await $fetch(
      `/api/players/upload-avatar/${session.value?.user?.publicID}`,
      {
        method: "POST",
        body: formData, // Let the browser set the correct headers for FormData
      }
    );
    if (!response.success) throw new Error(response.message);

    toast("Upload successful!", {
      description: response.message,
    });
  } catch (error: any) {
    toast("Upload failed.", {
      description: error.message,
    });
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline"> Avatar hochladen </Button>
    </DialogTrigger>
    <form @submit.prevent="uploadFile()">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Avatar hochladen</DialogTitle>
          <DialogDescription>
            Hier kannst du dein persönliches Profilbild hochladen. Es wird nur
            für die Anzeige in deinem Profil verwendet.
          </DialogDescription>
        </DialogHeader>
        <div class="grid w-full items-center gap-1.5 my-4">
          <Label for="picture">Avatar</Label>
          <Input id="picture" type="file" required @change="handleFileChange" />
        </div>
        <DialogFooter class="flex gap-3">
          <Button variant="destructive"><X /> Abbrechen</Button>
          <Button @click="uploadFile()"><Upload /> Hochladen</Button>
        </DialogFooter>
      </DialogContent>
    </form>
  </Dialog>
</template>
