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
let region_comuna = {
    "regiones": [
        {
        "numero": 1, "nombre": "Región de Tarapacá",
        "comunas": [{"id": 10301, "nombre": "Camiña"}, {"id": 10302, "nombre": "Huara"}, {"id": 10303, "nombre": "Pozo Almonte"}, {"id": 10304, "nombre": "Iquique"}, {"id": 10305, "nombre": "Pica"}, {"id": 10306, "nombre": "Colchane"}, {"id": 10307, "nombre": "Alto Hospicio"}]
        },
        {
        "numero": 2, "nombre": "Región de Antofagasta",
        "comunas": [{"id": 20101, "nombre": "Tocopilla"}, {"id": 20102, "nombre": "Maria Elena"}, {"id": 20201, "nombre": "Ollague"}, {"id": 20202, "nombre": "Calama"}, {"id": 20203, "nombre": "San Pedro Atacama"}, {"id": 20301, "nombre": "Sierra Gorda"}, {"id": 20302, "nombre": "Mejillones"}, {"id": 20303, "nombre": "Antofagasta"}, {"id": 20304, "nombre": "Taltal"}]
        },
        {
        "numero": 3, "nombre": "Región de Atacama",
        "comunas": [{"id": 30101, "nombre": "Diego de Almagro"}, {"id": 30102, "nombre": "Chañaral"}, {"id": 30201, "nombre": "Caldera"}, {"id": 30202, "nombre": "Copiapo"}, {"id": 30203, "nombre": "Tierra Amarilla"}, {"id": 30301, "nombre": "Huasco"}, {"id": 30302, "nombre": "Freirina"}, {"id": 30303, "nombre": "Vallenar"}, {"id": 30304, "nombre": "Alto del Carmen"}]
        },
        {
        "numero": 4, "nombre": "Región de Coquimbo ",
        "comunas": [{"id": 40101, "nombre": "La Higuera"}, {"id": 40102, "nombre": "La Serena"}, {"id": 40103, "nombre": "Vicuña"}, {"id": 40104, "nombre": "Paihuano"}, {"id": 40105, "nombre": "Coquimbo"}, {"id": 40106, "nombre": "Andacollo"}, {"id": 40201, "nombre": "Rio Hurtado"}, {"id": 40202, "nombre": "Ovalle"}, {"id": 40203, "nombre": "Monte Patria"}, {"id": 40204, "nombre": "Punitaqui"}, {"id": 40205, "nombre": "Combarbala"}, {"id": 40301, "nombre": "Mincha"}, {"id": 40302, "nombre": "Illapel"}, {"id": 40303, "nombre": "Salamanca"}, {"id": 40304, "nombre": "Los Vilos"}]
        },
        {
        "numero": 5, "nombre": "Región de Valparaíso",
        "comunas": [{"id": 50101, "nombre": "Petorca"}, {"id": 50102, "nombre": "Cabildo"}, {"id": 50103, "nombre": "Papudo"}, {"id": 50104, "nombre": "La Ligua"}, {"id": 50105, "nombre": "Zapallar"}, {"id": 50201, "nombre": "Putaendo"}, {"id": 50202, "nombre": "Santa Maria"}, {"id": 50203, "nombre": "San Felipe"}, {"id": 50204, "nombre": "Pencahue"}, {"id": 50205, "nombre": "Catemu"}, {"id": 50206, "nombre": "Llay Llay"}, {"id": 50301, "nombre": "Nogales"}, {"id": 50302, "nombre": "La Calera"}, {"id": 50303, "nombre": "Hijuelas"}, {"id": 50304, "nombre": "La Cruz"}, {"id": 50305, "nombre": "Quillota"}, {"id": 50306, "nombre": "Olmue"}, {"id": 50307, "nombre": "Limache"}, {"id": 50401, "nombre": "Los Andes"}, {"id": 50402, "nombre": "Rinconada"}, {"id": 50403, "nombre": "Calle Larga"}, {"id": 50404, "nombre": "San Esteban"}, {"id": 50501, "nombre": "Puchuncavi"}, {"id": 50502, "nombre": "Quintero"}, {"id": 50503, "nombre": "Viña del Mar"}, {"id": 50504, "nombre": "Villa Alemana"}, {"id": 50505, "nombre": "Quilpue"}, {"id": 50506, "nombre": "Valparaiso"}, {"id": 50507, "nombre": "Juan Fernandez"}, {"id": 50508, "nombre": "Casablanca"}, {"id": 50509, "nombre": "Concon"}, {"id": 50601, "nombre": "Isla de Pascua"}, {"id": 50701, "nombre": "Algarrobo"}, {"id": 50702, "nombre": "El Quisco"}, {"id": 50703, "nombre": "El Tabo"}, {"id": 50704, "nombre": "Cartagena"}, {"id": 50705, "nombre": "San Antonio"}, {"id": 50706, "nombre": "Santo Domingo"}]
        },
        {
        "numero": 6, "nombre": "Región del Libertador Bernardo Ohiggins",
        "comunas": [{"id": 60101, "nombre": "Mostazal"}, {"id": 60102, "nombre": "Codegua"}, {"id": 60103, "nombre": "Graneros"}, {"id": 60104, "nombre": "Machali"}, {"id": 60105, "nombre": "Rancagua"}, {"id": 60106, "nombre": "Olivar"}, {"id": 60107, "nombre": "Doñihue"}, {"id": 60108, "nombre": "Requinoa"}, {"id": 60109, "nombre": "Coinco"}, {"id": 60110, "nombre": "Coltauco"}, {"id": 60111, "nombre": "Quinta Tilcoco"}, {"id": 60112, "nombre": "Las Cabras"}, {"id": 60113, "nombre": "Rengo"}, {"id": 60114, "nombre": "Peumo"}, {"id": 60115, "nombre": "Pichidegua"}, {"id": 60116, "nombre": "Malloa"}, {"id": 60117, "nombre": "San Vicente"}, {"id": 60201, "nombre": "Navidad"}, {"id": 60202, "nombre": "La Estrella"}, {"id": 60203, "nombre": "Marchigue"}, {"id": 60204, "nombre": "Pichilemu"}, {"id": 60205, "nombre": "Litueche"}, {"id": 60206, "nombre": "Paredones"}, {"id": 60301, "nombre": "San Fernando"}, {"id": 60302, "nombre": "Peralillo"}, {"id": 60303, "nombre": "Placilla"}, {"id": 60304, "nombre": "Chimbarongo"}, {"id": 60305, "nombre": "Palmilla"}, {"id": 60306, "nombre": "Nancagua"}, {"id": 60307, "nombre": "Santa Cruz"}, {"id": 60308, "nombre": "Pumanque"}, {"id": 60309, "nombre": "Chepica"}, {"id": 60310, "nombre": "Lolol"}]
        },
        {
        "numero": 7, "nombre": "Región del Maule",
        "comunas": [{"id": 70101, "nombre": "Teno"}, {"id": 70102, "nombre": "Romeral"}, {"id": 70103, "nombre": "Rauco"}, {"id": 70104, "nombre": "Curico"}, {"id": 70105, "nombre": "Sagrada Familia"}, {"id": 70106, "nombre": "Hualañe"}, {"id": 70107, "nombre": "Vichuquen"}, {"id": 70108, "nombre": "Molina"}, {"id": 70109, "nombre": "Licanten"}, {"id": 70201, "nombre": "Rio Claro"}, {"id": 70202, "nombre": "Curepto"}, {"id": 70203, "nombre": "Pelarco"}, {"id": 70204, "nombre": "Talca"}, {"id": 70205, "nombre": "Pencahue"}, {"id": 70206, "nombre": "San Clemente"}, {"id": 70207, "nombre": "Constitucion"}, {"id": 70208, "nombre": "Maule"}, {"id": 70209, "nombre": "Empedrado"}, {"id": 70210, "nombre": "San Rafael"}, {"id": 70301, "nombre": "San Javier"}, {"id": 70302, "nombre": "Colbun"}, {"id": 70303, "nombre": "Villa Alegre"}, {"id": 70304, "nombre": "Yerbas Buenas"}, {"id": 70305, "nombre": "Linares"}, {"id": 70306, "nombre": "Longavi"}, {"id": 70307, "nombre": "Retiro"}, {"id": 70308, "nombre": "Parral"}, {"id": 70401, "nombre": "Chanco"}, {"id": 70402, "nombre": "Pelluhue"}, {"id": 70403, "nombre": "Cauquenes"}]
        },
        {
        "numero": 8, "nombre": "Región del Biobío",
        "comunas": [{"id": 80201, "nombre": "Tome"}, {"id": 80202, "nombre": "Florida"}, {"id": 80203, "nombre": "Penco"}, {"id": 80204, "nombre": "Talcahuano"}, {"id": 80205, "nombre": "Concepcion"}, {"id": 80206, "nombre": "Hualqui"}, {"id": 80207, "nombre": "Coronel"}, {"id": 80208, "nombre": "Lota"}, {"id": 80209, "nombre": "Santa Juana"}, {"id": 80210, "nombre": "Chiguayante"}, {"id": 80211, "nombre": "San Pedro de la Paz"}, {"id": 80212, "nombre": "Hualpen"}, {"id": 80301, "nombre": "Cabrero"}, {"id": 80302, "nombre": "Yumbel"}, {"id": 80303, "nombre": "Tucapel"}, {"id": 80304, "nombre": "Antuco"}, {"id": 80305, "nombre": "San Rosendo"}, {"id": 80306, "nombre": "Laja"}, {"id": 80307, "nombre": "Quilleco"}, {"id": 80308, "nombre": "Los Angeles"}, {"id": 80309, "nombre": "Nacimiento"}, {"id": 80310, "nombre": "Negrete"}, {"id": 80311, "nombre": "Santa Barbara"}, {"id": 80312, "nombre": "Quilaco"}, {"id": 80313, "nombre": "Mulchen"}, {"id": 80314, "nombre": "Alto Bio Bio"}, {"id": 80401, "nombre": "Arauco"}, {"id": 80402, "nombre": "Curanilahue"}, {"id": 80403, "nombre": "Los Alamos"}, {"id": 80404, "nombre": "Lebu"}, {"id": 80405, "nombre": "Cañete"}, {"id": 80406, "nombre": "Contulmo"}, {"id": 80407, "nombre": "Tirua"}]
        },
        {
        "numero": 9, "nombre": "Región de La Araucanía",
        "comunas": [{"id": 90101, "nombre": "Renaico"}, {"id": 90102, "nombre": "Angol"}, {"id": 90103, "nombre": "Collipulli"}, {"id": 90104, "nombre": "Los Sauces"}, {"id": 90105, "nombre": "Puren"}, {"id": 90106, "nombre": "Ercilla"}, {"id": 90107, "nombre": "Lumaco"}, {"id": 90108, "nombre": "Victoria"}, {"id": 90109, "nombre": "Traiguen"}, {"id": 90110, "nombre": "Curacautin"}, {"id": 90111, "nombre": "Lonquimay"}, {"id": 90201, "nombre": "Perquenco"}, {"id": 90202, "nombre": "Galvarino"}, {"id": 90203, "nombre": "Lautaro"}, {"id": 90204, "nombre": "Vilcun"}, {"id": 90205, "nombre": "Temuco"}, {"id": 90206, "nombre": "Carahue"}, {"id": 90207, "nombre": "Melipeuco"}, {"id": 90208, "nombre": "Nueva Imperial"}, {"id": 90209, "nombre": "Puerto Saavedra"}, {"id": 90210, "nombre": "Cunco"}, {"id": 90211, "nombre": "Freire"}, {"id": 90212, "nombre": "Pitrufquen"}, {"id": 90213, "nombre": "Teodoro Schmidt"}, {"id": 90214, "nombre": "Gorbea"}, {"id": 90215, "nombre": "Pucon"}, {"id": 90216, "nombre": "Villarrica"}, {"id": 90217, "nombre": "Tolten"}, {"id": 90218, "nombre": "Curarrehue"}, {"id": 90219, "nombre": "Loncoche"}, {"id": 90220, "nombre": "Padre Las Casas"}, {"id": 90221, "nombre": "Cholchol"}]
        },
        {
        "numero": 10, "nombre": "Región de Los Lagos",
        "comunas": [{"id": 100201, "nombre": "San Pablo"}, {"id": 100202, "nombre": "San Juan"}, {"id": 100203, "nombre": "Osorno"}, {"id": 100204, "nombre": "Puyehue"}, {"id": 100205, "nombre": "Rio Negro"}, {"id": 100206, "nombre": "Purranque"}, {"id": 100207, "nombre": "Puerto Octay"}, {"id": 100301, "nombre": "Frutillar"}, {"id": 100302, "nombre": "Fresia"}, {"id": 100303, "nombre": "Llanquihue"}, {"id": 100304, "nombre": "Puerto Varas"}, {"id": 100305, "nombre": "Los Muermos"}, {"id": 100306, "nombre": "Puerto Montt"}, {"id": 100307, "nombre": "Maullin"}, {"id": 100308, "nombre": "Calbuco"}, {"id": 100309, "nombre": "Cochamo"}, {"id": 100401, "nombre": "Ancud"}, {"id": 100402, "nombre": "Quemchi"}, {"id": 100403, "nombre": "Dalcahue"}, {"id": 100404, "nombre": "Curaco de Velez"}, {"id": 100405, "nombre": "Castro"}, {"id": 100406, "nombre": "Chonchi"}, {"id": 100407, "nombre": "Queilen"}, {"id": 100408, "nombre": "Quellon"}, {"id": 100409, "nombre": "Quinchao"}, {"id": 100410, "nombre": "Puqueldon"}, {"id": 100501, "nombre": "Chaiten"}, {"id": 100502, "nombre": "Futaleufu"}, {"id": 100503, "nombre": "Palena"}, {"id": 100504, "nombre": "Hualaihue"}]
        },
        {
        "numero": 11, "nombre": "Región Aisén del General Carlos Ibáñez del Campo",
        "comunas": [{"id": 110101, "nombre": "Guaitecas"}, {"id": 110102, "nombre": "Cisnes"}, {"id": 110103, "nombre": "Aysen"}, {"id": 110201, "nombre": "Coyhaique"}, {"id": 110202, "nombre": "Lago Verde"}, {"id": 110301, "nombre": "Rio Ibañez"}, {"id": 110302, "nombre": "Chile Chico"}, {"id": 110401, "nombre": "Cochrane"}, {"id": 110402, "nombre": "Tortel"}, {"id": 110403, "nombre": "O'Higins"}]
        },
        {
        "numero": 12, "nombre": "Región de Magallanes y la Antártica Chilena",
        "comunas": [{"id": 120101, "nombre": "Torres del Paine"}, {"id": 120102, "nombre": "Puerto Natales"}, {"id": 120201, "nombre": "Laguna Blanca"}, {"id": 120202, "nombre": "San Gregorio"}, {"id": 120203, "nombre": "Rio Verde"}, {"id": 120204, "nombre": "Punta Arenas"}, {"id": 120301, "nombre": "Porvenir"}, {"id": 120302, "nombre": "Primavera"}, {"id": 120303, "nombre": "Timaukel"}, {"id": 120401, "nombre": "Antartica"}]
        },
        {
        "numero": 13, "nombre": "Región Metropolitana de Santiago ",
        "comunas": [{"id": 130101, "nombre": "Tiltil"}, {"id": 130102, "nombre": "Colina"}, {"id": 130103, "nombre": "Lampa"}, {"id": 130201, "nombre": "Conchali"}, {"id": 130202, "nombre": "Quilicura"}, {"id": 130203, "nombre": "Renca"}, {"id": 130204, "nombre": "Las Condes"}, {"id": 130205, "nombre": "Pudahuel"}, {"id": 130206, "nombre": "Quinta Normal"}, {"id": 130207, "nombre": "Providencia"}, {"id": 130208, "nombre": "Santiago"}, {"id": 130209, "nombre": "La Reina"}, {"id": 130210, "nombre": "Ñuñoa"}, {"id": 130211, "nombre": "San Miguel"}, {"id": 130212, "nombre": "Maipu"}, {"id": 130213, "nombre": "La Cisterna"}, {"id": 130214, "nombre": "La Florida"}, {"id": 130215, "nombre": "La Granja"}, {"id": 130216, "nombre": "Independencia"}, {"id": 130217, "nombre": "Huechuraba"}, {"id": 130218, "nombre": "Recoleta"}, {"id": 130219, "nombre": "Vitacura"}, {"id": 130220, "nombre": "Lo Barrenechea"}, {"id": 130221, "nombre": "Macul"}, {"id": 130222, "nombre": "Peñalolen"}, {"id": 130223, "nombre": "San Joaquin"}, {"id": 130224, "nombre": "La Pintana"}, {"id": 130225, "nombre": "San Ramon"}, {"id": 130226, "nombre": "El Bosque"}, {"id": 130227, "nombre": "Pedro Aguirre Cerda"}, {"id": 130228, "nombre": "Lo Espejo"}, {"id": 130229, "nombre": "Estacion Central"}, {"id": 130230, "nombre": "Cerrillos"}, {"id": 130231, "nombre": "Lo Prado"}, {"id": 130232, "nombre": "Cerro Navia"}, {"id": 130301, "nombre": "San Jose de Maipo"}, {"id": 130302, "nombre": "Puente Alto"}, {"id": 130303, "nombre": "Pirque"}, {"id": 130401, "nombre": "San Bernardo"}, {"id": 130402, "nombre": "Calera de Tango"}, {"id": 130403, "nombre": "Buin"}, {"id": 130404, "nombre": "Paine"}, {"id": 130501, "nombre": "Peñaflor"}, {"id": 130502, "nombre": "Talagante"}, {"id": 130503, "nombre": "El Monte"}, {"id": 130504, "nombre": "Isla de Maipo"}, {"id": 130601, "nombre": "Curacavi"}, {"id": 130602, "nombre": "Maria Pinto"}, {"id": 130603, "nombre": "Melipilla"}, {"id": 130604, "nombre": "San Pedro"}, {"id": 130605, "nombre": "Alhue"}, {"id": 130606, "nombre": "Padre Hurtado"}]
        },
        {
        "numero": 14, "nombre": "Región de Los Ríos",
        "comunas": [{"id": 100101, "nombre": "Lanco"}, {"id": 100102, "nombre": "Mariquina"}, {"id": 100103, "nombre": "Panguipulli"}, {"id": 100104, "nombre": "Mafil"}, {"id": 100105, "nombre": "Valdivia"}, {"id": 100106, "nombre": "Los Lagos"}, {"id": 100107, "nombre": "Corral"}, {"id": 100108, "nombre": "Paillaco"}, {"id": 100109, "nombre": "Futrono"}, {"id": 100110, "nombre": "Lago Ranco"}, {"id": 100111, "nombre": "La Union"}, {"id": 100112, "nombre": "Rio Bueno"}]
        },
        {
        "numero": 15, "nombre": "Región Arica y Parinacota",
        "comunas": [{"id": 10101, "nombre": "Gral. Lagos"}, {"id": 10102, "nombre": "Putre"}, {"id": 10201, "nombre": "Arica"}, {"id": 10202, "nombre": "Camarones"}]
        },
        {
        "numero": 16, "nombre": "Región del Ñuble",
        "comunas": [{"id": 80101, "nombre": "Cobquecura"}, {"id": 80102, "nombre": "Ñiquen"}, {"id": 80103, "nombre": "San Fabian"}, {"id": 80104, "nombre": "San Carlos"}, {"id": 80105, "nombre": "Quirihue"}, {"id": 80106, "nombre": "Ninhue"}, {"id": 80107, "nombre": "Trehuaco"}, {"id": 80108, "nombre": "San Nicolas"}, {"id": 80109, "nombre": "Coihueco"}, {"id": 80110, "nombre": "Chillan"}, {"id": 80111, "nombre": "Portezuelo"}, {"id": 80112, "nombre": "Pinto"}, {"id": 80113, "nombre": "Coelemu"}, {"id": 80114, "nombre": "Bulnes"}, {"id": 80115, "nombre": "San Ignacio"}, {"id": 80116, "nombre": "Ranquil"}, {"id": 80117, "nombre": "Quillon"}, {"id": 80118, "nombre": "El Carmen"}, {"id": 80119, "nombre": "Pemuco"}, {"id": 80120, "nombre": "Yungay"}, {"id": 80121, "nombre": "Chillan Viejo"}]
        }
    ]
};

//Creamos las funciones que muestran los elementos que necesitemos
function mostrarComunas() {
    const region = document.getElementById("region").value;
    select_comuna.innerHTML=""
    if(region_comuna.regiones.some(r => r.nombre == region)){ //dic si posee la región seleccionada
        const no_seleccionado = document.createElement("option") //Necesitamos que esté esta opción cada vez que se actualiza la región seleccionada
        no_seleccionado.textContent = "No seleccionada"
        select_comuna.appendChild(no_seleccionado)
        const dic_region = region_comuna.regiones.find(r => r.nombre == region)
        let array_comunas = dic_region?.comunas
        array_comunas.forEach(comuna => {
            const txtnode = document.createElement("option");
            txtnode.value = comuna.nombre;
            txtnode.textContent = comuna.nombre;
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