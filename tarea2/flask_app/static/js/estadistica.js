function first_graph(){
    fetch('/chart_data') //llamamos al backend para cargar los datos
    .then(response => {
        if(!response.ok){
            return response.json().then(errorData => {
                throw errorData
            })
        }
        return response.json(); //Necesitamos parsear a json
    })
    .then(data => {
        console.log("hola pase por aca siii")
        console.log("que",data.dias,data.cantidad)
        $.plot($("#1graph"),[ [list(data.dias),list(data.cantidad)] ])
    })
    .catch(error => console.error('Error:', error.status))
}

first_graph() //ploteamos