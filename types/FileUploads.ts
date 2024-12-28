export interface FileObject {
  filename: string;
  data: Buffer | Uint8Array; // File data as a bytestream
  type: string; // MIME type of the file
}

export interface UploadResult {
  success: boolean;
  message: string;
  data?: Record<string, any>; // Response data from Supabase (optional)
  error?: any; // Error details (optional)
}
