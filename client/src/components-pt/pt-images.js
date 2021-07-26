import React from "react";
import { motion} from 'framer-motion';

function PTImages (props) {
  return (
      <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}transition={{duration:3}}>
        <div className="w-500 m-auto m-t-20">
            <div onChange={props.onChange}  className="row justify-content-center m-b-20 ">
              {(props.files || []).map((file) => (
                  <div value={file.name}  onClick={() => props.onChangeValues(file.name)}  key={"rd_" + file.name} className=" wm-200  m-1 b-img "  >
                    <img key={file.name} className="imgpreview card-img-top img-fluid " src={file.blob} alt="..." />
                  </div>
              ))}
            </div>
        </div>
      </motion.div>
  );
}
export default PTImages;
