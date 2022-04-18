window.onload = function(){

    // ----- Variables ----- //
    // Canvas
    var canvas,ctx;
    var x;
    var y;
    const tamañoXImg = 35, tamañoYImg = 30;

    // ----- Teclas ----- //
    const MOVER_IZQ = "ArrowLeft";
    const MOVER_DRCH = "ArrowRight";
    const ESPACIO = " "; // caracter vacío == espacio
    var teclaPulsada;
    var tecla;

    // ----- Otros usos ----- //
    var imagen, imagenEnemigo;

    const colorBala = "red";
    var balas_array;
    var enemigos_array;

    //variables balas enemigos//
    var balasEnemigas_array;
    var disparo_interval; //se crea esta variable para el tiempo de disparo de las balas enemigas//

    var fila_abajo; //array con enemigos de la linea de abajo//

    var id_request;


    //color gradiente balas
    var degradado;


    var imagenBala;

    // PUNTOS/VIDAS
    var puntos;
    var vidas;

    //NIVELES
    var nivel;

    var variable_ciclos;
    var variable_saltos;
    var variable_balas; //Preguntar a David (Checa)

    function borrar_init() {

        canvas = document.getElementById("SpaceCanvas");
        ctx = canvas.getContext("2d");

        //borrar variables//
        ctx.clearRect(0,0,canvas.width,canvas.height);

        //incializar variables//


        teclaPulsada = null;
        tecla = [];
        balas_array = new Array();
        enemigos_array = new Array();
        balasEnemigas_array = new Array();
        fila_abajo = new Array();
        degradado = ctx.createLinearGradient(0, 0, 0, 170);
        degradado.addColorStop(0, "red");
        degradado.addColorStop(1, "white");
        puntos = 0;
        vidas = 3;
    }


    function nivel1(){
        variable_ciclos = 50; //mas ciclos mas despacio//
        variable_saltos = 10;
        borrar_init();
        comenzarJuego();
    }

    function nivel2(){
        variable_ciclos = 20;
        variable_saltos = 20;
        borrar_init();
        comenzarJuego();
    }

    //document.getElementById("boton1").onclick = function() {nivel1};
    //document.getElementById("boton2").onclick = function() {nivel2};

    document.getElementById("boton1").addEventListener("click",nivel1);
    document.getElementById("boton2").addEventListener("click",nivel2);


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
    function Enemigo(x,y){

        this.x = x;
        this.y = y;
        this.w = 35;
        this.veces = 0; // número de saltitos que lleva
        this.dx = 6; //numero de posiciones que se mueve hacia la izq o hacia la drch
        this.ciclos = 0;
        this.num = 14; // número de saltitos máximos que da hacia los lados
        this.figura = true;
        this.vive = true;

        this.dibuja = function(){
            //Retraso//
            if(this.ciclos > variable_ciclos){ //ciclos = velocidad//
                //saltitos
                if(this.veces>this.num){
                    this.dx *= -1;
                    this.veces = 0;
                    this.num = 29; //numero de saltos que hace de drcha a izq o viceversa//
                    this.y += variable_saltos; // numero de saltos hacia abajo //
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





    // ----- Genera la animación ----- //
    function animacion(){
        id_request = requestAnimationFrame(animacion);
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
        // verificar jugador
        if (x>canvas.width-tamañoXImg){
            x = canvas.width-tamañoXImg;
        }else if (x<0){
            x = 0;
        }

        // disparo
        if (tecla[ESPACIO]){
            balas_array.push(new Bala (jugador.x + 12,jugador.y-3,5));
            tecla[ESPACIO] = false;
            // disparaEnemigo();
        }

        // VERIFICAR FIN DE CANVAS //
        if(enemigos_array[enemigos_array.length-1].y >= jugador.y - tamañoYImg) {
            vidas = 0;
            gameOver();
        }

        // VERIFICAR ENEMIGOS MUERTOS //
        if (enemigos_array.length == 0) {
            gameOver();
        }

    }

    // ----- Pinta los objetos sobre el canvas ----- //
    function pinta(){
        ctx.clearRect(0,0,canvas.width,canvas.height);  // limpia el canvas
        // NAVE //
        jugador.dibuja(x);
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
        // bala contra enemigo
        for(var i=0; i<enemigos_array.length; i++){
            for(var j=0; j<balas_array.length; j++){
                enemigo = enemigos_array[i];
                bala = balas_array[j];
                if(enemigo != null && bala != null){
                    if((bala.x > enemigo.x) && (bala.x < enemigo.x+enemigo.w) && (bala.y > enemigo.y) && (bala.y < enemigo.y+enemigo.w)){
                        enemigo.vive = false;
                        enemigos_array.splice(i, 1);
                        balas_array.splice(j, 1);

                        puntos++;
                        document.getElementById("puntos").innerHTML = puntos;
                        // console.log(document.getElementById("puntos"));
                    }
                }
            }
        }
        // bala contra jugador
        for (var j = 0; j<balasEnemigas_array.length;j++){
            bala = balasEnemigas_array[j];
            if (bala != null){
                if ((bala.x > jugador.x) && (bala.x < jugador.x + tamañoXImg) && (bala.y > jugador.y) && (bala.y < jugador.y + tamañoYImg)){
                    vidas--; // quito una vida
                    balasEnemigas_array.splice(j, 1); // esa bala ya no sigue
                    // console.log("impacto");
                    if (vidas == 2) {
                        document.getElementById("vida3").classList.remove("img_vida");
                        document.getElementById("vida3").classList.add("pierdo_vida");

                    } else if (vidas == 1) {
                        document.getElementById("vida2").classList.remove("img_vida");
                        document.getElementById("vida2").classList.add("pierdo_vida");

                    } else if (vidas == 0) {
                        document.getElementById("vida1").classList.remove("img_vida");
                        document.getElementById("vida1").classList.add("pierdo_vida");
                        gameOver();

                    }
                }
            }
        }
    }





    function disparaEnemigo(){
        let aux = 10;
        if (enemigos_array.length >= aux) {
            for(var i=enemigos_array.length-1; i>=0; i--){ //con este for conseguimos coger la linea de enemigos de abajo, si se quiere comprobar visualmente descomentar el console.logde la linea 276
                if (enemigos_array[i] != null){
                    fila_abajo.push(i);
                }
                if (fila_abajo.length == aux){
                    break
                }
            }

        } else {
            aux = enemigos_array.length;
            for(var i=aux-1; i>=0; i--){ //con este for conseguimos coger la linea de enemigos de abajo, si se quiere comprobar visualmente descomentar el console.logde la linea 276
                if (enemigos_array[i] != null){
                    fila_abajo.push(i);
                }
                if (fila_abajo.length == aux){
                    break
                }
            }

        }
        // console.log(fila_abajo);
        d = fila_abajo[Math.floor(Math.random()*aux)]; //math.floor devuelve el maximo entero menor o igual a math.random*10 --> qué enemigo está disparando
        balasEnemigas_array.push( new Bala(enemigos_array[d].x + enemigos_array[d].w/2,enemigos_array[d].y,5) );
        // Necesito limpiar el array que recoje los aliens de la última fila para que se recalcule de nuevo cada vez que tienen que disparar (por si he matado uno de los enemigos que estaba incluído en el array)
        // while(fila_abajo.length > 0) {
        //     fila_abajo.pop();
        // }
        fila_abajo.length = 0;
        // console.log(enemigos_array.length);

    }

    function gameOver(){
        clearInterval(disparo_interval);
        cancelAnimationFrame(id_request);
        ctx.clearRect(0,0,canvas.width,canvas.height);
        if (vidas == 3) {
            puntos += 30;
            alert("Por haber acabado el nivel con 3 vidas, obtienes 30 puntos extra");
        } else if (vidas == 2) {
            puntos += 20;
            alert("Por haber acabado el nivel con 2 vidas, obtienes 20 puntos extra");
        } else if (vidas == 1) {
            puntos += 10;
            alert("Por haber acabado el nivel con 1 vida, obtienes 10 puntos extra");
        }
        document.getElementById("puntos").innerHTML = puntos;

        alert("partida finalizada");
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


    function comenzarJuego(){

        // console.log(disparo_interval);
        // console.log(id_request);
        clearInterval(disparo_interval);
        cancelAnimationFrame(id_request);
        ctx.clearRect(0,0,canvas.width,canvas.height);
        // console.log(disparo_interval);
        // console.log(id_request);

        //imagen nave//
        x = canvas.width/2;
        imagen = new Image();
        imagen.src = "../img/nave2.png"

        imagen.onload = function(){
            jugador = new Jugador(0);
            jugador.dibuja(canvas.width/2);
        }

        //imagen enemigo//
        imagenEnemigo = new Image();
        imagenEnemigo.src = "../img/enemigo3.png"
        imagenEnemigo.onload = function(){
            for(var i = 0; i<5; i++){ // crea todos los enemigos
                for (var j = 0; j<10; j++){
                    enemigos_array.push(new Enemigo(100+40*j,30+45*i)); //push: añade uno o mas elementos al array y devuelve la nueva longitud del array
                }
            }

            animacion();
        }
        // Disparan los enemigos todo el rato
        disparo_interval = setInterval(disparaEnemigo,500); //cada 0,5 seg//
        console.log("fin función");
    }
    console.log("fin script");
}
