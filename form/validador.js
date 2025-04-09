//Obtenemos los elementos del formulario

//Lógica para región-comuna
let select_comuna = document.getElementById("comuna");
let li_comuna = document.getElementById("li_comuna");

let li_region = document.getElementById("li_region");
let select_region = document.getElementById("region");


//Lógica para rss
let select_rss = document.getElementById("rss");
let ul = document.getElementById("ul_organizacion")
const input_rss = document.createElement("input");
input_rss.maxLength = "50";
input_rss.minLength = "4";
input_rss.placeholder = "Escribe tu nombre de usuario o la url de tu perfil ";
input_rss.style.width = "300px";
const list = document.createElement("li");

//lógica para tema
const input_tema = document.createElement("input");
input_tema.style.width = "300px"
input_tema.minLength = "3"
input_tema.maxLength = "15"
input_tema.placeholder = "Agrega una descripción del tema de la actividad"
let select_tema = document.getElementById("tema");
const list_tema = document.createElement("li");
let ul_tema = document.getElementById("ul_tema")


//lógica para foto
const input_foto = document.createElement("input");
input_foto.type="file"
input_foto.style.display = "flex"
input_foto.style.justifyContent = "center"
input_foto.style.marginLeft = "97px"
let boton_foto = document.getElementById("boton_foto");
let ul_foto = document.getElementById("ul_foto");
let list_foto = document.createElement("li")

//lógica para mostrar modal cuando se envia el form
boton_submit = document.getElementById("boton_submit");
modal = document.getElementById("modal");
boton_no = document.getElementById("boton_no")

//Lógica para validar la información ingresada
const input_sector = document.getElementById("sector");
const contador = document.getElementById("contador");

const input_nombre = document.getElementById("nombre");
let li_nombre = document.getElementById("li_nombre");

const input_email = document.getElementById("email");
const contador_nombre = document.getElementById("contador_nombre");

const input_cel = document.getElementById("tel")

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

function mostrar_input_tema(){
    if(select_tema.value == "otro"){
        list_tema.appendChild(input_tema);
        ul_tema.appendChild(list_tema)
    } else{
        list_tema.replaceChildren()
    }
}

let i = 0; //definición de un contador fuera de la función para que no se actualice
function mostrar_input_foto(){
    if(i==0){
        list_foto.appendChild(input_foto);
        ul_foto.appendChild(list_foto)
        i+=1
    }
    else if(i>0 & i<=3){
        const input_clon = input_foto.cloneNode(true);
        list_foto.appendChild(input_clon);
        ul_foto.appendChild(list_foto)
        i +=1
    }else if (i==4){
        msg = document.createElement("p")
        msg.textContent = "¡El máximo de fotos soportadas es de 5!"
        msg.style.color = "red"
        msg.style.marginTop = "4px"
        msg.style.marginLeft = "92px"
        ul_foto.appendChild(msg)
        i +=1
    }else{

    }
}


function mostrar_modal(){
    modal.style.display = "block"; //mostramos el modal
    document.getElementById("form").style.display="none" //sacamos de vista el formulario
}

function cerrar_modal(){
    modal.style.display = "none"; //sacamos de vista la modal
    document.getElementById("form").style.display="block" //devolvemos la vista al formulario
}

//Funciones de validación

function actualizarContador(input,contador) {
    const max = input.maxLength;
    const actual = input.value.length;
    contador.textContent = `${max - actual} caracteres restantes`;
  }



function validar_region() {
    //Quiere decir que está no seleccionado
    if (select_region.value == "") {
        let existingError = li_region.querySelector("p");
        if (!existingError) {
            const msg_comuna = document.createElement("p");
            msg_comuna.textContent = "Este campo es requerido";
            msg_comuna.style.color = "red";
            msg_comuna.style.marginTop = "1px";
            li_region.appendChild(msg_comuna);
        }
        return false
    //Está seleccionado 
    } else if(select_region.value != "") {
        const existingError = li_region.querySelector("p");
        if (existingError) {
            li_region.removeChild(existingError);
        }
        return true
    }
}

