window.onload = function () {

    // // // // // // // // // // // // 
    // EXLPICACIÓN INICIAL DEL JUEGO //
    // // // // // // // // // // // // 
    swal('Introduce un "Nickname" en la parte izquierda de la pantalla antes de comenzar a jugar', 'En la parte inferior se guardan las puntuaciones de todos los jugadores, en caso de querer borrarlo, bastara con pulsar el boton "Reset"');

    // // // // // // // // //
    //  VARIABLES GLOBALES  //
    // // // // // // // // //
    // --- Canvas --- //
    var canvas, ctx;

    // --- Teclas --- //
    const MOVER_IZQ = "ArrowLeft";
    const MOVER_DRCH = "ArrowRight";
    const ESPACIO = " "; // caracter vacío == espacio
    const ENTER = "Enter";
    var tecla;

    // Escuchadores de las teclas
    function keydownHandler(e) {
        tecla[e.key] = true;
        // e.preventDefault();
    }

    function keyupHandler(e) {
        e.preventDefault();
        tecla[e.key] = false;
    }

    // --- Objetos --- //
    var x;
    const tamañoXImg = 35, tamañoYImg = 30;

    var imagen, imagenEnemigo;

    var colorBala;
    var degradado; // color gradiente balas
    var balas_array;
    var enemigos_array;
    var balasEnemigas_array;

    var id_disparo; // ID de los procesos "setInterval" para disparo de enemigos
    var fila_abajo; // array con enemigos de la linea de abajo

    var id_request; // ID para los procesos AnimationFrame

    // --- Puntos/Vidas --- //
    var puntos, vidas;
    var flag_finCanvas; // controla aliens si llegan a la nave del jugador
    var jugando; // controla si se está en una partida

    // --- Niveles --- //
    var variable_ciclos, variable_saltos; // movimiento enemigos (velocidad)
    var disparo_interval, velocidad_balas; // tiempo y velocidad disparo enemigos
    var num_filas, num_columnas; // nº enemigos

    // --- Audios --- //
    const audio_disparo = new Audio("../res/shoot.wav");
    const audio_perderVida = new Audio("../res/lose_life.mp3");
    const audio_finPartida = new Audio("../res/game_over.mp3");

    // --- localStorage --- //
    var nombreUsuario = "undefined";
    var numPartidas;
    if (window.localStorage.length == 0) { // me aprovecho de que se mantienen los datos entre sesiones para obtener el nº de partidas almacenadas
        numPartidas = 0;

    } else {
        numPartidas = window.localStorage.getItem("numPartidas");

    }
    window.localStorage.setItem("numPartidas", numPartidas); // se actualiza la entrada del número de partidas para saber cuántas partidas llevamos

    var aux_partida; // me ayuda a escribir la info en el HTML
    for (let i = 1; i <= numPartidas; i++) {
        // console.log(i);
        aux_partida = JSON.parse(window.localStorage.getItem(i));
        document.getElementById("db").insertAdjacentHTML("afterbegin", aux_partida.nombre + " --> " + aux_partida.puntos);
        document.getElementById("db").insertAdjacentHTML("afterbegin", "<br>");

    }

    // Escuchadores para el uso de localStorage
    function cogerNombre() {
        nombreUsuario = document.getElementById("nombreUsuario").value;
        document.getElementById("nombreUsuario").value = ""; // limpia el recuadro
    }

    function enterHandler(e) {
        e.preventDefault();
        if (e.key == ENTER) {
            document.getElementById("botonNombre").click(); // consigo que pulsando la tecla enter en el recuadro se envíe la info
        }
    }

    function limpiarStorage() {
        window.localStorage.clear();
        document.getElementById("db").innerHTML = "";
    }

    document.getElementById("botonNombre").addEventListener("click", cogerNombre);
    document.getElementById("nombreUsuario").addEventListener("keyup", enterHandler);
    document.getElementById("boton_reset").addEventListener("click", limpiarStorage);

    // // // // // // // // //
    // INICIALIZAR PARTIDAS //
    // // // // // // // // // 
    function reset() {
        // Coger canvas
        canvas = document.getElementById("SpaceCanvas");
        ctx = canvas.getContext("2d");
        // Limpiar todo
        clearInterval(id_disparo);
        cancelAnimationFrame(id_request);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        document.getElementById("puntos").innerHTML = 0;
        if (window.localStorage.length == 0) { // por si se limpia el localStorage sin refrescar la página
            numPartidas = 0;
        }
        window.localStorage.setItem("numPartidas", numPartidas); // se actualiza la entrada del número de partidas para saber cuántas partidas llevamos

        // Recolocar vidas
        let vidas_reset = document.getElementsByName("vida");
        for (let i = 0; i < vidas_reset.length; i++) {
            if (vidas_reset[i].classList.contains("pierdo_vida")) {
                vidas_reset[i].classList.remove("pierdo_vida")
                vidas_reset[i].classList.add("img_vida")

            }

        }

        // Inicializar variables
        x = canvas.width / 2;

        tecla = [];

        colorBala = "red";
        balas_array = new Array();
        enemigos_array = new Array();
        balasEnemigas_array = new Array();

        fila_abajo = new Array();

        degradado = ctx.createLinearGradient(0, 0, 0, 170);
        degradado.addColorStop(0, "red");
        degradado.addColorStop(1, "white");

        puntos = 0;
        vidas = 3;
        flag_finCanvas = false;
        jugando = false;

    }

    // // // // // // // // //
    //  CONTROL DE NIVELES  //
    // // // // // // // // //
    function nivel1() {
        variable_saltos = 10;
        variable_ciclos = 20;
        disparo_interval = 1000;
        velocidad_balas = 3;
        num_columnas = 10;
        num_filas = 6;
        reset();
        document.getElementById("SpaceCanvas").style.backgroundImage = "none";
        comenzarJuego();
    }

    function nivel2() {
        variable_saltos = 15;
        variable_ciclos = 15;
        disparo_interval = 500;
        velocidad_balas = 5;
        num_columnas = 10;
        num_filas = 6;
        reset();
        document.getElementById("SpaceCanvas").style.backgroundImage = "none";
        comenzarJuego();
    }

    function nivel3() {
        variable_saltos = 20;
        variable_ciclos = 10;
        disparo_interval = 250;
        velocidad_balas = 8;
        num_columnas = 10;
        num_filas = 6;
        reset();
        document.getElementById("SpaceCanvas").style.backgroundImage = "none";
        comenzarJuego();
    }

    function nivel4() {
        variable_saltos = 20;
        variable_ciclos = 5;
        disparo_interval = 200;
        velocidad_balas = 10;
        num_columnas = 10;
        num_filas = 6;
        reset();
        document.getElementById("SpaceCanvas").style.backgroundImage = "none";
        comenzarJuego();
    }

    // Escuchadores de comienzo de nivel
    document.getElementById("boton1").addEventListener("mousedown", nivel1);
    document.getElementById("boton2").addEventListener("mousedown", nivel2);
    document.getElementById("boton3").addEventListener("mousedown", nivel3);
    document.getElementById("boton4").addEventListener("mousedown", nivel4);

    // // // // // // // // // //
    //  CONSTRUCTORES OBJETOS  //
    // // // // // // // // // //
    // --- Constructor BD --- //
    function Partida(nombre, puntos) { // me almacena los datos de una partida
        this.nombre = nombre;
        this.puntos = puntos;
    }

    // --- Constructor Bala --- //
    function Bala(x, y, w) {

        this.x = x;
        this.y = y;
        this.w = w;

        this.dibuja = function () {
            ctx.save();
            ctx.fillStyle = degradado;
            ctx.fillRect(this.x, this.y, this.w, this.w + 8);
            this.y = this.y - 4;
            ctx.restore();
        };

        this.dispara = function () {
            ctx.save();
            ctx.fillStyle = colorBala;
            ctx.fillRect(this.x, this.y, this.w, this.w + 8);
            this.y = this.y + velocidad_balas;
            ctx.restore();
        }

    }

    // --- Constructor Jugador --- //
    function Jugador(x) {

        this.x = x;
        this.y = 580;

        this.dibuja = function (x) {
            this.x = x;
            ctx.drawImage(imagen, this.x, this.y, tamañoXImg, tamañoYImg);
        };
    }

    // --- Constructor Enemigo --- //
    function Enemigo(x, y) {

        this.x = x;
        this.y = y;
        this.w = 35;
        this.veces = 0; // número de saltitos que lleva
        this.dx = 6; //numero de posiciones que se mueve hacia la izq o hacia la drch
        this.ciclos = 0;
        this.num = 14; // número de saltitos máximos que da hacia los lados
        this.figura = true;
        this.vive = true;

        this.dibuja = function () {
            //Retraso//
            if (this.ciclos > variable_ciclos) { //ciclos = velocidad//
                //saltitos
                if (this.veces > this.num) {
                    this.dx *= -1;
                    this.veces = 0;
                    this.num = 29; //numero de saltos que hace de drcha a izq o viceversa//
                    this.y += variable_saltos; // numero de saltos hacia abajo //
                    //var result = condition ? value1: value2 Se evalúa condition si es verdadera entonces devuelve value1 , de lo contrario value2. //
                    this.dx = (this.dx > 0) ? this.dx++ : this.dx--;
                } else {
                    this.x += this.dx;
                }
                this.veces++;
                this.ciclos = 0;
                this.figura = !this.figura;
            } else {
                this.ciclos++;

            }
            if (this.vive) {

                ctx.drawImage(imagenEnemigo, 0, 0, 93, 84, this.x, this.y, 35, 30);

            } else {
                ctx.fillStyle = "black";
                ctx.fillRect(this.x, this.y, 35, 30);
            }

        }

    }

    // // // // // // // // //
    //  FLUJO DEL PROGRAMA  //
    // // // // // // // // //
    // --- Genera la animación --- //
    function animacion() {
        id_request = requestAnimationFrame(animacion);
        verificar();
        pinta();
        colisiones();
    }

    // --- Comprueba movimiento de los objetos --- //
    function verificar() {
        // NAVE //
        // Mover
        if (tecla[MOVER_DRCH]) {
            // console.log(tecla[MOVER_DRCH]);
            x += 10;
        } else if (tecla[MOVER_IZQ]) {
            x -= 10;
        } else if (tecla[ESPACIO]) {
            balas_array.push(new Bala(jugador.x + 12, jugador.y - 3, 5));
            audio_disparo.play();
            tecla[ESPACIO] = false;
        }

        // verificar jugador
        if (x > canvas.width - tamañoXImg) {
            x = canvas.width - tamañoXImg;
        } else if (x < 0) {
            x = 0;
        }

        // VERIFICAR FIN DE CANVAS //
        if (enemigos_array.length != 0) {
            if (enemigos_array[enemigos_array.length - 1].y >= jugador.y - tamañoYImg) {
                // vidas = 0;
                flag_finCanvas = true;
                // console.log("fin canvas");
                gameOver();
            }
        }

        // VERIFICAR ENEMIGOS MUERTOS //
        if (enemigos_array.length == 0 && jugando == true) {
            // console.log("enemigos muertos");
            gameOver();
        }

    }

    // --- Pinta los objetos sobre el canvas --- //
    function pinta() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);  // limpia el canvas
        // NAVE //
        jugador.dibuja(x);
        // BALAS //
        for (var i = 0; i < balas_array.length; i++) {
            if (balas_array[i] != null) {
                balas_array[i].dibuja();
                if (balas_array[i].y < 0) {
                    balas_array.splice(i, 1);
                }
            }
        }

        // ENEMIGOS //
        for (var i = 0; i < enemigos_array.length; i++) {
            if (enemigos_array[i] != null) {
                enemigos_array[i].dibuja();
            }
        }

        //balas enemigas//
        for (var i = 0; i < balasEnemigas_array.length; i++) {
            if (balasEnemigas_array[i] != null) {
                balasEnemigas_array[i].dispara();
                if (balasEnemigas_array[i].y > canvas.height) {
                    balasEnemigas_array.splice(i, 1);

                }
            }
        }
    }

    // --- Colisiones entre balas y naves --- //
    function colisiones() {
        // bala contra enemigo
        for (var i = 0; i < enemigos_array.length; i++) {
            for (var j = 0; j < balas_array.length; j++) {
                enemigo = enemigos_array[i];
                bala = balas_array[j];
                if (enemigo != null && bala != null) {
                    if ((bala.x > enemigo.x) && (bala.x < enemigo.x + enemigo.w) && (bala.y > enemigo.y) && (bala.y < enemigo.y + enemigo.w)) {
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
        for (var j = 0; j < balasEnemigas_array.length; j++) {
            bala = balasEnemigas_array[j];
            if (bala != null) {
                if ((bala.x > jugador.x) && (bala.x < jugador.x + tamañoXImg) && (bala.y > jugador.y) && (bala.y < jugador.y + tamañoYImg)) {
                    vidas--; // quito una vida
                    audio_perderVida.play();
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
                        // console.log("vidas 0");
                        gameOver();


                    }
                }
            }
        }
    }

    function disparaEnemigo() {
        let aux = 10;
        let flag = true;
        if (enemigos_array.length >= aux) {
            for (var i = enemigos_array.length - 1; i >= 0; i--) { //con este for conseguimos coger la linea de enemigos de abajo, si se quiere comprobar visualmente descomentar el console.logde la linea 467
                if (enemigos_array[i] != null) {
                    fila_abajo.push(i);
                }
                if (fila_abajo.length == aux) {
                    break
                }
            }

        } else if (enemigos_array.length == 0) {
            flag = false;

        } else {
            aux = enemigos_array.length;
            for (var i = aux - 1; i >= 0; i--) { //con este for conseguimos coger la linea de enemigos de abajo, si se quiere comprobar visualmente descomentar el console.log de la linea 467
                if (enemigos_array[i] != null) {
                    fila_abajo.push(i);
                }
                if (fila_abajo.length == aux) {
                    break
                }
            }

        }
        // console.log(fila_abajo);
        if (flag == true) {
            d = fila_abajo[Math.floor(Math.random() * aux)]; //math.floor devuelve el maximo entero menor o igual a math.random*10 --> qué enemigo está disparando
            balasEnemigas_array.push(new Bala(enemigos_array[d].x + enemigos_array[d].w / 2, enemigos_array[d].y, 5));
        }
        // Necesito limpiar el array que recoje los aliens de la última fila para que se recalcule de nuevo cada vez que tienen que disparar (por si he matado uno de los enemigos que estaba incluído en el array)
        // while(fila_abajo.length > 0) {
        //     fila_abajo.pop();
        // }
        fila_abajo.length = 0;

    }

    // --- Función de fin de la partida --- //
    function gameOver() {
        if (flag_finCanvas == true) {
            audio_finPartida.play();
            document.getElementById("SpaceCanvas").style.backgroundImage = "url(../img/game_over_img.jpg)";
            swal('Game Over', 'Tu nave ha colisionado...', 'error');

        } else {
            if (vidas == 3) {
                puntos += 30;
                document.getElementById("SpaceCanvas").style.backgroundImage = "url(../img/level_up.png)";
                swal('Por haber acabado el nivel con 3 vidas, obtienes 30 puntos extra', '', 'success');
            } else if (vidas == 2) {
                puntos += 20;
                document.getElementById("SpaceCanvas").style.backgroundImage = "url(../img/level_up.png)";
                swal('Por haber acabado el nivel con 2 vidas, obtienes 20 puntos extra', '', 'success');
            } else if (vidas == 1) {
                puntos += 10;
                document.getElementById("SpaceCanvas").style.backgroundImage = "url(../img/level_up.png)";
                swal('Por haber acabado el nivel con 1 vida, obtienes 10 puntos extra', '', 'success');
            } else if (vidas == 0) {
                audio_finPartida.play();
                document.getElementById("SpaceCanvas").style.backgroundImage = "url(../img/game_over_img.jpg)";
                swal('Game Over', 'Tu nave ha sido destruida...', 'error');
            }

        }

        // Actualiza info en HTML sobre las partidas realizadas
        document.getElementById("puntos").innerHTML = puntos;
        let newScore = new Partida(nombreUsuario, puntos);
        numPartidas++;

        window.localStorage.setItem(numPartidas, JSON.stringify(newScore)); // almaceno mi objeto con los datos de la partida en la BD
        // console.log(window.localStorage.getItem(numPartidas));

        // console.log(numPartidas);
        // document.getElementById("db").innerHTML = "";
        if (document.getElementById("db").firstChild == null || window.localStorage.length == 0) { // no tengo info aún, lo escribo todo
            document.getElementById("db").innerHTML = "";
            for (let i = 1; i <= numPartidas; i++) {
                // console.log(i);
                aux_partida = JSON.parse(window.localStorage.getItem(i));
                document.getElementById("db").insertAdjacentHTML("afterbegin", aux_partida.nombre + " --> " + aux_partida.puntos);
                document.getElementById("db").insertAdjacentHTML("afterbegin", "<br>");
            }

        } else {
            aux_partida = JSON.parse(window.localStorage.getItem(numPartidas));
            document.getElementById("db").insertAdjacentHTML("afterbegin", aux_partida.nombre + " --> " + aux_partida.puntos);
            document.getElementById("db").insertAdjacentHTML("afterbegin", "<br>");

        }

        reset();
    }

    // --- Activación de la función AnimationFrame para los distintos navegadores --- //
    // Informa al navegador que quieres realizar una animación y solicita que el navegador programe el repintado de la ventana para el próximo ciclo de animación. Se crea para detectar el tipo de objeto "requestanimaciontionFrame" que utiliza el navegador que usamos
    window.requestanimaciontionFrame = (function () { return window.requestanimaciontionFrame || window.webkitRequestanimaciontionFrame || window.mozRequestanimaciontionFrame || function (callback) { window.setTimeout(callback, 17); } })();

    // // // // // // // // 
    // INICIO DE PARTIDA //
    // // // // // // // // 
    function comenzarJuego() {
        jugando = true;

        //eventos para el teclado//
        document.addEventListener("keydown", keydownHandler);
        document.addEventListener("keyup", keyupHandler);

        //imagen nave//
        imagen = new Image();
        imagen.src = "../img/nave2.png"

        imagen.onload = function () {
            jugador = new Jugador(x);
            jugador.dibuja;
        }

        //imagen enemigo//
        imagenEnemigo = new Image();
        imagenEnemigo.src = "../img/enemigo3.png"
        imagenEnemigo.onload = function () {
            for (var i = 0; i < num_filas; i++) { // crea todos los enemigos
                for (var j = 0; j < num_columnas; j++) {
                    enemigos_array.push(new Enemigo(100 + 40 * j, 30 + 45 * i)); //push: añade uno o mas elementos al array y devuelve la nueva longitud del array
                }
            }

            animacion();
        }
        // Disparan los enemigos todo el rato
        id_disparo = setInterval(disparaEnemigo, disparo_interval); //cada 0,5 seg//
    }


    // AUDIO //

    document.getElementById("play").addEventListener("mousedown", sonar);
    document.getElementById("stop").addEventListener("mousedown", callar);


    function sonar() {
        var sonido = document.createElement("iframe");
        sonido.setAttribute("src", "../res/Chiptronical.ogg");
        document.body.appendChild(sonido);
        document.getElementById("play").removeEventListener("mousedown", sonar);
    }

    function callar() {
        var iframe = document.getElementsByTagName("iframe");

        if (iframe.length > 0) {
            iframe[0].parentNode.removeChild(iframe[0]);
            document.getElementById("play").addEventListener("mousedown", sonar);
        }
    }

}