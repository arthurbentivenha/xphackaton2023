import express from "express";
import movimentacaoController from "../controller/movimentacoes.controller.js";

const router = express.Router();

router.get("/", movimentacaoController.consultar);
router.get("/saldos", movimentacaoController.consultarSaldos);
router.get("/score", movimentacaoController.consultarScore);
router.get("/sugestoes", movimentacaoController.consultarSugestoes);

router.use((err, req, res, next) => {
    res.status(400).send({ error: err.message });    
});

export default router;