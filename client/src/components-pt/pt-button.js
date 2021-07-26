import React from "react";
import { motion} from 'framer-motion';

function PTButton(props){  
  return (
    <motion.div initial={{ opacity:0}} animate={{ opacity:1}} exit={{opacity:0}} transition={{duration:3}}>
    <div key="button">
      <div className="d-flex justify-content-center bd-highlight mb-3 m-t-20">
        <input  id="bt_next" type="submit" value="proximo" className={props.class} />
      </div>
    </div>
    </motion.div>
  );
}
export default PTButton ;
