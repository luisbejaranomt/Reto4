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
                //  k += "<td>" + "<button onclick='getDetailReservation("+cs[i].idReservation+")'>Actualizar</button> " + "</td>";
                //  k += "<td>" + "<button onclick='deleteReservation("+cs[i].idReservation+")'>Eliminar</button><br>" + "</td>";
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

