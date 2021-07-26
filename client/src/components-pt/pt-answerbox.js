import React from "react";
import { motion} from 'framer-motion';

function AnswerBox (props) {
    return (
      <motion.div initial={{ y:0, opacity:0}} animate={{ y:0,  opacity:1}}  exit={{y:-100,  opacity:0}} stransition={{duration:1}}>
        <div className="row text-center m-t-40">
          <div className="col-sm">
            <div className="form-group">
              {props.chuncks.map((text, index) => (
                <div onChange={props.onChange1} className="p-1 d-inline-block m-t-10" key={index}>
                  {text.position.length !== undefined ? (
                    <div className="st2">{text.text}</div>
                  ) : ( 
                    
                    <select name={text.position} className="m-t-8" id="apparence-select" onChange={props.onChange}>
                        <option key={"opt_"} value="-" className="f-18">
                          -
                        </option>
                        {props.choices[text.position].optionlist.map(
                          (text, index) => (
                            <option key={"opt_" + index} value={text} className="stm1">
                              {text}
                            </option>
                          ) 
                        )}
                    </select>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        </motion.div>
    );
  }
  export default AnswerBox;
