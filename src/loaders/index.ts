import http from "http";
import app from "./app";
import db from "./mongoDb";

export default () => {
  const port = process.env.PORT || 4000;
  const server = http.createServer(app);
  server.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });

  // Connect to mongoDb
  const mongoDb = db();

  // Majestic close
  process.on("SIGINT", () => {
    server.close();
    mongoDb.close();
  });
};
