import { getImagePublicLink, uploadToSupabase } from "~/server/utils/files";
import { FileObject } from "~/types/FileUploads";

export default defineEventHandler(async (event) => {
  const publicID = getRouterParam(event, "publicID");

  const decodedId = decodeURIComponent(publicID ?? "");

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

  if (session.secure?.publicID !== decodedId) {
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
    const file: FileObject = {
      filename: form[0].filename ?? "",
      data: form[0].data,
      type: form[0].type ?? "",
    };

    // Use the reusable upload function
    const result = await uploadToSupabase(file, event, session.user?.publicID);

    if (result.success && result.link) {
      await usePrisma(event).players.update({
        data: {
          avatar_link: result.link,
        },
        where: {
          public_id: session.secure.publicID,
        },
      });
    } else if (result.success && !result.link) {
      const link = await getImagePublicLink(result.data?.path, event);
      await usePrisma(event).players.update({
        data: {
          avatar_link: link,
        },
        where: {
          public_id: session.secure.publicID,
        },
      });
    }

    return result;
  }
});
