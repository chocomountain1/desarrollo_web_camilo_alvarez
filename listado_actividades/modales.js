//Traemos los elementos necesarios para crear la modal que mostrará la información de cada fila al ser clickeada

//Por cada tr, tenemos que traer a su vez sus td asociados
let tr1=document.getElementById("tr1");

let tr2=document.getElementById("tr2");

let tr3=document.getElementById("tr3");

let tr4=document.getElementById("tr4");

let tr5=document.getElementById("tr5");

let modal = document.getElementById("modal_listado")


//Creamos la función que muestra la modal

function mostrar_modal(tr){
    const celdas = tr.getElementsByTagName("td"); //Array de html elements del tipo td, a los cuales podemos acceder a sus campos
    document.getElementById("inicio").textContent = "Inicio: " + celdas[0].textContent;
    document.getElementById("termino").textContent = "Término: " + celdas[1].textContent;
    document.getElementById("comuna").textContent = "Comuna: " + celdas[2].textContent;
    document.getElementById("sector").textContent = "Sector: " + celdas[3].textContent;
    document.getElementById("tema").textContent = "Tema: " + celdas[4].textContent;
    document.getElementById("nombre").textContent = "Nombre del organizador: " + celdas[5].textContent;

    modal.style.display = "block"
}

//Creamos los eventos asociados a los elementos html
tr1.addEventListener("click",function(){
    mostrar_modal(this); //le mandamos una instancia de tr1, por lo tanto, va a mandar a la función la información de la fila clickeada
});
tr2.addEventListener("click",function(){
    mostrar_modal(this);
});
tr3.addEventListener("click",function(){
    mostrar_modal(this);
});
tr4.addEventListener("click",function(){
    mostrar_modal(this);
});
tr5.addEventListener("click",function(){
    mostrar_modal(this);
});