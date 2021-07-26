import React from 'react'
import { Link } from 'react-router-dom'
import { clearSession } from "../scripts/isLoggedIn"

function Header() {
  return(
    <div className="row margin  ma-b">
        {/* <div className="col-2 header"> <img className="logo" src="../../img/logo-conexia.png" alt="" /> </div>
        <div className="col-2 header "><img className="logo hf" src="../../img/logo-HighFive.png" alt=""/></div> */}
        <div className="col-12 d-flex justify-content-end"><Link onClick={() => clearSession("userPT")} className="btn-sair sair">Sair</Link></div>
    </div>
  )
}
export default Header