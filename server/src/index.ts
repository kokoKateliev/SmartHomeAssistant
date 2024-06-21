import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import api from "./api/index.routes";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/", api);

app.get("/", (req, res) => {
  res.send("HELLO WORLD!");
});


// DB connection -----------------------------------
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uzdurwg.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(url)
  .then(() => console.log('Connected to db!'))
  .catch((err)=>console.log(err));

//----------------------------------------------------

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on :${process.env.PORT}`);
});

