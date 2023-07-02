import express from "express";
import cors from "cors";
import loginRoute from "./routes/login.routes.js";
import movimentacoesRouter from "./routes/movimentacoes.routes.js";

const app = express();
app.use(express.json());
app.use(cors());

//rotas
app.use("/login", loginRoute);
app.use("/movimentacao", movimentacoesRouter);

app.listen(3000, async () => {
   console.log("API Started!");	
});