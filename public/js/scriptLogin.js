urlApi = ".";

function entrar() {
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;
    if (!email || !senha) {
        alert("Preencha todos os campos!");
    } else {
        $.ajax({
            url: urlApi + "/login",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify({ email: email, senha: senha }),
            type: 'POST',
            success: function (response) {
                localStorage.setItem("email", response.data.email);
                window.location.href = "dashboard.html";
            },
            error: function (response) {
                alert(response.responseJSON.message);
            }
        });
    }
}