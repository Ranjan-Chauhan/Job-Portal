import mongoose from "mongoose";

const DB_NAME = "Job-Portal";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );

    console.log(
      `\nMongoDB is connectd !! DB Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error(`MongoDB connection is Failed `, error);
    process.exit(1);
  }
};

export { connectDB };
