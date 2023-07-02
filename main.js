import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import loginRoute from "./routes/login.routes.js";
import movimentacoesRouter from "./routes/movimentacoes.routes.js";

const app = express();
app.use(express.json());
app.use(cors());

//rotas
app.use("/", express.static('public'));
app.use("/login", loginRoute);
app.use("/movimentacao", movimentacoesRouter);

app.listen(process.env.PORT, async () => {
   console.log("Pronto! Porta: " + process.env.PORT);	
});