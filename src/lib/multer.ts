import multer, { FileFilterCallback } from "multer";
import path from "path";

export const multerConfig = multer({
  storage: multer.diskStorage({}),
  fileFilter: (
    _req,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ): void => {
    const allowedImageTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    const allowedVideoTypes = [
      "video/mp4",
      "video/mpeg",
      "video/quicktime",
      "video/webm",
    ];

    if (
      allowedImageTypes.includes(file.mimetype) ||
      allowedVideoTypes.includes(file.mimetype)
    ) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file type. Only images (JPEG, PNG, GIF, WEBP) and videos (MP4, MPEG, QuickTime, WEBM) are allowed."
        )
      );
    }
  },
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB file size limit
    files: 6, // Maximum number of files
  },
});
