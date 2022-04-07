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

    }

    // FUNCIONES PINTAR OBJETOS
    function drawNave() {
        // Importamos la imagen del objeto
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



    // MÁS COSILLAS
    // var drawPicture  = function() {
    //     // Gestiono el tamaño de la imagen
    //     let resizeX = 30;
    //     let resizeY = 30;
    //     let posX = xBall - (resizeX / 2);
    //     let posY = yBall - (resizeY / 2);
    //     // Cargo y muestro la imagen
    //     var img = new Image();
    //     img.src = "fifa_ball.png";
    //     img.onload = function() {
    //         context.drawImage(img, posX, posY, resizeX, resizeY);
    //     }
    // }

    // var keybordDown = function (e) {
    //     // Arriba 38; abajo 40 --> https://keycode.info/
    //     // console.log("Se ha llamado al escuchador con la tecla: " + e.keycode);
    //     switch (e.which) { // e.which --> nº de tecla que lanza el evento
    //         case 38:
    //             // console.log("Tecla de arriba");
    //             stateRaket = -1;
    //             break;
    //         case 40:
    //             // console.log("Tecla de abajo");
    //             stateRaket = 1;
    //             break;
    //         default:
    //             // console.log("Default");
    //             break;
    //     }
    // }
    // LINK PARA SACAR LOS CÓDIGOS DE LAS TECLAS: https://keycode.info/
