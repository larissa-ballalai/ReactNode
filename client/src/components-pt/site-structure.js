import React from "react";
import { motion} from 'framer-motion';

function Structure(props) {
  return (
    <motion.div  animate={{ x: 0, opacity: 1}} initial={{ x: 20, opacity: 0 }} exit={{ x: -20 , opacity: 0}} transition={{ duration: 0.2}}>  
      <div className="base">
          <div className="row">
            <div className="col-10 base-max m-auto">{props.children}</div>
          </div>
      </div>
    </motion.div>
  ); 
}
export default Structure;
