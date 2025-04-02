//Obtenemos los elementos del formulario
let select_comuna = document.getElementById("comuna");
let select_region = document.getElementById("region");

//Creamos una estructura de datos que tenga como clave el nombre de una región y que esté asociado a un array con los
//nombres de las comunas de la region
const region_comunas = new Map();
region_comunas.set("arica_parinacota",["Arica","Camarones","General Lagos","Putre"]);
region_comunas.set("tarapaca",["Alto Hospicio","Camiña","Colchane","Huara","Iquique","Pica","Pozo Almonte"]);
region_comunas.set("antofagasta",["Antofagasta","Calama","María Elena","Mejillones","Ollague","San Pedro de Atacama","Sierra Gorda","Tartal","Tocopilla"]);
region_comunas.set("atacama",["Alto del Carmen","Caldera","Chañaral","Copiapó","Diego de Almagro","Freirina","Huasco","Tierra Amarrilla","Vallenar"]);


//Creamos las funciones que muestran los elementos que necesitemos
function mostrarComunas() {
    const region = document.getElementById("region").value;
    if(region_comunas.has(region)){ //map si posee la región seleccionada
        let array_comunas = region_comunas.get(region);
        array_comunas.forEach(comuna => {
            const txtnode = document.createElement("option");
            txtnode.value = comuna;
            txtnode.textContent = comuna;
            select_comuna.appendChild(txtnode);
        });
    } else{
        select_comuna.innerHTML='<option value = "">No Seleccionada<\option>'
    }
    
};

//Definimos los eventos asociados a los elementos del formulario
select_region.addEventListener("change",mostrarComunas);