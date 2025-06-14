//Traemos los elementos necesarios para crear la modal que mostrará la información de cada fila al ser clickeada

//Por cada tr, tenemos que traer a su vez sus td asociados

let tr_list = document.getElementById("div").querySelectorAll("tr#tr")

let modal = document.getElementById("modal_listado")

//Lógica para que las fotos sean responsivas
let foto_list = document.querySelectorAll("img#foto")

let modal_foto_list = document.querySelectorAll("div#modal_foto")

let boton_foto_list = document.querySelectorAll("button#boton_foto")


//Creamos la función que muestra la modal

function mostrar_modal(tr,i){
    console.log(i)
    const celdas = tr.getElementsByTagName("td"); //Array de html elements del tipo td, a los cuales podemos acceder a sus campos
    document.getElementById("inicio").textContent = "Inicio: " + celdas[0].textContent;
    document.getElementById("termino").textContent = "Término: " + celdas[1].textContent;
    document.getElementById("comuna").textContent = "Comuna: " + celdas[2].textContent;
    document.getElementById("sector").textContent = "Sector: " + celdas[3].textContent;
    document.getElementById("tema").textContent = "Tema: " + celdas[4].textContent;
    document.getElementById("nombre").textContent = "Nombre del organizador: " + celdas[5].textContent;
    for(let i=7;i<Array.from(celdas).length;i++){
        const celda_img = celdas[i]
        const img_list = celda_img.querySelectorAll('img#foto')
        for(let i =0; i< img_list.length; i++){
            const img = img_list[i]
            img.style.display = "block"
            img.style.padding = "3%"
            img.style.cursor = "pointer"
            img.className = "img_responsive"
            document.getElementById("div_imagenes").appendChild(img)
        }
    }
    const input_escondido = document.createElement('input');
    input_escondido.type = "hidden";
    input_escondido.name = "actividad_id";
    input_escondido.value = i+1;
    document.getElementById("form_comentario").appendChild(input_escondido)
    modal.style.display = "block"
    document.getElementById("div").style.display="none"
    document.getElementById("h1").style.display="none"
    const lista_de_comentarios = document.createElement('ul')
    lista_de_comentarios.id = `lista_de_comentarios_${i+1}`
    document.getElementById("div_comentarios").appendChild(lista_de_comentarios)
    console.log("creada la lista")
    console.log(lista_de_comentarios)
}

//Creamos la función para poder agrandar la imagen
function mostrar_modal_foto(i){
    modal.style.display = "none" //escondemos la modal anterior
    modal_foto_list[i].style.display="block" //mostramos la nueva modal con la imagen redimensionada
}

function volver_modal(i){
    modal.style.display="block"
    modal_foto_list[i].style.display = "none"
}

//Creamos los eventos asociados a los elementos html
for(let i =0; i< tr_list.length; i++){
    tr_list[i].addEventListener("click",function(){
        mostrar_modal(this,i); //le mandamos una instancia de tr, por lo tanto, va a mandar a la función la información de la fila clickeada
    });
}

for(let i=0; i<foto_list.length;i++){
    foto_list[i].addEventListener("click",function(){
        mostrar_modal_foto(i)
        });
}

for(let i=0; i<foto_list.length;i++){
    boton_foto_list[i].addEventListener("click",function(){
        volver_modal(i)
    });
}