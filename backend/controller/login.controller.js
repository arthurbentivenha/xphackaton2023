async function login(req, res, next) {
    try {
        let result = {email: req.body.email}
        console.log(req.body.email);
        if (req.body.email != "teste@teste.com.br"){
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