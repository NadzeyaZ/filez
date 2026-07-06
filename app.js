import express from "express";
import filesRouter from "#api/files";
const app = express();
export default app;

app.use(express.json());

app.use("/files", filesRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong :(");
});
