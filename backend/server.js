/** @format */

// import cookieParser from "cookie-parser";
// import cors from "cors";
// import dotenv from "dotenv";
// import express from "express";
// import multer from "multer";
// import path from "path";
// import { fileURLToPath } from "url";

// import { Storage } from "@google-cloud/storage";
// import crypto from "crypto";

// import connectDB from "./config/db.js";
// import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
// import orderRoutes from "./routes/orderRoutes.js";
// import productRoutes from "./routes/productRoutes.js";
// import uploadRoutes from "./routes/uploadRoutes.js";
// import userRoutes from "./routes/userRoutes.js";

// dotenv.config();

// const port = process.env.PORT || 5000;

// // ✅ Connect to MongoDB
// connectDB();

// const app = express();
// app.use(cors());

// // ✅ Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// // ✅ API Routes
// app.use("/api/products", productRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/upload", uploadRoutes);

// // ✅ PayPal Config Route
// app.get("/api/config/paypal", (req, res) =>
//   res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
// );

// // // // ✅ Handle uploads folder static
// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);
// // app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// // code by other
// // //Make uploads folder static
// const __dirname = path.resolve(); //Set __dirname to current directory
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// // ✅ Serve Frontend (Vite build)

// if (process.env.NODE_ENV === "production") {
//   const frontendPath = path.resolve(__dirname, "../frontend/dist");
//   app.use(express.static(frontendPath));

//   // 👇 Express v5 fallback (replaces app.get("/*"))
//   app.use((req, res) => {
//     res.sendFile(path.join(frontendPath, "index.html"));
//   });
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running...");
//   });
// }

// // Start google cloud image upload via sdk

// // Configure multer (memory storage since we’ll upload directly to GCS)
// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
// });

// // Initialize Google Cloud Storage client
// const storage = new Storage({
//   keyFilename: path.join(__dirname, "key.json"), // path to your downloaded key file
//   projectId: "mern-k8s-342617", // replace with your Google Cloud project ID
// });

// // Define your bucket name
// const bucket = storage.bucket("karima-aktari"); // replace with your GCS bucket name

// // Upload route
// app.post("/api/gcs-upload", upload.single("image"), async (req, res) => {
//   try {
//     if (!req.file)
//       return res.status(400).send({ message: "No file uploaded!" });

//     // Generate a unique filename
//     const fileName = `${Date.now()}-${crypto
//       .randomBytes(8)
//       .toString("hex")}${path.extname(req.file.originalname)}`;

//     // Create a blob in the bucket
//     const blob = bucket.file(fileName);

//     // Stream the file to GCS
//     const blobStream = blob.createWriteStream({
//       resumable: false,
//       contentType: req.file.mimetype,
//     });

//     blobStream.on("error", (err) => {
//       console.error(err);
//       res.status(500).send({ message: "Upload error", error: err.message });
//     });

//     blobStream.on("finish", async () => {
//       // Make the file public (optional)
//       await blob.makePublic();
//       const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

//       res.send({
//         message: "File uploaded successfully!",
//         image: publicUrl,
//       });
//     });

//     blobStream.end(req.file.buffer);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: "Server error", error: error.message });
//   }
// });

// // end google cloud imgae upload via sdk

// // ✅ Error Handling Middleware
// app.use(notFound);
// app.use(errorHandler);

// // ✅ Start Server
// app.listen(port, () => console.log(`Server running on port ${port}`));

// .
// .
// .
// .
// .
// .

import path from "path";
import express from "express";
// import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
const port = process.env.PORT || 5000;

dotenv.config();

connectDB(); //Connect to MongoDB

const app = express();

app.use(cors());

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Cookie parser middleware
app.use(cookieParser());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

//Make uploads folder static
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use("/uploads", express.static("/var/data/uploads"));
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  const __dirname = path.resolve();
  app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

// if (process.env.NODE_ENV === "production") {
//   //set static folder
//   app.use(express.static(path.join(__dirname, "/frontend/build")));

//   //any route that is not api will be redirected to index.html
//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
//   );
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running...");
//   });
// }

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
