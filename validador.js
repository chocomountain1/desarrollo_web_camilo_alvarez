//Obtenemos los elementos del formulario
let region = document.getElementById("region").value;

//Creamos una estructura de datos que tenga como clave el nombre de una región y que esté asociado a un array con los
//nombres de las comunas de la region
const region_comunas = new Map();
region_comunas.set("arica_parinacota",["Arica","Camarones","General Lagos","Putre"]);
region_comunas.set("tarapaca",["Alto Hospicio","Camiña","Colchane","Huara","Iquique","Pica","Pozo Almonte"]);
