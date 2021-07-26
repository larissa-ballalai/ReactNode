import React, { useEffect } from "react";
import {motion} from 'framer-motion'

function PTAudio(props) {
useEffect(()=>{
  setTimeout(() => { document.getElementById("play").play()}, 1000);
},[])

return (
    <motion.div initial={{ opacity:0}} animate={{ opacity:1}} exit={{opacity:0}} transition={{duration:2}}>
      <div className="row justify-content-center " key={"ad_" + props.audio.name}>
          <figure>
              <audio id="play" src={props.audio.blob} controls className="none">
                Your browser does not support the <code>audio</code> element.
              </audio>
          </figure>
          <div onClick={() => { document.getElementById("play").play()}}>
              <img alt="" className="mx-81 cursor" src={props.img} />
                <div>
                  <label>Ouvir novamente</label>
                </div>  
          </div>           
      </div>
    </motion.div>
    );
  }
  export default PTAudio;
