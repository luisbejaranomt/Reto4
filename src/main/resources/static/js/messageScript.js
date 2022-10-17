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

                k += "<td>" + "<button onclick='getDetailMessage("+cs[i].idMessage+")'>Actualizar</button> " + "</td>";
                k += "<td>" + "<button onclick='deleteMessage("+cs[i].idMessage+")'>Eliminar</button><br>" + "</td>";
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
function initializeDataMessage(){
    $("#idMessage").val("");
    $("#messageTextMessage").val("");
    $("#libraryIdMessage").val("");
    return;
}

function deleteMessage(idMessage){
    window.alert("aaa  " + idMessage)
    let data = {
        id: idMessage,
    };
    let dataToSend = JSON.stringify(data);

    $.ajax({
        url: "api/Message/" + idMessage,
        type: 'DELETE',
        //   dataType : 'json',
        data: dataToSend,
        contentType: 'application/json',
        success: function () {
            initializeDataMessage()
        },
        error: function (xhr, status) {
            //     alert('ha sucedido un problema');
        },
        complete: function () {
            getMessages();
        }
    });
}

function getDetailMessage(idMessage){
    $.ajax({
        url : "api/Message" + "/" + idMessage,
        type : 'GET',
        dataType : 'json',

        success : function(messages) {
            let ms = messages;
            $("#idMessage").val(ms.idMessage);
            $("#messageTextMessage").val(ms.messageText);
            $("#libraryIdMessage").val(ms.lib.id);

        },
        error : function(xhr, status) {

            alert('Error al traer datos de la categpría');
        }
    });
}

function updateMessage(){
    if ($("#idUserActive").val() === ""){
        window.alert("Error. Debe Seleccionar un código de cliente - Opción Clientes - Listar - Seleccionar Código.");
        return {
            error: true,
            message: 'Parametros Obligatorios'
        }
    }

    let idMessage=$("#idMessage").val();
    let messageTextMessage=$("#messageTextMessage").val();
    let libraryIdMessage=$("#libraryIdMessage").val();
    if (idMessage === "" || messageTextMessage === "" || libraryIdMessage === ""){
        window.alert("Error. Campos vacios. Por favor ingresar datos");
        return {
            error: true,
            message: 'Parametros Obligatorios'
        }
    }

    let data={
        idMessage:idMessage,
        messageText:messageTextMessage,
        lib:{
            id:libraryIdMessage
        },
        client:{
            idClient: $("#idUserActive").val(),
        }
    };

    let dataToSend=JSON.stringify(data);

    $.ajax({
        url : "api/Message/update",
        type : 'PUT',
        //   dataType : 'json',
        data:dataToSend,
        contentType:'application/json',
        success : function() {
            initializeDataMessage()
        },
        error : function(xhr, status) {
            window.alert('Error al actualizar el cliente. Revise los datos y/o conexión con el servidor');
        },
        complete: function(){
            getMessages();
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
