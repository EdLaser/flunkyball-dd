import { uploadToSupabase } from "~/server/utils/files";
import { FileObject } from "~/types/FileUploads";

export default defineEventHandler(async (event) => {
  const publicID = getRouterParam(event, "publicID");

  if (!publicID) {
    throw createError({
      statusCode: 400,
      message: "Public ID is required.",
    });
  }

  const session = await getUserSession(event);
  if (!session) {
    throw createError({
      statusCode: 401,
      message: "You must be logged in to upload an avatar.",
    });
  }

  if (!session.user?.publicID) {
    throw createError({
      statusCode: 400,
      message: "User does not have a public ID.",
    });
  }

  if (session.secure?.publicID !== publicID) {
    throw createError({
      statusCode: 400,
      message: "Public ID does not match logged in user.",
    });
  }

  const form = await readMultipartFormData(event);

  if (
    !form ||
    form.length === 0 ||
    form[0].data.length === 0 ||
    form[0].filename == undefined
  ) {
    throw createError({
      statusCode: 400,
      message: "No file uploaded.",
    });
  } else {
    const file: FileObject = form[0]; // Ensure type adherence

    // Use the reusable upload function
    const result = await uploadToSupabase(file, event, session.user?.publicID);

    return result;
  }
});
