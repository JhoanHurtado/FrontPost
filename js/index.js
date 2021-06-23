$(document).ready(function () {
    if (localStorage.getItem('token') == null || localStorage.getItem('token') == undefined) {
        window.location.href = "login.html";
    }
    document.getElementById("navEmail").innerHTML = localStorage.getItem('email');
    document.getElementById("username").innerHTML = localStorage.getItem('Name');
    document.getElementById("emailU").innerHTML = localStorage.getItem('email');

    var token = localStorage.getItem('token');
    var userid = localStorage.getItem('Id');
    var filtro = null;
    var initial = $("#previous").data('limit');

    if (initial == 0) {
        $("#previous").prop('disabled', true);
    }

    search(userid, filtro, initial, token);

    $("#filtro").keyup(function () {
        filtro = $("#filtro").val();
        fetch('https://localhost:44370/api/post/' + userid + '/' + filtro + '/' + initial + '/10', {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + token,
                "Content-type": "application/json"
            }
        })
            .then(response => {
                $("#accordionPanelsStayOpenExample").empty();
                if (response.status == 404) {
                    $("#accordionPanelsStayOpenExample").html("<h4>No hay contenido</h4>");
                } else if (response.status == 401) {
                    $("#accordionPanelsStayOpenExample").html("<h4>No autorizado</h4>");
                    localStorage.removeItem('token');
                    localStorage.removeItem('Id');
                    localStorage.removeItem('Name');
                    localStorage.removeItem('email');
                    window.location.reload;
                }
                else {
                    return response.json()
                }
            })
            .then(json => {
                if (json) {
                    var row = "";
                    for (var i = 0; i < json.length; i++) {
                        row += '<div class="accordion-item"><h2 class="accordion-header" id="panelsStayOpen-headingOne"><button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">' + json[i].titulo + '</button></h2><div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne"><img src="C:/Users/Jhoan/source/repos/PostApi/PostApi.WebApi/img/' + json[i].img + '" class="card-img-top" alt="..."><div class="accordion-body"><strong>' + json[i].titulo + '<br /><br /></strong>' + json[i].content + '</div>  <a href="deletePost.html?usuario=' + userid + '&post=' + json[i].id + '" class="deleteUser">Eliminar</a> </div></div><br />';
                    }
                    $("#accordionPanelsStayOpenExample").html(row);
                }
            })
    });

    $("#previous").click(function () {
        limit = $(this).data('limit');
        if (limit == 0) {
            $(this).prop('disabled', true);
            search(userid, filtro, limit, token);
        } else {
            limit = limit - 10;
            $(this).data('limit', limit);
            search(userid, filtro, limit, token);
        }
    });

    $("#next").click(function () {
        $("#previous").prop('enable', true);
        limit = $("#previous").data('limit');
        limit = limit + 10;
        $("#previous").data('limit', limit);
        search(userid, filtro, limit, token);
    });

    $("#logOut").click(function () {
        localStorage.removeItem('token');
        localStorage.removeItem('Id');
        localStorage.removeItem('Name');
        localStorage.removeItem('email');
        window.location.reload;
    });

    function search(userid, filtro, initial, token) {
        fetch('https://localhost:44370/api/post/' + userid + '/' + filtro + '/' + initial + '/10', {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + token,
                "Content-type": "application/json"
            }
        })
            .then(response => {
                $("#accordionPanelsStayOpenExample").empty();
                if (response.status == 404) {
                    $("#accordionPanelsStayOpenExample").html("<h4>No hay contenido</h4>");
                } else if (response.status == 401) {
                    $("#accordionPanelsStayOpenExample").html("<h4>No autorizado</h4>");
                    localStorage.removeItem('token');
                    localStorage.removeItem('Id');
                    localStorage.removeItem('Name');
                    localStorage.removeItem('email');
                    window.location.reload;
                }
                else {
                    return response.json()
                }
            })
            .then(json => {
                if (json) {
                    var row = "";
                    for (var i = 0; i < json.length; i++) {
                        row += '<div class="accordion-item"><h2 class="accordion-header" id="panelsStayOpen-headingOne"><button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">' + json[i].titulo + '</button></h2><div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne"><img src="C:/Users/Jhoan/source/repos/PostApi/PostApi.WebApi/img/' + json[i].img + '" class="card-img-top" alt="..."><div class="accordion-body"><strong>' + json[i].titulo + '<br /><br /></strong>' + json[i].content + '</div>  <a href="deletePost.html?usuario=' + userid + '&post=' + json[i].id + '" class="deleteUser">Eliminar</a> </div></div><br />';
                    }
                    $("#accordionPanelsStayOpenExample").html(row);
                }
            })
    }

});
