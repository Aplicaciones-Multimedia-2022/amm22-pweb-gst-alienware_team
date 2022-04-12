window.onload = function(){
    
    // ----- Variables ----- //
    // Canvas
    var canvas,ctx;
    var x;
    var y;
    var tamañoXImg = 35, tamañoYImg = 30;

    // ----- Teclas ----- //
    var MOVER_IZQ = "ArrowLeft";
    var MOVER_DRCH = "ArrowRight";
    var ESPACIO = " "; // caracter vacío == espacio
    var teclaPulsada = null;
    var tecla = [];

    // ----- Otros usos ----- //
    var imagen, imagenEnemigo;

    var colorBala = "red";
    var balas_array = new Array();
    var enemigos_array = new Array();

    //variables balas enemigos//
    var balasEnemigas_array = new Array();
    var de; //se crea esta variable para el tiempo de disparo de las balas enemigas//

    var fila_abajo = new Array(); //array con enemigos de la linea de abajo//
    
    canvas = document.getElementById("SpaceCanvas");
    ctx = canvas.getContext("2d");

    //color gradiente balas
    var degradado = ctx.createLinearGradient(0, 0, 0, 170);
    degradado.addColorStop(0, "red");
    degradado.addColorStop(1, "white");   
    
    var imagenBala;

    // PUNTOS/VIDAS
    var puntos = 0, vidas = 3;
    
    // ----- Constructor Bala ----- //
    function Bala(x,y,w){

        this.x = x;
        this.y = y;
        this.w = w;

        this.dibuja = function(){
            ctx.save();
            ctx.fillStyle = degradado;
            ctx.fillRect(this.x,this.y,this.w,this.w);
            this.y = this.y - 4;
            ctx.restore();
        };

        this.dispara = function(){
            ctx.save();
            ctx.fillStyle = colorBala;
            ctx.fillRect(this.x,this.y,this.w,this.w);
            this.y = this.y + 6;
            ctx.restore();
        }

    }
    
    // ----- Constructor Jugador ----- //
    function Jugador(x){
        
        this.x = x;
        this.y = 580;
        
        this.dibuja = function(x){
            this.x = x;
            ctx.drawImage(imagen, this.x, this.y, tamañoXImg, tamañoYImg);
        };
    }
    
    // ----- Constructor Enemigo ----- //
    function Enemigo(x,y){ // REVISAR (DAVID)
        
        this.x = x;
        this.y = y;
        this.w = 35;
        this.veces = 0;
        this.dx = 5; //numero de posiciones que se mueve hacia la izq o hacia la drch
        this.ciclos = 0;
        this.num = 14;
        this.figura = true;
        this.vive = true;

        this.dibuja = function(){ // REVISAR (DAVID)
            //Retraso//
            if(this.ciclos > 30){ //ciclos = velocidad//
                //saltitos
                if(this.veces>this.num){
                    this.dx *= -1;
                    this.veces = 0; 
                    this.num = 28; //numero de saltos que hace de drcha a izq o viceversa//
                    this.y += 20; // numero de saltos hacia abajo //
                    //var result = condition ? value1: value2 Se evalúa condition si es verdadera entonces devuelve value1 , de lo contrario value2. //
                    this.dx = (this.dx>0) ? this.dx++:this.dx--;
                }else{
                    this.x += this.dx;
                }
                this.veces++;
                this.ciclos = 0;
                this.figura = !this.figura;
            }else{
                this.ciclos++;

            }
            if(this.vive){

                    ctx.drawImage(imagenEnemigo,0,0,93,84,this.x,this.y,35,30);

            }else {
                ctx.fillStyle = "black";
                ctx.fillRect(this.x, this.y, 35, 30);
            }
            
        }
    
    }

    
    
    
    
    // ----- Genera la animacionción ----- //
    function animacion(){
        requestanimaciontionFrame(animacion);
        verificar();
        pinta();
        colisiones();
    }

    
    
    
    
    
    // ----- Comprueba movimiento de los objetos ----- //
    function verificar(){
        // NAVE //
        // Mover
        if (tecla[MOVER_DRCH]){
            x += 10;
        } else if (tecla[MOVER_IZQ]) {
            x -=10;
        }
        // verificar cañon
        if (x>canvas.width-tamañoXImg){
            x = canvas.width-tamañoXImg;
        }else if (x<0){
            x = 0;
        }

        // disparo 
        if (tecla[ESPACIO]){
            balas_array.push(new Bala (jugador.x + 12,jugador.y-3,5));
            tecla[ESPACIO] = false;
            disparaEnemigo();
        }
    }

    // ----- Pinta los objetos sobre el canvas ----- //
    function pinta(){
        ctx.clearRect(0,0,canvas.width,canvas.height);  // limpia el canvas
        // NAVE //
        jugador.dibuja(x); // REVISAR (DAVID)
        // BALAS //
        for(var i = 0;i<balas_array.length;i++){
            if (balas_array[i]!=null){
                balas_array[i].dibuja();
                if(balas_array[i].y<0){
                    balas_array[i] = null;
                }
            }
        }

        // ENEMIGOS //
        for (var i = 0; i<enemigos_array.length; i++){
            if (enemigos_array[i] != null){
                enemigos_array[i].dibuja();
            }
        }

        //balas enemigas//
        for(var i=0; i<balasEnemigas_array.length; i++){
            if (balasEnemigas_array[i]!=null){
                balasEnemigas_array[i].dispara();
                if (balasEnemigas_array[i].y>canvas.height){
                    balasEnemigas_array[i].dibuja();

                }
            }
        }
    }

    function colisiones(){
        for(var i=0; i<enemigos_array.length; i++){
            for(var j=0; j<balas_array.length; j++){
                enemigo = enemigos_array[i];
                bala = balas_array[j];
                if(enemigo != null && bala != null){
                    if((bala.x > enemigo.x) && (bala.x < enemigo.x+enemigo.w) && (bala.y > enemigo.y) && (bala.y < enemigo.y+enemigo.w)){
                        enemigo.vive = false;
                        enemigos_array[i] = null;
                        balas_array[j] = null;
                        
                        puntos++;
                        document.getElementById("puntos").innerHTML = puntos;
                        console.log(document.getElementById("puntos"));
                    }
                }
            }
        }
        for (var j = 0; j<balasEnemigas_array.length;j++){
            bala = balasEnemigas_array[j];
            if (bala != null){
                if ((bala.x > jugador.x) && (bala.x < jugador.x + tamañoXImg) && (bala.y > jugador.y) && (bala.y < jugador.y + tamañoYImg)){
                    gameOver();
                }
            }
        }
    }

   
   
   
   
    function disparaEnemigo(){
        
        for(var i=enemigos_array.length-1; i>0; i--){ //con este for conseguimos coger la linea de enemigos de abajo, si se quiere comprobar visualmente descomentar el console.logde la linea 236
            if (enemigos_array[i] != null){
                fila_abajo.push(i);
            }
            if (fila_abajo.length == 10){
                break
            }
        }
        //console.log(fila_abajo);
        d = fila_abajo[Math.floor(Math.random()*10)]; //math.floor devuelve el maximo entero menor o igual a math.random*10
        balasEnemigas_array.push( new Bala(enemigos_array[d].x + enemigos_array[d].w/2,enemigos_array[d].y,5));
    }

    function gameOver(){
        alert("ERES MALIIIIIIIISIMO");
        
    }

    // ----- Funciones de evento ----- //
    //informa al navegador que quieres realizar una animacionción y solicita que el navegador programe el repintado de la ventana para el próximo ciclo de animacionción. Se crea para detectar el tipo de objeto "requestanimaciontionFrame que utiliza el navegador que usamos"
    window.requestanimaciontionFrame = (function() {return window.requestanimaciontionFrame || window.webkitRequestanimaciontionFrame ||  window.mozRequestanimaciontionFrame || function(callback){window.setTimeout(callback,17);} })();


    //eventos para el teclado//
    document.addEventListener("keydown",function(e){
        teclaPulsada = e.key;
        tecla[e.key] = true;
    });
    document.addEventListener("keyup",function(e){
        tecla[e.key]=false;
    });

    
    
    
    
    // ----- Main ------ //

    //imagen nave//
    x = canvas.width/2;
    imagen = new Image();
    imagen.src = "../img/nave2.png"

    imagen.onload = function(){
        jugador = new Jugador(0);
        jugador.dibuja(canvas.width/2); 
        animacion();
    }

    //imagen enemigo//
    imagenEnemigo = new Image();
    imagenEnemigo.src = "../img/enemigo3.png"
    imagenEnemigo.onload = function(){
        for(var i = 0; i<5; i++){
            for (var j = 0; j<10; j++){
                enemigos_array.push(new Enemigo(100+40*j,30+45*i)); //push: añade uno o mas elementos al array y devuelve la nueva longitud del array
            }
        }
    }
    de = setTimeout(disparaEnemigo,1500); //cada 1,5 seg//
}
