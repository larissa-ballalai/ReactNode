import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Structure from "./site-structure";

function PTHome () {
  useEffect(() => { document.body.style.background = " linear-gradient(178.87deg, rgba(245, 249, 253, 0.8) 49.67%, rgba(208, 223, 241, 0.8) 96.65%)";},[])
  
return (
    <Structure>
      <form className="fhome">
        <div className="row home">
          <div className="col-xl-5 m-t-80">
            <h1 className="h1-t home tblue">Placement <span className="spc">Test</span></h1>
          </div>
          <div className="col-xl-7 home m-auto text-right">
            <img alt="" className="m-t-50 responsive2" src="../img/homeimg.png" />
          </div>
          <Link to="../login" className="btn-p grad-mains home home-but m-l-10 ">Entrar</Link>
        </div>
      </form>
    </Structure>
  );
}
export default PTHome