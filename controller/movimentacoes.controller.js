import axios from "axios";
import { promises as fs } from "fs";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    organization: "org-EQ0HqXMyMWLRaxHPJvoibuFv",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

async function consultarDados(req) {
    let result = { movimentacoes: [], receitas: [] };
    const dados = JSON.parse(await fs.readFile('./data/movimentacoes.json', 'utf-8'));
    for (let item of dados){
        if (item.email == req.headers.authorization){
            result.movimentacoes = item.movimentacoes;
            result.receitas = item.receitas;
        }
    }
    return result;
}


async function consultar(req, res, next) {
    try {
        let result = await consultarDados(req);
        res.send({ data: result });
    } catch (err) {
        next(err);
    }
}

async function consultarSaldos(req, res, next) {
    try {
        let debito = 0;
        let receita = 0;
        let dados = await consultarDados(req);
        let result = [];
        for (let item of dados.movimentacoes) {
            debito += item.valor;
        }
        for (let item of dados.receitas) {
            receita += item.valor;
        }
        result.push({ tipo: "Receita", valor: receita });
        result.push({ tipo: "Gastos", valor: debito });
        res.send({ data: result });
    } catch (err) {
        next(err);
    }
}

async function consultarScore(req, res, next) {
    try {
        let debito = 0;
        let receita = 0;
        let result = 0;
        let dados = await consultarDados(req);
        for (let item of dados.movimentacoes) {
            debito += item.valor;
        }
        for (let item of dados.receitas) {
            receita += item.valor;
        }
        result = (parseFloat(receita)*2 / (parseFloat(debito)) * 100);
        res.send({ data: parseInt(result) });
    } catch (err) {
        next(err);
    }
}

async function consultarSugestoes(req, res, next) {
    try {

        let debito = 0;
        let receita = 0;
        let result = 0;
        let dados = await consultarDados(req);
        let movimentacoes = [];
        for (let item of dados.movimentacoes) {
            if (item.categoria == "Dívidas"){
                debito += item.valor;
            }else{
                movimentacoes.push(item);
            }
        }
        
        for (let item of dados.receitas) {
            receita += item.valor;
        }
        result = (parseFloat(debito) / parseFloat(receita)) * 100;

        /*const configuration = new Configuration({
            organization: "org-8hGcqpHC0TTbKicO5Mf3eeIz",
            apiKey: "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",
        });*/
        /*const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo", 
            messages: [{ "role": "system", "content": "You are a helpful assistant." }, { role: "user", content: "Hello world" }],
        });
        console.log(completion)
        const resp = await axios.post('https://api.openai.com/v1/chat/completions',{
            "mode           "messages": [{"role": "system", "content": "You are a helpful assistant."}, {"role": "user", "content": "Hello!"}]
          },{headers:{"Authorization": "Bearer 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"}})
        console.log(completion)
        console.log(2)*/
        if (result < 30){
            result= "Que bom que você está gastando pouco, continue assim!";
        }
        if (result >= 35 && result < 40){
            result= "Atenção! Você deve estar atento aos seus gastos com dívidas, é necessário diminuir o valor gasto com dívidas!";
        }
        if (result >= 30 && result < 35){
            result= "Sinal Laranja! O aperto financeiro não permite nenhuma mudança estrutural ou nas receitas, atenção aos seus gastos!";
        }
        if (result >= 40){
            result= "Sinal Vermelho!!! Com quase metade da renda comprometida, fica quse impossível honrar todos os compromissos financeiros. Precisa diminuir os gastos com os custos de padrão de vida ou aumentar a renda (receita)!";
        }

        let completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ "role": "system", "content": "You are a helpful assistant." }, { role: "user", content: JSON.stringify(movimentacoes) + " qual categoria estou gastando mais?" }],
        })
            .then((response) => response.data.choices[0].message.content)
            .catch((error) => console.log(error.response.data));
        if (completion != undefined) {	
            completion += "<br/><br/> <b>" + result + "</b>";
        }else{
            completion = "<b>" + result + "</b>";
        }
        res.send({ data: completion });
    } catch (err) {
        next(err);
    }
}

export default {
    consultar,
    consultarSaldos,
    consultarScore,
    consultarSugestoes
}

/*
const OPENAI_API_KEY = `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`
org-EQ0HqXMyMWLRaxHPJvoibuFv
// https://platform.openai.com/docs/guides/gpt/function-calling
async function testeGPT() {
await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
        model:"gpt-3.5-turbo",
        messages: [{"role": "user", "content":
        "Esse é um teste, por favor responda com um olá!"}],
        max_tokens: 1024,
        temperature: 0.9,
    }),
})
    .then((response) => response.json())
        .then((data) => console.log(data.choices[0].message.content))
        .catch((error) => console.log(error));
}

testeGPT()
*/