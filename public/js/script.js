urlApi = ".";

function consultarMovimentacao() {
    $.ajax({
        url: urlApi + "/movimentacao",
        contentType: "application/json",
        headers: {
            "Authorization": localStorage.getItem("email")
        },
        dataType: "json",
        type: 'GET',
        success: function (response) {
            let result = "";
            for (let item of response.data.movimentacoes) {
                result += `
                <div class="row lista movimentacao">
                    <div class="col-md-8">
                        <h3 class="movimentacao--categoria"> ${item.categoria}</h3>
                        <p class="movimentacao--description"> ${item.descricao}</p>
                        <p class="movimentacao--data">${item.data}</p>
                    </div>
                    <div class="col-md-2">
                        <p class="movimentacao--preco">R$ ${item.valor}</p>
                    </div>
                </div>
                `
            }

            document.getElementById("movimentacao").innerHTML = result;
        }
    });
}

function consultarSaldos() {
    $.ajax({
        url: urlApi + "/movimentacao/saldos",
        contentType: "application/json",
        headers: {
            "Authorization": localStorage.getItem("email")
        },
        dataType: "json",
        type: 'GET',
        success: function (response) {
            let result = "";
            for (let item of response.data) {
                result += `
                <div class="row lista movimentacao">
                    <div class="col-md-8">
                        <h3 class="movimentacao--categoria"> ${item.tipo}</h3>
                    </div>
                    <div class="col-md-2">
                        <p class="movimentacao--preco">R$ ${item.valor}</p>
                    </div>
                </div>
                `
            }

            document.getElementById("controle").innerHTML = result;
        }
    });
}

function score() {
    $.ajax({
        url: urlApi + "/movimentacao/score",
        contentType: "application/json",
        headers: {
            "Authorization": localStorage.getItem("email")
        },
        dataType: "json",
        type: 'GET',
        success: function (response) {
            let result = response.data;
            document.getElementById("score").innerHTML = result;
        }
    });
}


function consultarSugestoes() {
    $.ajax({
        url: urlApi + "/movimentacao/sugestoes",
        contentType: "application/json",
        headers: {
            "Authorization": localStorage.getItem("email")
        },
        dataType: "json",
        type: 'GET',
        success: function (response) {
            let result = response.data;
            document.getElementById("sugestoes").innerHTML = result;
        }
    });
}

function init() {
    consultarMovimentacao();
    consultarSaldos();
    consultarSugestoes();
    score();
    document.getElementById("atualizado").innerHTML = "Atualizado em: " + new Date().toLocaleString();
    document.getElementById("nome").innerHTML = localStorage.getItem("email");
}

function logout(){
    localStorage.removeItem("email");
    window.location.href = "index.html";
}

init();
