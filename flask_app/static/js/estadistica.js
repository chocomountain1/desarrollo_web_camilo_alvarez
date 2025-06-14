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
second_graph() //ploteamos el segundo grafico

function third_graph(){
    fetch('/chart_data3') //llamamos al backend para cargar los datos
    .then(response => {
        if(!response.ok){
            return response.json().then(errorData => {
                throw errorData
            })
        }
        return response.json(); //Necesitamos parsear a json
    })
    .then(raw_data => { //debido a que raw_data de parsear json y en tuplas de 3 necesitamos desambiguar
        var manana = [];
        var tarde = [];
        var noche = []

        raw_data.horario.forEach((element,i) => {
            if (element == "mañana"){
                manana.push([raw_data.meses[i], raw_data.cantidad[i]])
            }
            if(element == "tarde"){
                tarde.push([raw_data.meses[i],raw_data.cantidad[i]])
            }
            else{
                noche.push([raw_data.meses[i],raw_data.cantidad[i]])
            }
        }
    )
    var manana = {
    label: "Mañana",
    data: manana,
    bars: {
      show: true,
      barWidth: 0.1,
      order: 1
    },
    color: "#1f77b4"
  };

  var tarde = {
    label: "Tarde",
    data: tarde,
    bars: {
      show: true,
      barWidth: 0.1,
      order: 2
    },
    color: "#ff7f0e"
  };

  var noche = {
    label: "Noche",
    data: noche,
    bars: {
      show: true,
      barWidth: 0.1,
      order: 3
    },
    color: "#2ca02c"
  };

    $.plot("#3graph", [manana, tarde, noche], {
    xaxis: {
      mode: "categories"
    },
    grid: {
      margin:{
      }
    },
  });
})
    .catch(error => console.error('Error:', error.status))
}

third_graph() //ploteamos el tercer grafico
