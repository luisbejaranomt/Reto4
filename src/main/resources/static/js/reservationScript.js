function getReservations(){  //Funcion Get
    $.ajax({
        url : "api/Reservation/all",
        type : 'GET',
        dataType : 'json',

        success : function(reservations) {
            let re = reservations;
            $("#listReservations").empty();

            let k = ""
            k += "<table class='tb'>";
            k += "<tr>";
            k += "<th class='hidden'>" + "Id" + "</th>";
            k += "<th>" + "Fecha&nbsp;Inicio" + "</th>";
            k += "<th>" + "Fecha&nbsp;Devolución" + "</th>";
            //k += "<th>" + "Estado" + "</th>";
            k += "<th>" + "Cubiculo" + "</th>";
            k += "<th>" + "Cliente" + "</th>";

            k += "</tr>";
            for(let i=0; i<re.length; i++){
                k += "<tr>";
                k += "<td class='hidden'>" + re[i].idReservation + "</td>";
                //k += "<td>" + re[i].startDate.substring(0, 10) + "</td>";
                //let startDate = new Date(re[i].startDate);
                //let startDateFormat = startDate.getUTCFullYear() + "-" +
                //    parseInt(startDate.getUTCMonth() + 1 ) + "-" + //el mes inicia desde 0. Por eso se suma 1
                //    startDate.getUTCDate()
                //let startDate = new Date(re[i].startDate);

                k += "<td>" + formatDate(re[i].startDate) + "</td>";
                k += "<td>" + formatDate(re[i].devolutionDate) + "</td>";
                k += "<td>" + re[i].lib.name + "</td>";
                k += "<td>" + re[i].client.name + "</td>";
                k += "<td>" + "<button onclick='getDetailReservation("+re[i].idReservation+")'>Actualizar</button> " + "</td>";
                k += "<td>" + "<button onclick='deleteReservation("+re[i].idReservation+")'>Eliminar</button><br>" + "</td>";
                k += "</tr>";
            }
            k += "</table>";
            $("#listReservations").append(k);

        },
        error : function(xhr, status) {
            alert('Error al listar Reservaciones. Revise los datos y/o conexión con el servidor');
        }
    });
}

function deleteReservation(idReservation){
    let data = {
        id: idReservation,
    };
    let dataToSend = JSON.stringify(data);

    $.ajax({
        url: "api/Reservation/" + idReservation,
        type: 'DELETE',
        //   dataType : 'json',
        data: dataToSend,
        contentType: 'application/json',
        success: function () {
            initializeDataReservation();
        },
        error: function (xhr, status) {
            //     alert('ha sucedido un problema');
        },
        complete: function () {
            getReservations();
        }
    });
}

function initializeDataReservation(){
    $("#idReservation").val("");
    $("#startDateReservation").val("");
    $("#devolutionDateReservation").val("");
    $("#libraryIdReservation").val("");
    return;
}
function getReservationData(){
    let data ={
        startDate:$("#startDateReservation").val(),
        devolutionDate:$("#devolutionDateReservation").val(),
        lib:{
            id:$("#libraryIdReservation option:selected").val(),
        },
        client:{
            idClient:$("#idUserActive").val(),
        },
    }
    return data;
}

function getDetailReservation(isReservation){
    $.ajax({
        url : "api/Reservation" + "/" + isReservation,
        type : 'GET',
        dataType : 'json',

        success : function(reservations) {
            let rs = reservations;
            $("#idReservation").val(rs.idReservation);
            $("#startDateReservation").val(formatDate(rs.startDate));
            $("#devolutionDateReservation").val(formatDate(rs.devolutionDate));
            $("#libraryIdReservation").val(rs.lib.id);
        },
        error : function(xhr, status) {

            alert('Error al traer datos de Reservación');
        }
    });
}

function updateReservation(){
    if ($("#idUserActive").val() === ""){
        window.alert("Error. Debe Seleccionar un código de cliente - Opción Clientes - Listar - Seleccionar Código.");
        return {
            error: true,
            message: 'Parametros Obligatorios'
        }
    }

    let idReservation=$("#idReservation").val();
    let startDateReservation=$("#startDateReservation").val();
    let devolutionDateReservation=$("#devolutionDateReservation").val();
    let libraryIdReservation=$("#libraryIdReservation").val();

    if (idReservation === "" || startDateReservation === "" || devolutionDateReservation === "" ||
        libraryIdReservation === ""){
        window.alert("Error. Campos vacios. Por favor ingresar datos");
        return {
            error: true,
            message: 'Parametros Obligatorios'
        }
    }

    if (startDateReservation > devolutionDateReservation ){
        window.alert("Error. Fecha Inicial mayor que Fecha Devolución");
        return {
            error: true,
            message: 'Parametros Obligatorios'
        }
    }

    let data={
        idReservation:idReservation,
        startDate:startDateReservation,
        devolutionDate:devolutionDateReservation,
        lib:{
            id:libraryIdReservation
        },
        client:{
            idClient: $("#idUserActive").val(),
        }
    };

    let dataToSend=JSON.stringify(data);

    $.ajax({
        url : "api/Reservation/update",
        type : 'PUT',
        //   dataType : 'json',
        data:dataToSend,
        contentType:'application/json',
        success : function() {
            initializeDataReservation()
        },
        error : function(xhr, status) {
            window.alert('Error al actualizar la reservación. Revise los datos y/o conexión con el servidor');
        },
        complete: function(){
            getReservations();
        }
    });

}

function saveReservation() {
    if ($("#idUserActive").val() === ""){
        window.alert("Error. Debe Seleccionar un código de cliente - Opción Clientes - Listar - Seleccionar Código.");
        return {
            error: true,
            message: 'Parametros Obligatorios'
        }
    }
    let dataRes = getReservationData();
    let dataToSend=JSON.stringify(dataRes);
    //console.log(dataToSend);

    if (dataRes.startDate === "" || dataRes.devolutionDate === "" || dataRes.lib.id  === ""){
        window.alert("Error. Campos vacíos. Por favor ingresar datos");
        return {
            error: true,
            message: 'Parametros Obligatorios'
        }
    }

    if (dataRes.startDate > dataRes.devolutionDate ){
        window.alert("Error. Fecha Inicial mayor que Fecha Devolución");
        return {
            error: true,
            message: 'Parametros Obligatorios'
        }
    }


    $.ajax({
        url : 'api/Reservation/save',
        type : 'POST',
        //   dataType : 'json',
        data:dataToSend,
        contentType:'application/json',
        success : function() {
            // $("#idLibrary").val("");
            $("#startDateReservation").val("");
            $("#devolutionDateReservation").val("");
            $("#libraryIdReservation").val("");
        },
        error : function(xhr, textStatus, error) {
            window.alert("Error al crear el Cubículo. Revise los datos y/o conexión con el servidor");
        },
        complete: function(){
            getReservations();
        }
    });
}

