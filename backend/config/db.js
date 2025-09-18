import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected:${conn.connection?.name}`);
    console.log(`Host:${conn.connection?.host}`);
    console.log(`Port:${conn.connection.port}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
