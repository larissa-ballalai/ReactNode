import React from "react"
import { motion } from 'framer-motion';

export default function QuestionBack (props){
    return  (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}transition={{duration:1.5}}>
            <div><img alt="" className="img-fluid back" src={props.src}/></div>
        </motion.div>
    )
}


