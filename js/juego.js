window.onload = function () {
    // CREACIÓN DE VARIABLES GLOBALES
    var canvas, ctx;
    var xNave, xAlien, yAlien, xDisparo, yDisparo;   // xDisparo = xNave en cada momento;
    const yNave = 540;
    var dxNave, dxAlien, dyAlien, dxDisparo, dyDisparo;

    // FUNCIÓN DE INICIO
    function init() {
        // IMPORTACIÓN DE ELEMENTOS DEL DOM
        canvas = document.getElementById("SpaceCanvas");
        ctx = canvas.getContext("2d");

        // VALORES INICIALES DE LAS VARIABLES
        // Coordenadas objetos
        xNave = 250;
        xAlien = 250;
        yAlien = 5;
        xDisparo = xNave + 25;
        yDisparo = yNave - 40;

    }

    // FUNCIONES GESTIONAR MOVIMIENTO
    function moveNave(xNave) {
        dxNave = 5;
        return xNave + dxNave;

    // IMPORTACIÓN DE ELEMENTOS DEL DOM
    canvas = document.getElementById("SpaceCanvas");
    ctx = canvas.getContext("2d");
    }

    // DEFINICIÓN DE OBJETOS
    // FUNCIONES PINTAR OBJETOS
    function drawNave() {
        // Importamos la imagen del objeto
        var img = new Image;
        img.src = "../img/greynave.png";

       function drawNave(){
           var img = new Image;
           img.src = "../img/greynave.png";
        //Gestionamos el tamaño de la imagen
        let resizeX = 50;
        let resizeY = 50;

        // Actualizamos la posición de la nave
        // xNave = moveNave(xNave);

        //Nos aseguramos que la imagen este descargada antes de poder usarla
        img.onload = function () {
            ctx.drawImage(img, moveNave(xNave), yNave, resizeX, resizeY);

           //Nos aseguramos que la imagen este descargada antes de poder usarla
             img.onload = function(){
            ctx.drawImage(img, 250, 540, resizeX, resizeY);
        
            }
        }
        
        function drawAliens(){
            var img = new Image;
            img.src = "../img/redalien.png";

            //Gestionamos el tamaño de la imagen
           let resizeX = 50;
           let resizeY = 50;
           
           img.onload = function(){
           ctx.drawImage(img, 250, 100, resizeX, resizeY);
        
            }
       }

        function drawShoot(){
            var img = new Image;
            img.src = "../img/redlaser.png";
        
            img.onload = function(){
            ctx.drawImage(img, 250, 200);

             }
    }

    function drawAliens() {
        // Importamos la imagen del objeto
        var img = new Image;
        img.src = "../img/redalien.png";

        //Gestionamos el tamaño de la imagen
        let resizeX = 50;
        let resizeY = 50;

        img.onload = function () {
            ctx.drawImage(img, xAlien, yAlien, resizeX, resizeY);

        }
        
       //LLAMAR A FUNCIONES PRUEBA
         drawNave();
         drawAliens();
         drawShoot();
    }

    function drawShoot() {
        // Importamos la imagen del objeto
        var img = new Image;
        img.src = "../img/redlaser.png";

        let resizeX = 9;
        let resizeY = 40;

        img.onload = function () {
            ctx.drawImage(img, xDisparo, yDisparo, resizeX, resizeY);

        }
    }


    //LLAMAR A FUNCIONES PRUEBA
    init();
    // xNave = 200;
    drawNave();
    drawAliens();
    drawShoot();



       }
    }
}