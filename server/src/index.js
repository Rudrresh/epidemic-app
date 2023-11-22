import express from "express";
import cors from "cors"
import mongoose from "mongoose"
import {userRouter} from './routes/user.js';
import { displayRouter } from "./routes/display-data.js";
import { updateRouter } from "./routes/update-entry.js";
const app = express();

app.use(express.json());
app.use(cors());
app.use("/auth", userRouter)
app.use("/display", displayRouter)
app.use("/update",updateRouter)
mongoose.connect("mongodb+srv://rudrresh:epidemic@epidemic0.lxdsekq.mongodb.net/?retryWrites=true&w=majority")


app.listen(3001, () => console.log("Server Listening on Port 3001"));