function validar_nombre() {
    //Quiere decir que está vacio
    if (input_nombre.value == "") {
        let existingError = li_nombre.querySelector("p");
        if (!existingError) {
            const msg_nombre = document.createElement("p");
            msg_nombre.textContent = "Este campo es requerido";
            msg_nombre.style.color = "red";
            msg_nombre.style.marginTop = "1px";
            li_nombre.appendChild(msg_nombre);
        }
        return false
    //no está vacio
    } else if(input_nombre.value != "") {
        const existingError = li_nombre.querySelector("p");
        if (existingError) {
            li_nombre.removeChild(existingError);
        }
    }
    return true
}

function validar_comuna() {
    //Quiere decir que está no seleccionado
    if (select_comuna.value == "") {
        let existingError = li_comuna.querySelector("p");
        if (!existingError) {
            const msg_comuna = document.createElement("p");
            msg_comuna.textContent = "Este campo es requerido";
            msg_comuna.style.color = "red";
            msg_comuna.style.marginTop = "1px";
            li_comuna.appendChild(msg_comuna);
        }
        return false
    //Está seleccionado 
    } else if(select_comuna.value != "") {
        const existingError = li_comuna.querySelector("p");
        if (existingError) {
            li_comuna.removeChild(existingError);
        }
        return true
    }
}

function validar_email() {
    //Quiere decir que esta vacio o no contiene @
    if (input_email.value == "" || !input_email.value.includes("@")) {
        let existingError = li_email.querySelector("p");
        if (!existingError) {
            const msg = document.createElement("p");
            msg.textContent = "Este campo es requerido y debe cumplir con el formato de correo electrónico";
            msg.style.color = "red";
            msg.style.marginTop = "1px";
            li_email.appendChild(msg);
        }
        return false
    //no esta vacio y además contiene @
    } else if(input_email.value.includes("@") && input_email != "") {
        const existingError = li_email.querySelector("p");
        if (existingError) {
            li_email.removeChild(existingError);
        }
        return true
    }
}

function validar_telefono() {
    //Quiere decir que no cumple el formato pedido
    exreg = /^\+\d{3}\s?\d{6}$/;
    if (!exreg.test(input_cel.value)) {
        let existingError = li_celu.querySelector("p");
        if (!existingError) {
            const msg = document.createElement("p");
            msg.textContent = "Este campo es requerido y debe cumplir con el formato de celular";
            msg.style.color = "red";
            msg.style.marginTop = "1px";
            li_celu.appendChild(msg);
        }
        return false
    //cumple el formato
    } else if(exreg.test(input_cel.value)){
        const existingError = li_celu.querySelector("p");
        if (existingError) {
            li_celu.removeChild(existingError);
        }
        return true
    }
}
//Definimos los eventos asociados a los elementos del formulario
select_region.addEventListener("change",mostrarComunas);
select_rss.addEventListener("change",mostrar_input_rss);
select_tema.addEventListener("change",mostrar_input_tema);
boton_foto.addEventListener("click",mostrar_input_foto);
input_sector.addEventListener('input', function(){
    actualizarContador(this,contador)
});
input_nombre.addEventListener("input",function(){
    actualizarContador(this,contador_nombre)
})

//El botón que permite agregar la actividad debería hacer catch de las validaciones de los campos ingresados
boton_submit.addEventListener("click",validar_region);
boton_submit.addEventListener("click",validar_comuna);
boton_submit.addEventListener("click",validar_nombre);
boton_submit.addEventListener("click",validar_email);
boton_submit.addEventListener("click",validar_telefono);

boton_submit.addEventListener("click",function(event){
    const regionValid = validar_region();
    const comunaValid = validar_comuna();
    const nombreValid = validar_nombre();
    const emailValid = validar_email();
    const telefonoValid = validar_telefono();
    if(regionValid && comunaValid && nombreValid && emailValid && telefonoValid){
        mostrar_modal();
    }
    else{
        event.preventDefault();
    }
});
boton_no.addEventListener("click",cerrar_modal)