function fetchCategoryData(){
    $.ajax({
        url : "api/Category/all",
        type : 'GET',
        data : 'json',
        success : function(c) {
            //return c;
            $("#categoryIdLibrary").empty();
            for (let i=0; i < c.length; i++){
                let option = "<option value='" + c[i].id + "'>" + c[i].name + "</option>"
                $("#categoryIdLibrary").append(option);
            }
        },
        error : function(xhr, textStatus, error) {
            window.alert("Error al traer datos Categoria. Revise los datos y/o conexión con el servidor");
        },
        complete: function(){

        }
    });
}

function getCategories(){  //Funcion Get

    $.ajax({
        url : "api/Category/all",
        type : 'GET',
        dataType : 'json',

        success : function(Categories) {
            let cs = Categories;
            $("#listCategories").empty();

            let k = ""
            k += "<table class='tb'>";
            k += "<tr>";
            k += "<th class='hidden'>" + "Id" + "</th>";
            k += "<th>" + "Nombre" + "</th>";
            k += "<th>" + "Descripción" + "</th>";

            k += "</tr>";

             for(let i=0;i<cs.length;i++){
                k += "<tr>";
                k += "<td class='hidden'>" + cs[i].id + "</td>";
                k += "<td>" + cs[i].name + "</td>";
                k += "<td>" + cs[i].description + "</td>";

               // k += "<td>" + "<button onclick='getDetailCategory("+cs[i].id+")'>Actualizar</button> " + "</td>";
               // k += "<td>" + "<button onclick='deleteCategory("+cs[i].id+")'>Eliminar</button><br>" + "</td>";
                k += "</tr>";

            }
            k += "</table>";
            $("#listCategories").append(k);

        },
        error : function(xhr, status) {
            alert('Error al modificar la Categoría. Revise los datos y/o conexión con el servidor');
        }
    });
}

function saveCategory() {
    //let idCategory = $("#idCategory").val();
    let nameCategory =$("#nameCategory").val();
    let descriptionCategory =$("#descriptionCategory").val();

    let data={
        name:nameCategory,
        description:descriptionCategory
    };

    let dataToSend=JSON.stringify(data);
    //console.log(dataToSend);
    if (nameCategory === "" || descriptionCategory === ""){
        window.alert("Error. Campos vacios. Por favor ingresar datos");
    }else{
        $.ajax({
            url : "api/Category/save",
            type : 'POST',
            //   dataType : 'json',
            data:dataToSend,
            contentType:'application/json',
            success : function() {
                $("#nameCategory").val("");
                $("#descriptionCategory").val("");
            },
            error : function(xhr, textStatus, error) {
                window.alert("Error al crear la categoría. Revise los datos y/o conexión con el servidor");
            },
            complete: function(){
                getCategories();
            }
        });
    }

}