//su funcionalidad es la de ejecutar funciones una vez cargada en su totalidad una página web (DOM).
$(document).ready (function() {
    createLinks();
});

function createLinks(){
    // recorrer todas las etiquetas de h3 dentro de  "sectionLeft"
    var option = $("#sectionLeft h3");

    // Generar la opción de click para cada h3
    option.click(function() {
        // Se utiliza el id de cada h3 como nombre de seccion
        showSection(this.id)
    })
}

function showSection(fileHtml) {
//    $.ajax({url: "client.html",
    $.ajax({url: fileHtml + ".html",
        cache: true,

        success : function(answer){
            $("#sectionRight").html (answer);
            //window.alert(fileHtml);
            if (fileHtml === "library") {
                fetchCategoryData();
            }
            if (fileHtml === "message") {
                fetchLibraryData("message");
            }
            if (fileHtml === "reservation") {
                fetchLibraryData("reservation");
            }

            // $("#sectionRight").load()
        },
        error : function(xhr, status) {
            alert('Error- No se ha podido cargar la pagina ' + fileHtml);
        }

    })

}
