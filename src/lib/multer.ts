import multer, { FileFilterCallback } from "multer";
import path from "path";

export const multerConfig = multer({
  storage: multer.diskStorage({}),
  fileFilter: (_req, file: Express.Multer.File, cb: FileFilterCallback): void => {
    const ext = path.extname(file.originalname);
    const allowedExtensions = [".jpg", ".jpeg", ".png"] as const;
    
    if (!allowedExtensions.includes(ext as typeof allowedExtensions[number])) {
      cb(null, false);
      return;
    }
    cb(null, true);
  },
});
