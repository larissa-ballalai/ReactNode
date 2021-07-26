import React from "react";
import Recording from "./recording";
import { motion} from 'framer-motion';


function Multiplechoicerecord (props) {
    return ( 
        <motion.div initial={{ opacity:0}} animate={{ opacity:1}} exit={{opacity:0}} transition={{duration:3}}>     
        <div className="row">
            {props.choices.map((choices, key) => (
                <div key={key} className="col-md-11 m-auto ">
                    <div className="m-b-20">
                        <div className="form-group ">
                            {choices.optionlist.map((text, key) => (
                                <div key={"opt_" + text} className="options d-flex justify-content-center m-t-5"  onClick={() => props.start(key)} id={"play_" + key} >   
                                    <div className="stm1" > {text} </div>                                     
                                </div>                                
                            ))}
                            <div onClick={() => props.stop()} id="stop" className="none" >
                                <div id="fadee" >                               
                                <Recording type={"bars"} color={"red"} />                           
                                    <h1 className="m-t-xl stop txt-up bold text-center text-red ">GRAVANDO</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        </motion.div>
    );
  }
export default Multiplechoicerecord ; 
