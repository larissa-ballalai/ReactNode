import React, { useEffect } from "react"
import Structure from "./site-structure"
import { resume } from "../scripts/test"
import Header from "./header";

function PTResume () {

useEffect(() =>{ document.body.style.backgroundImage = "url('../img/fundoazul.png')";},[])

const onSubmit = (e) => {
    e.preventDefault()
    resume()
}

return (
  <Structure>
    <Header/>
    <div className="row m-t-16">
      <div className="col-sm-11 m-auto">
          <div className="text-center m-t-10">
              <p className="t0">TESTE</p>
              <div>
                  <h1 className="tblue t2 m-t-20 m-b-10">Vamos continuar?</h1>
              </div>
              <label className="start"> Quando estiver pronto para seguir com o teste, clique em "Continuar" </label>
          </div>
      </div>
    </div>
    <form onSubmit={onSubmit}>
        <div className="row mt3">
            <div className="col-sm-11 m-auto text-center">              
                <input type="submit" value="CONTINUAR" className="btn-big grad-mains " />
            </div>
        </div>
    </form>
  </Structure>
);
}
export default PTResume
