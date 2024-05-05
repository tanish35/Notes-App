import mongoose from "mongoose";

async function connectToDB() {
  await mongoose.connect(process.env.DB_URL);
  console.log("Connected to DB");
}

export default connectToDB;
