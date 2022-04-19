window.onload = function (){

    document.getElementById("play").addEventListener("click",sonar);
    document.getElementById("stop").addEventListener("click",callar);			

    
    function sonar(){
        var sonido = document.createElement("iframe");
        sonido.setAttribute("src","../res/Chiptronical.ogg");
        document.body.appendChild(sonido);
        document.getElementById("play").removeEventListener("mousedown",sonar);
    }
    
    function callar(){
        var iframe = document.getElementsByTagName("iframe");
    
        if (iframe.length > 0){
            iframe[0].parentNode.removeChild(iframe[0]);
            document.getElementById("play").addEventListener("mousedown",sonar);
        }
    }

}