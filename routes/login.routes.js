import express from "express";
import loginController from "../controller/login.controller.js";

const router = express.Router();

router.post("/", loginController.login);

router.use((err, req, res, next) => {
    res.status(400).send({ error: err.message });    
});

export default router;