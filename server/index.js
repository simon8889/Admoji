import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import postRoutes from "./routes/postRoutes.js";

dotenv.config()

const PORT = process.env.PORT || 9000;
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/post", postRoutes);
app.get("/", (req,res) => res.send("admoji api"))

mongoose.connect(process.env.DB_URl, {useNewUrlParser: true, useUnifiedTopology:true})
    .then(() => {
        console.log("db connected");
        app.listen(PORT, () => console.log(`ready in port ${PORT}`));
    })
    .catch(err => console.log(err))