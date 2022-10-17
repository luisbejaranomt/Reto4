
function getClients(){  //Funcion Get
    $.ajax({
        url : "api/Client/all",
        type : 'GET',
        dataType : 'json',

        success : function(clients) {
            let cs = clients;
            $("#listClients").empty();

            let k = ""
            k += "<table class='tb'>";
            k += "<tr>";
            k += "<th class='hidden'>" + "Id" + "</th>";
            k += "<th>" + "Correo" + "</th>";
            k += "<th>" + "Contraseña" + "</th>";
            k += "<th>" + "Nombre" + "</th>";
            k += "<th>" + "Edad" + "</th>";
            k += "</tr>";
            for(let i=0;i<cs.length;i++){
                k += "<tr>";
                k += "<td class='hidden'>" + cs[i].idClient + "</td>";
                k += "<td>" + cs[i].email + "</td>";
                k += "<td class='hidden'>" + cs[i].password + "</td>";
                k += "<td>" + cs[i].name + "</td>";
                k += "<td>" + cs[i].age + "</td>";
                k += "<td>" + "<button onclick='setUserActive("+cs[i].idClient+")'>Seleccionar Código</button><br>" + "</td>";
                k += "<td>" + "<button onclick='getDetailClient("+cs[i].idClient+")'>Actualizar</button> " + "</td>";
                k += "<td>" + "<button onclick='deleteClient("+cs[i].idClient+")'>Eliminar</button><br>" + "</td>";
                k += "</tr>";

//                        $("#listClients").append(k);
            }
            k += "</table>";
            $("#listClients").append(k);

        },
        error : function(xhr, status) {
            alert('Error al listar  clientes. Revise los datos y/o conexión con el servidor');
        }
    });
}

function deleteClient(idClient){
    let data={
        idClient:idClient
    };
    let dataToSend=JSON.stringify(data);
    //console.log(dataToSend);
    $.ajax({
        url : "api/Client/" + idClient,
        type : 'DELETE',
        //   dataType : 'json',
        data:dataToSend,
        contentType:'application/json',
        success : function() {
            $("#idClient").val("");
            $("#nameClient").val("");
            $("#mailClient").val("");
            $("#ageClient").val("");
        },
        error : function(xhr, status) {
            //     alert('ha sucedido un problema');
        },
        complete: function(){
            getClients();
        }
    })
};


function updateClient(){
    let idClient=$("#idClient").val();
    let passwordClient=$("#passwordClient").val();
    let nameClient=$("#nameClient").val();
    let mailClient=$("#emailClient").val();
    let ageClient=$("#ageClient").val();
    if (idClient === "" || passwordClient === "" || nameClient === "" || mailClient === "" || ageClient === ""){
        window.alert("Error. Campos vacios. Por favor ingresar datos");
        return {
            error: true,
            message: 'Parametros Obligatorios'
        }
    }
    let data={
        idClient:idClient,
        password:passwordClient,
        name:nameClient,
        email:mailClient,
        age:ageClient,
    };
    let dataToSend=JSON.stringify(data);
    //console.log(dataToSend);
    $.ajax({
        url : "api/Client/update",
        type : 'PUT',
        //   dataType : 'json',
        data:dataToSend,
        contentType:'application/json',
        success : function() {
            $("#idClient").val("");
            $("#emailClient").val("");
            $("#passwordClient").val("");
            $("#nameClient").val("");
            $("#ageClient").val("");
        },
        error : function(xhr, status) {
            alert('Error al actualizar el cliente. Revise los datos y/o conexión con el servidor');
        },
        complete: function(){
            getClients();
        }
    });
}

function getDetailClient(idClient){
    $.ajax({
        url : "api/Client" + "/" + idClient,
        type : 'GET',
        dataType : 'json',

        success : function(clients) {
            let cs = clients;
            $("#idClient").val(cs.idClient);
            $("#emailClient").val(cs.email);
            $("#passwordClient").val(cs.password);
            $("#nameClient").val(cs.name);
            $("#ageClient").val(cs.age);
            $("#ageClient").val(cs.age);
        },
        error : function(xhr, status) {

            window.alert('Error al traer datos del cliente');
        }
    });
}



function saveClient() {
//    let idClient=$("#idClient").val();
    let emailClient=$("#emailClient").val();
    let passwordClient=$("#passwordClient").val();
    let nameClient=$("#nameClient").val();
    let ageClient=$("#ageClient").val();

    let data={
        //id:idClient,
        name:nameClient,
        email:emailClient,
        password:passwordClient,
        age:ageClient
    };

    let dataToSend=JSON.stringify(data);
    //console.log(dataToSend);

    if (nameClient === "" || emailClient === "" || passwordClient === "" || ageClient === ""){
        window.alert("Error. Campos vacíos. Por favor ingresar datos");
        return {
            error: true,
            message: 'Parametros Obligatorios'
        }
    }

    $.ajax({
        url : 'api/Client/save',
        type : 'POST',
        //   dataType : 'json',
        data:dataToSend,
        contentType:'application/json',
        success : function() {
           // $("#idClient").val("");
            $("#emailClient").val("");
            $("#passwordClient").val("");
            $("#nameClient").val("");
            $("#ageClient").val("");
        },
        error : function(xhr, textStatus, error) {
            window.alert("Error al crear el cliente. Revise los datos y/o conexión con el servidor");
        },
        complete: function(){
            getClients();
        }
    });

}

function setUserActive(idClient) {
    //let idClientSelect=$("#idClient").val();
    $("#idUserActive").val(idClient)
   // window.alert(idClient);

}

