async function login(req, res, next) {
    try {
        let result = {email: req.body.email}
        if (req.body.email != "teste1" && req.body.email != "teste2"){
            return res.status(401).send({ message: "Usuário não encontrado!" });
        }
        res.send({ message: "Login efetuado com sucesso!", data: result });
    } catch (err) {
        next(err);
    }
}

export default {
    login
}