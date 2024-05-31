import mongoose, { Connection } from "mongoose";
import configs from "../configs";

export default (): Connection => {
  mongoose
    .connect(configs.mongoDB)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.log("Failed to connect to MongoDB: ", error);
    });

  const db = mongoose.connection;

  // Listen for events
  db.on("error", (error) => {
    console.log("Error ocurred: ", error);
  });

  db.on("disconnected", () => {
    console.log("Disconnected from MongoDB");
  });

  return db;
};
