window.onload = function(){
    
    //Variables//
    var canvas,ctx;
    var x = 100;
    var y = 100;
    var tamañoXImg = 35, tamañoYImg = 30;

    // var KEY_ENTER = 13;
    var KEY_LEFT = "ArrowLeft";
    // var KEY_UP = 38;
    var KEY_RIGHT = "ArrowRight";
    // var KEY_DOWN = 40;
    var BARRA = " "; // caracter vacío == espacio
    var imagen, imagenEnemigo;

    var teclaPulsada = null;
    var tecla = [];
    var colorBala = "red";
    var balas_array = new Array();
    var enemigos_array = new Array();

    canvas = document.getElementById("SpaceCanvas");
    ctx = canvas.getContext("2d");

    //contrucot Bala//
    function Bala(x,y,w){

        this.x = x;
        this.y = y;
        this.w = w;
        this.dibuja = function(){
            ctx.save();
            ctx.fillStyle = colorBala;
            ctx.fillRect(this.x,this.y,this.w,this.w);
            this.y = this.y - 4;
            ctx.restore();
        };

    }
    
    //Constructor Jugador//
    function Jugador(x){
        
        this.x = x;
        this.y = 580;
        this.dibuja = function(x){
            this.x = x;
            ctx.drawImage(imagen, this.x, this.y, tamañoXImg, tamañoYImg);
        };
    }
    
    //Construcot Enemigo//
    function Enemigo(x,y){
        
        this.x = x;
        this.y = y;
        this.w = 35;
        this.veces = 0;
        this.dx = 5;
        this.ciclos = 0;
        this.num = 14;
        this.figura = true;
        this.vive = true;
        this.dibuja = function(){
            //Retraso//
            if(this.ciclos > 30){
                if(this.veces>this.num){
                    this.dx *= -1;
                    this.veces = 0;
                    this.num = 28;
                    this.y += 20;
                    //no se que pollas hace esto la vdd//
                    this.dx = (this.dx>0) ? this.dx++:this.dx--;
                }else{
                    this.x += this.dx;
                }
                this.veces++;
                this.ciclos = 0;
            }else{
                this.ciclos++;

            }
            ctx.drawImage(imagenEnemigo,0,0,93,84,this.x,this.y,35,30);
        };
    
    }

    function anima(){
        requestAnimationFrame(anima);
        verifica();
        pinta();
    }

    function verifica(){
        if (tecla[KEY_RIGHT]){
            x += 10;
        }else if (tecla[KEY_LEFT]) {
            x -=10;
        }
        //verifica cañon//
        if (x>canvas.width-tamañoXImg){
            x = canvas.width-tamañoXImg;
        }else if (x<0){
            x = 0;
        }
        //Disparo//
        if (tecla[BARRA]){
            balas_array.push(new Bala (jugador.x + 12,jugador.y-3,5));
            tecla[BARRA] = false;
        }
    }

    function pinta(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        jugador.dibuja(x);
        //pintar balas//
        for(var i = 0;i<balas_array.length;i++){
            if (balas_array[i]!=null){
                balas_array[i].dibuja();
                if(balas_array[i].y<0){
                    balas_array[i] = null;
                }
            }
        }
        //pintar enemigos//
        for (var i = 0; i<enemigos_array.length; i++){
            enemigos_array[i].dibuja();
        }
    }

    //informa al navegador que quieres realizar una animación y solicita que el navegador programe el repintado de la ventana para el próximo ciclo de animación. Se crea para detectar el tipo de objeto "requestAnimationFrame que utiliza el navegador que usamos"
    window.requestAnimationFrame = (function(){return window.requestAnimationFrame || window.webkitRequestAnimationFrame ||  window.mozRequestAnimationFrame || function(callback){window.setTimeout(callback,17);}    })();


    //eventos para el teclado//
    document.addEventListener("keydown",function(e){
        teclaPulsada = e.key;
        tecla[e.key] = true;
    });
    document.addEventListener("keyup",function(e){tecla[e.key]=false;
    });

    
    //imagen nave//
    x = canvas.width/2;
    imagen = new Image();
    imagen.src = "../img/nave.png"

    imagen.onload = function(){
        jugador = new Jugador(0);
        jugador.dibuja(canvas.width/2); 
        anima();
    }

    //imagen enemigo//
    imagenEnemigo = new Image();
    imagenEnemigo.src = "../img/enemigo1.png"
    imagenEnemigo.onload = function(){
        for(var i = 0; i<5; i++){
            for (var j = 0; j<10; j++){
                enemigos_array.push(new Enemigo(100+40*j,30+45*i));
            }
        }
    }
}
