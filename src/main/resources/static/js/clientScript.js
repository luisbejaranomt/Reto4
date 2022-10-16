
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

               // k += "<td>" + "<button onclick='getDetailClient("+cs[i].id+")'>Actualizar</button> " + "</td>";
               // k += "<td>" + "<button onclick='deleteClient("+cs[i].id+")'>Eliminar</button><br>" + "</td>";
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

