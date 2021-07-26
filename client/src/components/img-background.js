import React from "react";

function ImgBackground (props) {
    return (
      <div className="row "> 
          <div className="m-auto col-md linhaborda">
              <div className="col-md  d-flex justify-content-center"> 
                  <div className="form-group">
                      <label type="button" className={props.classname} htmlFor="arquivo">
                          <img alt="" className="file" src={props.src} /> Upload Background
                      </label>
                      <input type="file" name="arquivo" id="arquivo" className="form-control py-1" onChange={props.addFiles} />
                  </div>
              </div> 
              <div className="col-md">
                  {props.file.name && 
                      <div key={"rd_" + props.file.name} className=" col-md card shadow mx-auto p-1 m-1 ">                    
                          <img key={props.file.name} className="imgpreview card-img-top img-fluid " src={props.file.blob} alt="" />
                          <div className="linha my-1"></div>
                          <h4 className="card-title font-12 mb-0 mt-2 pl-2 text-dark"> {props.file.name}</h4>
                          <div className=" m-auto">
                              <img className="m-b-5 m-t-10 cancelred buts" alt="" src="../../img/brocoli.png" key={"bt_" + props.file.name} onClick={() => props.deleteFile(props.file.name)} />
                          </div>
                      </div>
                  }
              </div>
          </div>
      </div>
    );
}

export default ImgBackground
