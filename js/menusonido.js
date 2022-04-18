window.onload = function (){

    const audioContext = new AudioContext();
    const element = document.querySelector(audio);
    const source = audioContext.createMediaElementSource(element);
    source.connect(audioContext.destination)
    audio.play();  

}
