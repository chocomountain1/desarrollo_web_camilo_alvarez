window.addEventListener("DOMContentLoaded", () => {
    fetch('/comments')
    .then(response => response.json())
    .then(data => {

        for (let i = 0; i < data.nombres.length; i++) {
            const id = data.id_actividades[i]; //necesitamos este dato para desambiguar a dónde debemos agregar la info
            console.log(`lista_de_comentarios_${id}`);
            const contenedor_comentarios = document.getElementById(`lista_de_comentarios_${id}`);
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
    })
    .catch(err => {
        console.error("Error cargando comentarios:", err);
    });
});
