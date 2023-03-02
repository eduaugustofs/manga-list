import express from "express";
import userRoutes from "./routes/manga.js";
import cors from "cors";

//express para rodar localmente
const app = express();

//para o express usar json (necessário para fazer mudanças)
app.use(express.json());
//para não dar conflito de localhost
app.use(cors());

app.use("/", userRoutes);

//localhost
app.listen(8800);

//console.log(app);
