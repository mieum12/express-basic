import express from "express";
import { userRouter } from "./routes";
import { postRouter } from "./routes";

const app = express();

app.use(express.json()); //객체로
app.use(userRouter);
app.use(postRouter);

app.get("/ping", (req, res) => {
  res.send("server is working!");
});

app.listen(4000, () => {
  console.log(`server is rinning at port 4000`);
});
