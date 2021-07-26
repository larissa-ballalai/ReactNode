import { createTest } from "../scripts/test"

export const stopLayout = (order) => {
   
    switch(order) {
        case "1": //Listening
           var layout = {
               linha:"linha4 b",
               btn:" btn-big gradient-blue m-t-50 ",
               titulo:"tstop m-t-20 m-b-30 cstop-b",
               medal:"../../img/m-blue.png",
               border:"bord-blue card-body text-center",
               currentModel: "Listening",
               nextModel: "Grammar",
               backgroundImage: "url('../img/fundoazul.png')"
           }
           return layout
        case "2": //Grammar        
            var layout = {
                linha:"linha4 o-g",
                btn:" btn-big gradient-orange m-t-50",
                titulo:"tstop m-t-20 m-b-30 cstop-o",
                medal:"../../img/m-orange.png",
                border:"bord-orange card-body text-center",
                currentModel: "Grammar",
                nextModel: "Reading",
                backgroundImage: "url('../img/backpink.png')"
            }
            return layout
        case "3": //Reading
            var layout = {
                linha:"linha4 o-r",
                btn:" btn-big gradient-orange m-t-50",
                titulo:"tstop  m-t-20 m-b-30 cstop-o",
                medal:"../../img/m-orange.png",
                border:"bord-orange card-body text-center",
                currentModel: "Reading",
                nextModel: "Writing",
                backgroundImage: "url('../img/backpink.png')"
            }
            return layout
        case "4": //Writing
            var layout = {
                linha:"linha4 p",
                btn:" btn-big gradient-purple m-t-50",
                titulo:"tstop  m-t-20 m-b-30 cstop-p",
                medal:"../../img/m-purple.png",
                border:"bord-purple card-body text-center",
                currentModel: "Writing",
                nextModel: "Speaking",
                backgroundImage: "url('../img/fundoroxo.png')"
           }
           return layout
        default:
            return 
    }
}

export const nextModel = async(model) => {  
    switch(model) {
        case "1":
            await createTest("Grammar")
            break;
        case "2":
            await createTest("Reading")
            break;
        case "3":
            await createTest("Writing")
            break;
        case "4":
            await createTest("Speaking")
            break;      
        default:
            return 
    }
}
