import React, { useEffect } from "react";
import Structure from "./site-structure";
import Header from './header'
import { Link } from "react-router-dom"; 

function TesteIntro () {
    useEffect(() => {document.body.style.background= " linear-gradient(178.87deg, rgba(245, 249, 253, 0.8) 12.91%, rgba(208, 223, 241, 0.8) 32.31%, rgba(190, 213, 240, 0.8) 98.18%)";},[])

      return ( 
        <Structure>
            <Header/>
            <div className="row  margin">
                <div className="col-md d-flex justify-content-center">
                    <div className="h1-t tblue v">Placement <span className="spc">Test</span></div>
                </div>
            </div>
            <div className="row  margin">
                <div className="col-md d-flex justify-content-center"><video id="video-intro" controls width="70%" height="100%" src="../img/newvideo.mp4" type="video/mp4"/></div>
            </div>
            <div className="row margin">
                <div className="col-md d-flex justify-content-center mt3" >
                    <Link className=" btn-big grad-mains" to="../intro">PROXIMA ETAPA</Link>
                </div>
            </div>
        </Structure>
      );
    }
export default TesteIntro