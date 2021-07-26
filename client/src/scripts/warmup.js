export const warmup = (path) => {
    var next_model = parseInt(path.split("/")[2]) + 1
        
    if(next_model > 9) window.location = "../start"
    else
        window.location = "../warmup/" + next_model
}

export const warmupLayout = (order) => { 
    switch(order) {
        case "1": // listening a         
            var layout = {
                bolal:"bola bdb-b b-l",
                bolar:"bola bdb-b b-r",
                cordar:"corda bd-b cr-r",
                cordal:"corda bd-b cr-l",
                color:"tl-1 cl-b",
                model: "Listening",
                icon: "../img/redfone.png",
                subtitle: "Escute o enunciado e selecione a opcão correta. ",
                backgroundImage: "url('../img/fundoazul.png')",
            }  
            warmupBackground(layout)            
            return layout
        case "2":
            var layout = { 
                bolal:"bola bdb-b b-l",
                bolar:"bola bdb-b b-r",
                cordar:"corda bd-b cr-r",
                cordal:"corda bd-b cr-l",
                color:"tl-1 cl-b",
                model: "Listening",
                icon: "../img/redfone.png",
                subtitle: "Escute o áudio e selecione opção correta",
                backgroundImage: "url('../img/fundoazul.png')"
            }  
            warmupBackground(layout)            
            return layout
        case "3":
            var layout = {
                bolal:"bola bdb-o b-l",
                bolar:"bola bdb-o b-r",
                cordar:"corda bd-o  cr-r",
                cordal:"corda bd-o  cr-l",
                color:"tl-1 cl-o",
                model: "Reading",
                icon: "../img/nota.png",
                subtitle: "Leia o enunciado e selecione a opção correta.",
                backgroundImage: "url('../img/backpink.png')"
            }  
            warmupBackground(layout)            
            return layout
        case "4":
            var layout = {
                bolal:"bola bdb-o b-l",
                bolar:"bola bdb-o b-r",
                cordar:"corda bd-o  cr-r",
                cordal:"corda bd-o  cr-l",
                color:"tl-1 cl-o",
                model: "Reading",
                icon: "../img/nota.png",
                subtitle: "Leia o enunciado e selecione a opção correta.",
                backgroundImage: "url('../img/backpink.png')"
            }  
            warmupBackground(layout)            
            return layout
        case "5":
            var layout = {
                bolal:"bola bdb-o b-l",
                bolar:"bola bdb-o b-r",
                cordar:"corda bd-o  cr-r",
                cordal:"corda bd-o  cr-l",
                color:"tl-1 cl-o",
                model: "Grammar",
                icon: "../img/nota.png",
                subtitle: "Complete a frase selecionando a opção correta de cada caixinha.",
                backgroundImage: "url('../img/backpink.png')"
            }  
            warmupBackground(layout)            
            return layout
        case "6":
            var layout = {
                bolal:"bola bdb-p b-l",
                bolar:"bola bdb-p b-r",
                cordar:"corda bd-p cr-r",
                cordal:"corda bd-p cr-l",
                color:"tl-1 cl-p",
                model: "Writing",
                icon: "../img/iconwriting.png",
                subtitle: "Escute o enunciado, e transcreva exatamente o que ouviu. ",
                backgroundImage: "url('../img/fundoroxo.png')"
            }  
            warmupBackground(layout)            
            return layout
        case "7":
            var layout = {
                bolal:"bola bdb-p b-l",
                bolar:"bola bdb-p b-r",
                cordar:"corda bd-p cr-r",
                cordal:"corda bd-p cr-l",
                color:"tl-1 cl-p",
                model: "Writing",
                icon: "../img/iconwriting.png",
                subtitle: "Leia o enunciado e responda a pergunta abaixo",
                backgroundImage: "url('../img/fundoroxo.png')"
            }  
            warmupBackground(layout)            
            return layout
        case "8":
            var layout = {
                bolal:"bola bdb-g b-l",
                bolar:"bola bdb-g b-r",
                cordar:"corda bd-g cr-r",
                cordal:"corda bd-g cr-l",
                color:"tl-1 cl-g1",
                model: "Speaking",
                icon: "../img/iconspeaking.png",
                subtitle: "Escute o enunciado e grave a resposta correta. Clique no microfone para gravar, e clique novamente para enviar sua resposta.",
                backgroundImage: "url('../img/fundoverde.png')"
            }  
            warmupBackground(layout)            
            return layout
        case "9":
            var layout = {
                bolal:"bola bdb-g b-l",
                bolar:"bola bdb-g b-r",
                cordar:"corda bd-g cr-r",
                cordal:"corda bd-g cr-l",
                color:"tl-1 cl-g1",
                model: "Speaking",
                icon: "../img/iconspeaking.png",
                subtitle: "Grave sua resposta.",
                backgroundImage: "url('../img/fundoverde.png')"
            }  
            warmupBackground(layout)            
            return layout
        case "10":
            var layout = {
                bolal:"bola bdb-g b-l",
                bolar:"bola bdb-g b-r",
                cordar:"corda bd-g cr-r",
                cordal:"corda bd-g cr-l",
                color:"tl-1 cl-g1",
                model: "Speaking",
                icon: "../img/iconspeaking.png",
                subtitle: "Grave sua resposta.",
                backgroundImage: "url('../img/fundoverde.png')"
            }  
            warmupBackground(layout)            
            return layout
        default:
            return;
    }    
}

const warmupBackground = (layout) => {     
    document.body.style.backgroundImage = layout.backgroundImage 
}
