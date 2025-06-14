let trs = document.getElementById("div").querySelectorAll("tr#tr")
let btns = document.querySelectorAll("button#boton_comentario_submit")
function ver_comentarios(){
let trs = document.getElementById("div").querySelectorAll("tr#tr")
for(let i =0; i< trs.length; i++){
    trs[i].addEventListener("click", () => {
    fetch('/comments')
    .then(response => response.json())
    .then(data => {

        for (let i = 0; i < data.nombres.length; i++) {
            const id = data.id_actividades[i]; //necesitamos este dato para desambiguar a dónde debemos agregar la info
            console.log(`lista_de_comentarios_${id}`);
            const contenedor_comentarios = document.getElementById(`lista_de_comentarios_${id}`);
            if(contenedor_comentarios != null){
            console.log(contenedor_comentarios)
            const li_comentario = document.createElement('li');
            const p_nombre = document.createElement('p');
            const p_fecha = document.createElement('p');
            const p_texto = document.createElement('p');

            p_nombre.textContent = data.nombres[i];
            p_fecha.textContent = data.fechas[i];
            p_texto.textContent = data.textos[i];

            [p_nombre, p_fecha, p_texto].forEach(element => {
                li_comentario.appendChild(element);
            });

            contenedor_comentarios.appendChild(li_comentario);
        }
        }
    })
    .catch(err => {
        alert(err.error)
        console.error("Error cargando comentarios:", err);
    });
});
}
}
ver_comentarios()

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form_comentario');
    const errorDiv = document.getElementById('error_comentario');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        errorDiv.textContent = ''; 

        const formData = new FormData(form);

        fetch('/comments', {
            method: 'POST',
            body: formData
        })
        .then(async response => {
            if (!response.ok) {
                const error = await response.json();
                errorDiv.textContent = error.error;
            } else {
                alert('Comentario agregado exitosamente');
                form.reset();
                ver_comentarios()
            }
        })
        .catch(error => {
            console.error('Error al enviar el comentario:', error);
            errorDiv.textContent = 'Ocurrió un error inesperado.';
        });
    });
});