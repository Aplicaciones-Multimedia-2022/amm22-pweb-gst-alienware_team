function iniciar_canvas(){
    canvas = document.getElementById("SpaceCanvas");
    ctx = canvas.getContext("2d");

    var nave        = new Image();
    var enemigos1   = new Image();
    var enemigos2   = new Image();
    var laser       = new Image();
    var powerup     = new Image();

    nave.src        = "../img/nave.png";
    enemigos1.src   = "../img/enemigo1.png";
    enemigos2.src   = "../img/enemigo2.png";
    laser.src       = "../img/laser.png";
    powerup.src     = "../img/powerup.png";

    var canvasAncho = ctx.canvas.width;
    var canvasAlto  = ctx.canvas.height;

    var enemigoPosicion = function(options){  //Nos devuelve informacion posicion enemiga
            return{
                id: options.id || '',
                x: options.x || '', 
                y: options.y || '', 
                w: options.w || '', //Ancho de la nave
                h: options.h || '', //Alto de la nave
                image : options.image || enemigos1

            }
    }
 
}

    var enemigos = [
        new enemigoPosicion({id : enemigo3, x : 350, y : 50, w: 80, h: 30})
    ];

//Cuando la pagina cargue, ejecutamos nuestra funcion "iniciar_canvas"
window.addEventListener("load", function(event){
    iniciar_canvas();
});