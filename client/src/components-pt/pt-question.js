import React from "react";
import { motion} from 'framer-motion';

function PTQuestion (props) {
    return (
        <motion.div initial={{opacity:0}} animate={{opacity:1}}  exit={{opacity:0}} transition={{duration:1}}>
            <div className="col-sm-9 m-auto">
                <div className="st2">{props.sentence}</div>
            </div>
        </motion.div>
    );
  }
export default PTQuestion ;
