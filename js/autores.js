window.onload = function() {
    // Recojo los elementos del DOM de la página HTML
    var tabs = document.getElementsByName("tab");
    var sections = document.getElementsByName("sect");

    // Defino la respuesta al click en una tab
    var activateTab = function() {
        for (let i = 0; i < tabs.length; i++) {
            if ((tabs[i] == this) && (tabs[i].classList.value === "hidden_tab")) { // Detecto click y actúo
                tabs[i].classList.add("active_tab");
                tabs[i].classList.remove("hidden_tab");
                sections[i].classList.add("active_sect");
                sections[i].classList.remove("hidden_sect");
                
            } else if ((tabs[i] == this) && (tabs[i].classList.value === "active_tab")) { // si clicko sobre el apartado que ya está activo
                tabs[i].classList.remove("active_tab");
                tabs[i].classList.add("hidden_tab");
                sections[i].classList.remove("active_sect");
                sections[i].classList.add("hidden_sect");

            } else { // if (tabs[i].className == "active_tab")
                tabs[i].classList.remove("active_tab");
                tabs[i].classList.add("hidden_tab");
                sections[i].classList.remove("active_sect");
                sections[i].classList.add("hidden_sect");
                
            }

        }

    }

    // Recorro las tabs asignándoles una respuesta al evento click
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener("click", activateTab, false);
        
    }

}