import { IncomingForm } from "formidable";
import fs from "fs";
import path from "path";
import { handleFileUpload } from "@/utils/blob_storage_util";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const form = new IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err || !files.file) {
      return res.status(400).json({ error: "File upload failed" });
    }

    try {
      const urls = await handleFileUpload(files.file);
      const uploadedUrl = urls[0];
      console.log("Uploaded URL:", urls);

      if (!uploadedUrl) {
        return res.status(500).json({ error: "No file uploaded" });
      }

      return res.status(200).json({ success: true, url: urls });
    } catch (error) {
      console.error("Upload error:", error);
      return res.status(500).json({ error: "Upload to Hetzner failed" });
    }
  });
}
