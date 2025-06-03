function first_graph(){
    fetch('/chart_data') //llamamos al backend para cargar los datos
    .then(response => {
        if(!response.ok){
            return response.json().then(errorData => {
                throw errorData
            })
        }
    })
    .then(data =>{
        $.plot($("#1graph"),[[list(data.dias)],[list(data.cantidad)]])
    })
    .catch(error => console.error('Error:', error.status))
}

first_graph()