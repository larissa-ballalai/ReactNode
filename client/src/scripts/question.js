
export const questionLayout = (model) => {
    
    switch(model) {
        case "listening-a":        
            return {
                model: model,
                color:"tl-1 cl-b", 
                name:"Listening",
                bolal:"bola bdb-b  b-l",
                bolar:"bola bdb-b  b-r",
                cordar:"corda bd-b cr-r",
                cordal:"corda bd-b  cr-l",
                icon: "../../../img/redfone.png",
                subtitle: "Escute o enunciado e selecione a opcão correta. ",
                backgroundImage: "url('../../../img/fundoazul.png')" ,
                background: "#c9e8f9"
            }              
        case "listening-b":     
            return {
                model: model,
                color:"tl-1 cl-b", 
                name:"Listening",
                bolal:"bola bdb-b b-l",
                bolar:"bola bdb-b b-r",
                cordar:"corda bd-b cr-r",
                cordal:"corda bd-b cr-l",
                icon: "../../../img/redfone.png",
                subtitle: "Escute o áudio e selecione opção correta",
                backgroundImage: "url('../../../img/fundoazul.png')",
                background:"#c9e8f9"
            }  
        case "reading-a":     
            return { 
                model: model,
                color:"tl-1 cl-o", 
                name:"Reading",
                bolal:"bola bdb-o b-l",
                bolar:"bola bdb-o b-r",
                cordar:"corda bd-o cr-r",
                cordal:"corda bd-o cr-l",
                icon: "../../../img/nota.png",
                subtitle: "Leia o enunciado e selecione a opção correta.",
                backgroundImage: "url('../../../img/backpink.png')",
                background: "rgb(240 202 186 / 69%)"
            }  
        case "reading-b":     
            return {
                model: model,
                color:"tl-1 cl-o", 
                name:"Reading",
                bolal:"bola bdb-o b-l",
                bolar:"bola bdb-o b-r",
                cordar:"corda bd-o cr-r",
                cordal:"corda bd-o cr-l",
                icon: "../../../img/nota.png",
                subtitle: "Leia o enunciado e selecione a opção correta.",
                backgroundImage: "url('../../../img/backpink.png')",
                background: "rgb(240 202 186 / 69%)"
            } 
        case "grammar-a":     
            return {
                model: model,
                color:"tl-1 cl-o",
                name:"Grammar", 
                bolal:"bola bdb-o b-l",
                bolar:"bola bdb-o b-r",
                cordar:"corda bd-o cr-r",
                cordal:"corda bd-o cr-l",
                icon: "../../../img/nota.png",
                subtitle: "Complete a frase selecionando a opção correta de cada caixinha.",
                backgroundImage: "url('../../../img/backpink.png')",
                background: "rgb(240 202 186 / 69%)"
            }  
        case "writing-a":     
            return {
                model: model,
                color:"tl-1 cl-p", 
                name:"Writing",
                bolal:"bola bdb-p b-l",
                bolar:"bola bdb-p b-r",
                cordar:"corda bd-p cr-r",
                cordal:"corda bd-p cr-l",
                icon: "../../../img/iconwriting.png",
                subtitle: "Escute o enunciado, e transcreva exatamente o que ouviu. ",
                backgroundImage: "url('../../../img/fundoroxo.png')",
                background:"rgb(212 198 234 / 80%)"
            } 
            case "writing-b":     
            return {
                model: model,
                color:"tl-1 cl-p", 
                name:"Writing",
                bolal:"bola bdb-p b-l",
                bolar:"bola bdb-p b-r",
                cordar:"corda bd-p cr-r",
                cordal:"corda bd-p cr-l",
                icon: "../../../img/iconwriting.png",
                subtitle: "Leia o enunciado e responda a pergunta abaixo",
                backgroundImage: "url('../../../img/fundoroxo.png')",
                background:"rgb(212 198 234 / 80%)"
            } 
            case "speaking-a":     
            return {
                model: model,
                color:"tl-1 cl-g1", 
                name:"Speaking",
                bolal:"bola bdb-g b-l",
                bolar:"bola bdb-g b-r",
                cordar:"corda bd-g cr-r",
                cordal:"corda bd-g cr-l",
                icon: "../../../img/iconspeaking.png",
                subtitle: "Grave sua reposta.",
                backgroundImage:  "url('../../../img/fundoverde.png')",
                background:"rgb(180 233 212 / 48%)"
            } 
            case "speaking-b":     
            return {
                model: model,
                color:"tl-1 cl-g1", 
                name:"Speaking",
                bolal:"bola bdb-g b-l",
                bolar:"bola bdb-g b-r",
                cordar:"corda bd-g cr-r",
                cordal:"corda bd-g cr-l",
                icon: "../../../img/iconspeaking.png",
                subtitle: "Grave sua resposta.",
                backgroundImage: "url('../../../img/fundoverde.png')",
                background:"rgb(180 233 212 / 48%)"
            } 
        default:
            return
    }
}
