//$("document").ready(function(){
//    window.alert("xyz");
//    fetchCategoryData();
//});

function fetchLibraryData(fileHtml){
    $.ajax({
        url : "api/Lib/all",
        type : 'GET',
        data : 'json',
        success : function(c) {
            //return c;
            if (fileHtml === "message"){
                $("#libraryIdMessage").empty();
            }
            if (fileHtml === "reservation"){
                $("#libraryIdReservation").empty();
            }
            for (let i=0; i < c.length; i++){
                let option = "<option value='" + c[i].id + "'>" + c[i].name + "</option>"
                if (fileHtml === "message"){
                    $("#libraryIdMessage").append(option);
                }
                if (fileHtml === "reservation"){
                    $("#libraryIdReservation").append(option);
                }
            }
        },
        error : function(xhr, textStatus, error) {
            window.alert("Error al traer datos Categoria. Revise los datos y/o conexión con el servidor");
        },
        complete: function(){

        }
    });
}

function getLibraries(){  //Funcion Get
    $.ajax({
        url : "api/Lib/all",
        type : 'GET',
        dataType : 'json',

        success : function(libraries) {
            let cs = libraries;
            $("#listLibraries").empty();

            let k = ""
            k += "<table class='tb'>";
            k += "<tr>";
            k += "<th class='hidden'>" + "Id" + "</th>";
            k += "<th>" + "Objetivo" + "</th>";
            k += "<th>" + "Capacidad" + "</th>";
            k += "<th>" + "Categoría" + "</th>";
            k += "<th>" + "Nombre" + "</th>";
            k += "</tr>";
            for(i=0;i<cs.length;i++){
                k += "<tr>";
                k += "<td class='hidden'>" + cs[i].id + "</td>";
                k += "<td>" + cs[i].target + "</td>";
                k += "<td>" + cs[i].capacity + "</td>";
                k += "<td>" + cs[i].category.name + "</td>";
                k += "<td>" + cs[i].name + "</td>";
              //  k += "<td>" + "<button onclick='getDetailLibrary("+cs[i].id+")'>Actualizar</button> " + "</td>";
              //  k += "<td>" + "<button onclick='deleteLibrary("+cs[i].id+")'>Eliminar</button><br>" + "</td>";
                k += "</tr>";

//                        $("#listlibraries").append(k);
            }
            k += "</table>";
            $("#listLibraries").append(k);

        },
        error : function(xhr, status) {
            alert('Error al modificar el librarye. Revise los datos y/o conexión con el servidor');
        }
    });
}

function getLibraryData(){

    let data ={
        target:$("#targetLibrary").val(),
        capacity:$("#capacityLibrary").val(),
        category:{
            id:$("#categoryIdLibrary option:selected").val(),
        },
        name:$("#nameLibrary").val(),
        description:$("#descriptionLibrary").val()
    }
    return data;
    //{"target":"Lectura4","capacity":5,"category":{"id":1},"name":"Sala de lectura para 5 personas","description":"Sala de lectura para 5 personas"}
}

function saveLibrary() {
    //let idLibrary=$("#idLibrary").val();
    //let targetLibrary=$("#targetLibrary").val();
    //let capacityLibrary=$("#capacityLibrary").val();
    //let categoryIdLibrary=$("#categoryIdLibrary").val();
    //let nameLibrary=$("#nameLibrary").val();
    //let dataLib={
        //id:idLibrary,
    //    target:targetLibrary,
    //    capacity:capacityLibrary,
    //    category_id:categoryIdLibrary,
    //    name:nameLibrary
    //};
    let dataLib = getLibraryData();
    let dataToSend=JSON.stringify(dataLib);
    //console.log(dataToSend);

    if (dataLib.target === "" || dataLib.capacity === "" || dataLib.name === "" || dataLib.category.id === ""){
        window.alert("Error. Campos vacíos. Por favor ingresar datos");
        return {
            error: true,
            message: 'Parametros Obligatorios'
        }
    }

    $.ajax({
        url : 'api/Lib/save',
        type : 'POST',
        //   dataType : 'json',
        data:dataToSend,
        contentType:'application/json',
        success : function() {
           // $("#idLibrary").val("");
            $("#targetLibrary").val("");
            $("#capacityLibrary").val("");
            $("#categoryIdLibrary").val("");
            $("#nameLibrary").val("");
            $("#descriptionLibrary").val("");

        },
        error : function(xhr, textStatus, error) {
            window.alert("Error al crear el Cubículo. Revise los datos y/o conexión con el servidor");
        },
        complete: function(){
            getLibraries();
        }
    });
}
