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

const selectedFile = ref(null);
const loading = ref(false);
const uploadMessage = ref("");

const handleFileChange = (event: any) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
  } else {
    uploadMessage.value = "No file selected.";
  }
};

const uploadFile = async () => {
  if (!selectedFile.value) {
    uploadMessage.value = "Please select a file first!";
    return;
  }

  const formData = new FormData();
  formData.append("file", selectedFile.value);

  // Debug: Log FormData contents
  for (const [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }

  try {
    loading.value = true;
    uploadMessage.value = "";

    const response = await $fetch("/api/players/upload-avatar", {
      method: "POST",
      body: formData, // Let the browser set the correct headers for FormData
    });

    uploadMessage.value = response.message || "Upload successful!";
  } catch (error: any) {
    uploadMessage.value = error.message || "Upload failed.";
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
        {{ uploadMessage }}
        <DialogFooter>
          <Button variant="destructive">Abbrechen</Button>
          <Button @click="uploadFile()">Hochladen</Button>
        </DialogFooter>
      </DialogContent>
    </form>
  </Dialog>
</template>
