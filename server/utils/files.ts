import { serverSupabaseClient } from "#supabase/server";
import { FileObject, UploadResult } from "~/types/FileUploads";
const config = useRuntimeConfig();

/**
 * Uploads a file to a Supabase storage bucket.
 *
 * @param {object} file - The file object containing `filename`, `data` (bytestream), and `type` (MIME type).
 * @param {object} event - The Nuxt event object.
 * @param {string} [bucketName=config.AVATAR_BUCKET_NAME] - The name of the Supabase bucket (optional, defaults to runtime config value).
 * @param {string} [pathPrefix="uploads/"] - The path prefix for the file in the bucket (optional, defaults to "uploads/").
 *
 * @returns {Promise<UploadResult>} - Returns a result object with `success`, `message`, and optional `data` or `error`.
 */
export async function uploadToSupabase(
  file: FileObject,
  event: any,
  userPublicID: string,
  bucketName: string = config.AVATAR_BUCKET_NAME,
  pathPrefix: string = "/"
): Promise<UploadResult> {
  try {
    const supabase = await serverSupabaseClient(event);

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(`${pathPrefix}uploads/${userPublicID}`, file.data, {
        contentType: file.type,
      });

    if (error) {
      return { success: false, message: "Upload to Supabase failed.", error };
    }

    return {
      success: true,
      message: "File uploaded successfully to Supabase!",
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Server error occurred during file upload.",
      error,
    };
  }
}
