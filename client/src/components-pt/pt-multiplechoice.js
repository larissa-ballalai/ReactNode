import React from "react";
import { motion } from 'framer-motion';

function Multiplechoice(props){
    return (
      <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:3}}>
        <div className="row m-t-10">
          {props.choices.map((choices, key) => (
            <div key={key} className="col-md-9 m-auto">
              <div className="m-b-20 ">
                <div className="form-group ">
                    {choices.optionlist.map((text) => (
                      <div onClick={() => props.correctAnswer(text)} key={"opt_" + text} className="options d-flex justify-content-center m-t-5">
                        <div className="stm1">{text}</div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }
export default Multiplechoice ;
