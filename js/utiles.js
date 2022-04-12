// window.onload = function (e) {
// ----- BASE DE DATOS (indexedDB) ----- //
// ----- Comienzo ----- //
// Definimos el objeto de la base de datos (para todos los navegadores) //
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

function empezarBD() {
    // "Abrimos" nuestra base de datos == abrir/crear si no existe aún //
    var BD = indexedDB.open("puntuaciones", 1); // versión = 1

    // Esta función se ejecutará cuando se actualice la versión de la base de datos, sea al crearla o al actualizarla. Se encarga de editar las colecciones de objetos de nuestra BD //
    BD.onupgradeneeded = function (e) {
        // Recuperamos la conexión con la BD //
        var BDActiva = BD.result;

        // Y definimos la estructura que seguirá nuestra BD: la base de datos va a almacenar una colección de "partidas", que se incrementan automáticamente según entren en la BD por su valor "id" //
        var BDObjetos = BDActiva.createObjectStore("partidas", { keyPath: 'id', autoIncrement: true });

        // Puedo añadir claves para filtrar los objetos puntuación:
        // BDObjetos.createIndex('name', 'field', options); //
        // name: El nombre que le vamos a dar al índice.
        // field: El nombre de la propiedad que se almacenará en el índice.
        // options: Objeto con las opciones del índice
        // unique: Booleano para indicar si el índice debe ser único o no.

    };

    // Compruebo que la BD se crea correctamente //
    BD.onsuccess = function (e) {
        console.log("BD creada!");
    };

}

    // -----  ----- //

// }