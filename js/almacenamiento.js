$(document).ready(function(){
    $('#boton-guardar').click(function(){
        /*Captura de datos escrito en los inputs*/
        var nom = document.getElementById("nombretxt").value;

        /*Guardando los datos en el LocalStorage*/
        localStorage.setItem("Nombre", nom);

        localStorage.getItem("Nombre");

        /*Limpiando los campos o inputs*/
        document.getElementById("nombretxt").value = "";
        
        document.getElementById("nombre").innerHTML = nom;


    });
});

/*Funcion Cargar y Mostrar datos*/
$(document).ready(function(){
    $('#boton-cargar').click(function(){
        /*Obtener datos almacenados*/
        var nombre = localStorage.getItem("Nombre");

        /*Mostrar datos almacenados*/
        document.getElementById("nombre").innerHTML = nombre;

    });
});
