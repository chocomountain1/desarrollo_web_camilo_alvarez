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
    .then(raw_data => {
        data = [] // la dejamos como una lista vacía
        raw_data.dias.forEach((element,i) => {
            data.push([element, raw_data.cantidad[i]])
        }); //poblamos data 
        console.log("data",data)
        $.plot($("#1graph"),[data],{
            xaxis:{
                mode:"categories",
                tickLength: 0
            },
            series:{
                lines: {show: true},
                points: {show: true}
            },
            yaxis:{
                tickSize:1
            },
            grid:{
                margin: {
                    bottom: 50,
                    right: 50
                }
            }
        })
    })
    .catch(error => console.error('Error:', error.status))
}

first_graph() //ploteamos el primer grafico

function second_graph(){
    fetch('/chart_data2') //llamamos al backend para cargar los datos
    .then(response => {
        if(!response.ok){
            return response.json().then(errorData => {
                throw errorData
            })
        }
        return response.json(); //Necesitamos parsear a json
    })
    .then(raw_data => {
        data = [] // la dejamos como una lista de diccionarios vacía
        raw_data.tema.forEach((element,i) => {
            data.push({label: element, data: raw_data.cantidad[i]})
        }); //poblamos data 
        console.log("data",data)
        $.plot($("#2graph"),data, {
            series:{
                pie:{
                    show: true,
                    label: {
                        show:true
                    }
                }
            },
            legend:{
                show: true
            }
        })
    })
    .catch(error => console.error('Error:', error.status))
}
second_graph()