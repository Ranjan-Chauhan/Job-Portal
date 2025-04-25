import multer from "multer";
import path from "path";

// === Storage config ===
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "resume") {
      cb(null, "uploads/resumes");
    } else if (file.fieldname === "profileImage") {
      cb(null, "uploads/profileImages");
    } else {
      cb(null, "uploads");
    }
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  },
});

// === File filter ===
const fileFilter = (req, file, cb) => {
  if (file.fieldname === "resume" && file.mimetype !== "application/pdf") {
    cb(new Error("Only PDF allowed for resumes"), false);
  } else if (
    file.fieldname === "profileImage" &&
    !["image/jpeg", "image/png"].includes(file.mimetype)
  ) {
    cb(new Error("Only JPG/PNG allowed for profile pictures"), false);
  } else {
    cb(null, true);
  }
};

export const upload = multer({ storage, fileFilter });

// size of the file
export const uploads = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
});
