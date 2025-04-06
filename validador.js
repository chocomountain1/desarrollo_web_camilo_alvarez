//Obtenemos los elementos del formulario

//Lógica para región-comuna
let select_comuna = document.getElementById("comuna");
let select_region = document.getElementById("region");

//Lógica para rss
let select_rss = document.getElementById("rss");
let ul = document.getElementById("ul")

const input_rss = document.createElement("input");
input_rss.maxLength = "50";
input_rss.minLength = "4";
input_rss.placeholder = "Escribe tu nombre de usuario o la url de tu perfil ";

input_rss.style.width = "300px"
const list = document.createElement("li");
//Creamos una estructura de datos que tenga como clave el nombre de una región y que esté asociado a un array con los
//nombres de las comunas de la region
const region_comunas = new Map();
region_comunas.set("arica_parinacota",["Arica","Camarones","General Lagos","Putre"]);
region_comunas.set("tarapaca",["Alto Hospicio","Camiña","Colchane","Huara","Iquique","Pica","Pozo Almonte"]);
region_comunas.set("antofagasta",["Antofagasta","Calama","María Elena","Mejillones","Ollague","San Pedro de Atacama","Sierra Gorda","Tartal","Tocopilla"]);
region_comunas.set("atacama",["Alto del Carmen","Caldera","Chañaral","Copiapó","Diego de Almagro","Freirina","Huasco","Tierra Amarrilla","Vallenar"]);
region_comunas.set("coquimbo", ["Andacollo", "Canela", "Combarbalá", "Coquimbo", "Illapel", "La Higuera", "La Serena", "Los Vilos", "Monte Patria", "Ovalle", "Paihuano", "Punitaqui", "Río Hurtado", "Salamanca", "Vicuña"]);
region_comunas.set("valparaiso",["Algarrobo", "Cabildo", "Calera", "Calle Larga", "Cartagena", "Casablanca", "Catemu", "Concón", "El Quisco", "El Tabo", "Hijuelas", "Isla de Pascua", "Juan Fernández", "La Cruz", "La Ligua", "Limache", "Llaillay", "Los Andes", "Nogales", "Olmué", "Panquehue", "Papudo", "Petorca", "Puchuncaví", "Putaendo", "Quillota", "Quilpué", "Quintero", "Rinconada", "San Antonio", "San Esteban", "San Felipe", "Santa María", "Santo Domingo", "Valparaíso", "Villa Alemana", "Viña del Mar", "Zapallar"])
region_comunas.set("metropolitana",["Alhué", "Buin", "Calera de Tango", "Cerrillos", "Cerro Navia", "Colina", "Conchalí", "Curacaví", "El Bosque", "El Monte", "Estación Central", "Huechuraba", "Independencia", "Isla de Maipo", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Lampa", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "María Pinto", "Melipilla", "Ñuñoa", "Padre Hurtado", "Paine", "Pedro Aguirre Cerda", "Peñaflor", "Peñalolén", "Providencia", "Pudahuel", "Puente Alto", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Bernardo", "San Joaquín", "San José de Maipo", "San Miguel", "San Pedro", "San Ramón", "Santiago", "Talagante", "Tiltil", "Vitacura"]);
region_comunas.set("ohiggins",["Chimbarongo", "Chépica", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "La Estrella", "Las Cabras", "Litueche", "Lolol", "Machalí", "Malloa", "Marchihue", "Mostazal", "Nancagua", "Navidad", "Olivar", "Palmilla", "Paredones", "Peralillo", "Peumo", "Pichidegua", "Pichilemu", "Placilla", "Pumanque", "Quinta de Tilcoco", "Rancagua", "Rengo", "Requínoa", "San Fernando", "San Vicente"]);
region_comunas.set("maule",["Cauquenes", "Chanco", "Colbún", "Constitución", "Curepto", "Curicó", "Empedrado", "Hualañé", "Licantén", "Linares", "Longaví", "Maule", "Molina", "Parral", "Pelarco", "Pelluhue", "Pencahue", "Rauco", "Retiro", "Romeral", "Sagrada Familia", "San Clemente", "San Javier", "San Rafael", "Talca", "Teno", "Vichuquén", "Villa Alegre", "Yerbas Buenas"]);
region_comunas.set("ñuble",["Bulnes", "Chillán", "Chillán Viejo", "Cobquecura", "Coelemu", "Coihueco", "El Carmen", "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay"]);
region_comunas.set("biobio",["Alto Biobío", "Antuco", "Arauco", "Cabrero", "Cañete", "Chiguayante", "Concepción", "Contulmo", "Coronel", "Curanilahue", "Florida", "Hualpén", "Hualqui", "Laja", "Lebu", "Los Álamos", "Los Ángeles", "Lota", "Mulchén", "Nacimiento", "Negrete", "Penco", "Quilaco", "Quilleco", "San Pedro de la Paz", "San Rosendo", "Santa Bárbara", "Santa Juana", "Talcahuano", "Tirúa", "Tomé", "Tucapel", "Yumbel"]);
region_comunas.set("araucania",["Angol", "Carahue", "Cholchol", "Collipulli", "Cunco", "Curacautín", "Curarrehue", "Ercilla", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Lonquimay", "Los Sauces", "Lumaco", "Melipeuco", "Nueva Imperial", "Padre Las Casas", "Perquenco", "Pitrufquén", "Pucón", "Purén", "Renaico", "Saavedra", "Temuco", "Teodoro Schmidt", "Toltén", "Traiguén", "Victoria", "Vilcún", "Villarrica"]);
region_comunas.set("rios",["Corral", "Futrono", "La Unión", "Lago Ranco", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "Río Bueno", "Valdivia"]);
region_comunas.set("lagos",["Ancud", "Calbuco", "Castro", "Chaitén", "Chonchi", "Cochamó", "Curaco de Vélez", "Dalcahue", "Fresia", "Frutillar", "Futaleufú", "Hualaihué", "Llanquihue", "Los Muermos", "Maullín", "Osorno", "Palena", "Puerto Montt", "Puerto Octay", "Puerto Varas", "Puqueldón", "Purranque", "Puyehue", "Queilén", "Quellón", "Quemchi", "Quinchao", "Río Negro", "San Juan de la Costa", "San Pablo"]);
region_comunas.set("aysen",["Chile Chico", "Cisnes", "Cochrane", "Coyhaique", "Guaitecas", "Lago Verde", "O'Higgins", "Río Ibáñez", "Tortel"]);
region_comunas.set("magallanes",["Antártica", "Cabo de Hornos", "Laguna Blanca", "Natales", "Porvenir", "Primavera", "Punta Arenas", "Río Verde", "San Gregorio", "Timaukel", "Torres del Paine"]);
//Creamos las funciones que muestran los elementos que necesitemos
function mostrarComunas() {
    const region = document.getElementById("region").value;
    select_comuna.innerHTML=""
    if(region_comunas.has(region)){ //map si posee la región seleccionada
        const no_seleccionado = document.createElement("option") //Necesitamos que esté esta opción cada vez que se actualiza la región seleccionada
        no_seleccionado.textContent = "No seleccionada"
        select_comuna.appendChild(no_seleccionado)
        let array_comunas = region_comunas.get(region);
        array_comunas.forEach(comuna => {
            const txtnode = document.createElement("option");
            txtnode.value = comuna;
            txtnode.textContent = comuna;
            select_comuna.appendChild(txtnode);
        });
    } else{
        const seleccionar_comuna = document.createElement("option");
        seleccionar_comuna.textContent = "No seleccionada";
        select_comuna.replaceChildren(seleccionar_comuna)
    }
    
};


function mostrar_input_rss(){
    if(select_rss.value != ""){
        list.appendChild(input_rss);
        ul.appendChild(list)
    } else{
        list.replaceChildren()
    }
}

//Definimos los eventos asociados a los elementos del formulario
select_region.addEventListener("change",mostrarComunas);
select_rss.addEventListener("change",mostrar_input_rss);