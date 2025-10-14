import path from "path";
import express from "express";
import multer from "multer";
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(req, file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

const upload = multer({
  storage,
  // checkFileType,
});

router.post("/", upload.single("image"), (req, res) => {
  res.send({
    message: "Image Uploaded",
    image: `/uploads/${path.basename(req.file.path)}`,
    // image: `/${req.file.path.replace(/\\/g, '/')}`, // Another way to solve path formatting issue.
  });
});

export default router;
