import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to mongoDB ${conn.connection.host}`);
  } catch (error) {
    console.log(`Failed to connected to MongoDB ${error}`);
    process.exit(1);
  }
};
