window.onload = function() {
    // CREACIÓN DE VARIABLES LOCALES
    var canvas, ctx;


    // IMPORTACIÓN DE ELEMENTOS DEL DOM
    canvas = document.getElementById("SpaceCanvas");
    ctx = canvas.getContext("2d");

    // DEFINICIÓN DE OBJETOS

       function drawNave(){
           var img = new Image
           img.src = "../img/greynave.png"

           //Nos aseguramos que la imagen este descargada antes de poder usarla
             img.onload = function(){
            ctx.drawImage(img, 300, 300);
        
            }
        }
        
        function drawAliens(){

       }

       function drawShoot(){

       }
        
       //LLAMAR A FUNCIONES PRUEBA
         drawNave();


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
