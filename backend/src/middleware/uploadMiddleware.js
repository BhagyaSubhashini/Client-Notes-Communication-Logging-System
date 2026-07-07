import multer from "multer";

// Storage config
const storage = multer.diskStorage({
 destination: (req, file, cb) => {

  if (
    req.originalUrl.includes(
      "upload-profile-image"
    )
  ) {

    cb(
      null,
      "uploads/profile-images"
    );

  } else {

    cb(
      null,
      "uploads"
    );

  }

},
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

export const upload = multer({ storage });