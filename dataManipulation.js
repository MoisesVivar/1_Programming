const request = require("request")

const url = "https://api.stackexchange.com/2.2/search?order=desc&sort=activity&intitle=perl&site=stackoverflow"

request({url, json: true,gzip: true},(error,response) =>{
    //Obtener el numero de respuestas contestadas y no contestadas
    var answered = 0
    var notAnswered = 0
    response.body.items.forEach(item => {
        if (item.is_answered) answered++
        else notAnswered++     
    })
    console.log("2. Obtener el numero de respuestas contestadas y no contestadas")
    console.log("Preguntas contestadas: " + answered, "Preguntas no contestadas: " + notAnswered)
    console.log(" ")
    //Obtener la respuesta con menor número de vistas
    response.body.items.sort(function(a,b){
        if(a.view_count < b.view_count){
            return -1
        }
        if(a.view_count > b.view_count){
            return 1
        }
        return 0        
    })
    console.log("4. Obtener la respuesta con menor número de vistas")
    console.log("Titulo: " + response.body.items[0].title, "Vistas: " + response.body.items[0].view_count)
    console.log(" ")
    //Obtener la respuesta más vieja y más actual
    response.body.items.sort(function(a,b){
        if(a.creation_date < b.creation_date){
            return -1
        }
        if(a.creation_date > b.creation_date){
            return 1
        }
        return 0        
    })
    console.log("5. Obtener la respuesta más vieja y más actual")
    console.log("Titulo de la pregunta mas vieja: " + response.body.items[0].title, "Fecha: " + new Date(response.body.items[0].creation_date*1000))
    console.log("Titulo de la pregunta mas actual: " + response.body.items[response.body.items.length-1].title, "Fecha: " + new Date(response.body.items[response.body.items.length-1].creation_date*1000))
})