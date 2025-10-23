import path from "path";
import express from "express";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const port = process.env.PORT || 5000;

// ✅ Connect to MongoDB
connectDB();

const app = express();
app.use(cors());

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ API Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

// ✅ PayPal Config Route
app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

// ✅ Handle uploads folder static
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// ✅ Serve Frontend (Vite build)
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.resolve(__dirname, "../frontend/dist");
  app.use(express.static(frontendPath));

  // 👇 Express v5 fallback (replaces app.get("/*"))
  app.use((req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

// ✅ Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// ✅ Start Server
app.listen(port, () => console.log(`Server running on port ${port}`));

// import path from "path";
// import express from "express";
// import { fileURLToPath } from "url";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// dotenv.config();
// import connectDB from "./config/db.js";
// import cors from "cors";
// import productRoutes from "./routes/productRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js";
// import uploadRoutes from "./routes/uploadRoutes.js";
// import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
// const port = process.env.PORT || 5000;

// connectDB(); //Connect to MongoDB

// const app = express();

// app.use(cors());

// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);

// //Body parser middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// //Cookie parser middleware
// app.use(cookieParser());

// app.use("/api/products", productRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/upload", uploadRoutes);

// app.get("/api/config/paypal", (req, res) =>
//   res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
// );

// //Make uploads folder static
// const __dirname = path.resolve(); //Set __dirname to current directory
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// // if (process.env.NODE_ENV === "production") {
// //   //set static folder
// //   app.use(express.static(path.join(__dirname, "/frontend/build")));

// //   //any route that is not api will be redirected to index.html
// //   app.get("*", (req, res) =>
// //     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
// //   );
// // } else {
// //   app.get("/", (req, res) => {
// //     res.send("API is running...");
// //   });
// // }

// app.use(notFound);
// app.use(errorHandler);

// app.listen(port, () => console.log(`Server running on port ${port}`));
