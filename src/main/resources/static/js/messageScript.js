function getMessages(){  //Funcion Get
    $.ajax({
        url : 'api/Message/all',
        type : 'GET',
        dataType : 'json',

        success : function(Messages) {
            let cs = Messages;
            $("#listMessages").empty();

            let k = ""
            k += "<table class='tb'>";
            k += "<tr>";
            k += "<th class='hidden'>" + "Id" + "</th>";
            k += "<th>" + "Mensaje" + "</th>";
            k += "<th>" + "Cubículo" + "</th>";
            k += "<th>" + "Descripción" + "</th>";
            k += "<th>" + "Cliente" + "</th>";
            k += "<th>" + "Nombre" + "</th>";
            k += "</tr>";
            for(let i=0; i < cs.length; i++){
                k += "<tr>";
                k += "<td class='hidden'>" + cs[i].idMessage + "</td>";
                k += "<td>" + cs[i].messageText + "</td>";
                k += "<td>" + cs[i].lib.id + "</td>";
                k += "<td>" + cs[i].lib.name + "</td>";
                k += "<td>" + cs[i].client.idClient + "</td>";
                k += "<td>" + cs[i].client.name + "</td>";

               // k += "<td>" + "<button onclick='getDetailMessage("+cs[i].id+")'>Actualizar</button> " + "</td>";
               // k += "<td>" + "<button onclick='deleteMessage("+cs[i].id+")'>Eliminar</button><br>" + "</td>";
                k += "</tr>";

//                        $("#listMessages").append(k);
            }
            k += "</table>";
            $("#listMessages").append(k);

        },
        error : function(xhr, status) {
            alert('Error al modificar el Mensaje. Revise los datos y/o conexión con el servidor');
        }
    });
}

function getMessageData(){

    let data ={
        //idMessage:$("#idMessage").val(),
        messageText:$("#messageTextMessage").val(),
        lib:{
            id:$("#libraryIdMessage option:selected").val(),
        },
        client:{
            idClient:$("#idUserActive").val(),
        },
    }
    return data;
    //{"target":"Lectura4","capacity":5,"category":{"id":1},"name":"Sala de lectura para 5 personas","description":"Sala de lectura para 5 personas"}
}

function saveMessage() {
    if ($("#idUserActive").val() === ""){
        window.alert("Error. Debe Seleccionar un código de cliente - Opción Clientes - Listar - Seleccionar Código.");
        return {
            error: true,
            message: 'Parametros Obligatorios'
        }
    }

    let dataMess = getMessageData();
    let dataToSend=JSON.stringify(dataMess);

    if (dataMess.messageText === "" || dataMess.lib.id === "" ){
        window.alert("Error. Campos vacíos. Por favor ingresar datos");
        return {
            error: true,
            message: 'Parametros Obligatorios'
        }
    }


    $.ajax({
        url : 'api/Message/save',
        type : 'POST',
        //   dataType : 'json',
        data:dataToSend,
        contentType:'application/json',
        success : function() {
            $("#idMessage").val("");
            $("#messageTextMessage").val("");
        },
        error : function(xhr, textStatus, error) {
            window.alert("Error al crear el Mensaje. Revise los datos y/o conexión con el servidor");
        },
        complete: function(){
            getMessages();
        }
    });

}
