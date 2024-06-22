import mongoose from "mongoose";

export default async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/newServer");
  } catch (error) {
    console.log("error connecting to database", error);
  }
}