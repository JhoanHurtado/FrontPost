$(document).ready(function () {
    console.log(localStorage.getItem('token'));
    if (localStorage.getItem('token') != null || localStorage.getItem('token') != undefined) {
        window.location.href = "index.html";
    }
    $('#loginbtn').click(function () {
        var email = $("#email").val();
        var password = $("#password").val();
        var user = { email: email, password: password };
        if ($.trim(email).length > 0 && $.trim(password).length > 0) {

            fetch('https://localhost:44370/api/login', {
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
                headers: {
                    "Content-type": "application/json"
                }
            })
                .then(response => {
                    console.log(response);
                    if (response.status == 404) {
                        alert("Usuario no existe");
                    } else if (response.status == 400) {
                        alert("Usuario o contraseña invalidos");
                    } else {
                        return response.json();
                    }

                })
                .then(json => {
                    if (json) {
                        localStorage.setItem('token', json.token);
                        localStorage.setItem('Id', json.id);
                        localStorage.setItem('Name', json.name);
                        localStorage.setItem('email', json.email);
                        window.location.href = "index.html";
                    }
                })
        }
        return false;
    });

});
