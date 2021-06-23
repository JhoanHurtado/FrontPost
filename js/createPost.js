$(document).ready(function () {
    if (localStorage.getItem('token') == null || localStorage.getItem('token') == undefined) {
        window.location.href = "login.html";
    }
    document.getElementById("navEmail").innerHTML = localStorage.getItem('email');
    var token = localStorage.getItem('token');

    $('#postRegist').click(function () {
        var IdUsuario = localStorage.getItem('Id');

        var formElement = document.getElementById("reg-form");
        var formData = new FormData(formElement);
        formData.append("idUsuario", IdUsuario);
        fetch('https://localhost:44370/api/post', {
            method: 'POST',
            body: formData,
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(response => response.json())
            .then(json => {
                window.location.href = "index.html";
            })
    }
    );

    $("#logOut").click(function () {
        localStorage.removeItem('token');
        localStorage.removeItem('Id');
        localStorage.removeItem('Name');
        localStorage.removeItem('email');
        window.location.reload;
    });

});
