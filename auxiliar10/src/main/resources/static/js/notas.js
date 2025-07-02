function mostrarFormulario(boton) {
        const id = boton.getAttribute('data-id');
        document.getElementById('celda-boton-' + id).style.display = 'none';
        document.getElementById('celda-form-' + id).style.display = 'table-cell';
    }


function ocultarForm(id){
    document.getElementById('celda-boton-' + id).style.display = 'table-cell';
    document.getElementById('celda-form-' + id).style.display = 'none';
}
function enviarNota(event) {
    event.preventDefault(); 

    const form = event.target;
    const actividadId = form.getAttribute("data-actividad-id");
    const nota = form.nota.value;

    fetch('/evaluar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `id=${actividadId}&nota=${nota}`
    })
    .then(response => {
        if (!response.ok) throw new Error("Error al guardar la nota");
        return response.text(); 
    })
    .then(data => {
        console.log("Nota guardada con éxito");
        ocultarForm(actividadId);
        return fetch(`/calcular-promedio?id=${actividadId}`)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Nuevo promedio", data.promedio);
        if(data.promedio == 0){
        document.getElementById("prom-" + actividadId).textContent = "-"
        }
        else{
        document.getElementById("prom-" + actividadId).textContent = data.promedio
        }
    })
    .catch(error => {
        console.error("Error al guardar la nota:", error);
        // Mostrar un mensaje de error al usuario
    });
}

function calculo_prom_inicial(){ 
    const trs = document.querySelectorAll("tr")
    const ids = Array.from(trs).map(tr=> tr.getAttribute("data-tr-id"))
    ids.forEach(actividadId =>{
        fetch(`/calcular-promedio?id=${actividadId}`)
    .then(response => response.json())
    .then(data => {
        console.log("Nuevo promedio", data.promedio);
        if(data.promedio == "0"){
        document.getElementById("prom-" + actividadId).textContent = "-"
        }
        else{
        document.getElementById("prom-" + actividadId).textContent = data.promedio
        }
    })
    .catch(error => {
        console.error("Error al guardar la nota:", error);
        
    });
    })
}

calculo_prom_inicial()

