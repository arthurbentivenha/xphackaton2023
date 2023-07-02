$.ajax({
    url: "https://viacep.com.br/ws/01001000/json/",
    contentType: "application/json",
    dataType: "json",
    type: 'GET',
    success: function (response) {
        console.log(response)
    }
});
