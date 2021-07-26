import React, { Component } from "react"
import Structure from "./site-structure"
import Header from "./header"
import { actionMenu } from "../scripts/menu"
import { userAction } from "../scripts/user"

export default class StudentsResults extends Component {
    constructor(props) {
        super(props); 
         this.state = {
            user:"",
            finalGrade: "",
            test:[]
          };           
    }  

    async componentDidMount() {
        const report = await userAction("GETREPORT", this.props.match.params.id)
        this.setState({ test: report.test})
      
        document.body.style.backgroundImage = "url('../img/fundoresults.png')";
        document.body.style.backgroundColor ="#dcf5ff94"                        
    }

    gerarPDF = () => {        
        var pdf = document.getElementById("pdf");
        pdf.style.display = "none";

        for(var i=0; i<this.state.test.length; i++) {
            for(var j=0; j<this.state.test[i].testByAbility.length; j++) {
                var menu = document.getElementById("idx_"+ j + i);
                menu.style.display = "none";
            }                       
        }
        
        window.print() 
        pdf.style.display = "block";
    }
        
render(){
    return(  
        <Structure>
            <Header/>
                <form>
                    <div>
                        {this.state.test.map((item,key1)=>(
                            <>
                                <div className="row m-t-50">
                                    <div className="col-sm-11 m-auto">
                                        <div className="text-center m-t-20">
                                            <h1 className="tblue f-p font-48 t1 result"> Parabéns!<br/> Você concluiu o Placement Test. </h1>
                                            <label className="start col-sm-11 ">{item.name}, confira os seus resultados e a suas notas. </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row m-b-30 m-t-20">
                                    <div className="col-md-8 m-auto">
                                        <div className="card qcard">
                                            <div className="card-body text-center">
                                                <img className="imgpdf" alt="" src="../../img/medalr.png"></img>
                                                <div className="tblue t1 font-28 tm">{item.finalGrade}</div>                            
                                                <div className="col-sm-10 d-flex m-auto">
                                                    <h5 className="b-results red-end-A1 font-20 f-p ">A1</h5>
                                                    <div className="dot"></div>
                                                    <h5 className="br-r red-end-A1 f-p">A2</h5>
                                                    <div className="dot"></div>
                                                    <h5 className="yellow-end f-p">B1</h5>
                                                    <div className="dot"></div>
                                                    <h5 className="yellow-end f-p">B2</h5>
                                                    <div className="dot"></div>
                                                    <h5 className="lightg-end f-p">C1</h5>
                                                    <div className="dot"></div>
                                                    <h5 className="lightg-end  f-p">C2</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row text-center m-b-30">
                                    <div className="col-xl-8 m-auto">
                                        {item.testByAbility.map((item, key) => (
                                        <>           
                                            <div className="col-xl-12 m-auto ">  
                                                <div className="m-2 col-xl-12 text-center txt-up tblue">
                                                    {item.testType}   
                                                </div> 
                                                <img alt="" className="imgicon" src={"../../img/" + item.testType + "pdf.png" }></img>
                                                <span id={"lbl_" + key + key1} onClick={() => actionMenu("idx_" + key + key1 )} className="float-right m-t-20 under phide"> 
                                                    Level ({item.level}) - {item.average_weight} %  </span>     
                                                <span id={"lbl_" + key + key1 } onClick={() => actionMenu("idx_" + key + key1 )} className="float-right m-t-20 under none pshow">
                                                    <img alt="" className="ml-2 imgs"  src="../../img/nav.png"></img>
                                                </span>

                                                {item.level === "A1" &&
                                                    <>
                                                        <img alt="" className="ml-2 imgs" src="../../img/sazul.png"></img>
                                                        <img alt="" className="ml-1 imgs" src="../../img/sgray.png"></img> 
                                                        <img alt="" className="ml-1 imgs" src="../../img/sgray.png"></img>
                                                        <img alt="" className="ml-1 imgs" src="../../img/sgray.png"></img>
                                                        <img alt="" className="ml-1 imgs" src="../../img/sgray.png"></img>
                                                        <img alt="" className="ml-1 imgs" src="../../img/sgray.png"></img>
                                                    </>
                                                }
                                                {item.level === "A2" &&
                                                    <>
                                                        <img alt="" className="ml-2 imgs" src="../../img/sazul.png"></img>
                                                        <img alt="" className="ml-1 imgs" src="../../img/sazul.png"></img> 
                                                        <img alt="" className="ml-1 imgs" src="../../img/sgray.png"></img>
                                                        <img alt="" className="ml-1 imgs" src="../../img/sgray.png"></img>
                                                        <img alt="" className="ml-1 imgs" src="../../img/sgray.png"></img>
                                                        <img alt="" className="ml-1 imgs" src="../../img/sgray.png"></img>
                                                    </>
                                                }
                                                {item.level === "B1" &&
                                                    <>
                                                        <img alt="" className="ml-2 imgs" src="../../img/sazul.png"></img>
                                                        <img alt="" className="ml-1 imgs" src="../../img/sazul.png"></img> 
                                                        <img alt="" className="ml-1 imgs" src="../../img/sazul.png"></img>
                                                        <img alt="" className="ml-1 imgs" src="../../img/sgray.png"></img>
                                                        <img alt="" className="ml-1 imgs" src="../../img/sgray.png"></img>
                                                        <img alt="" className="ml-1 imgs" src="../../img/sgray.png"></img>
                                                    </>
                                                }
                                                {item.level === "B2" &&
                                                    <>
                                                        <img alt="" className="ml-2 imgs" src="../../img/sazul.png"></img>
                                                        <img alt="" className="ml-1 imgs" src="../../img/sazul.png"></img> 
                                                        <img alt="" className="ml-1 imgs" src="../../img/sazul.png"></img>
                                                        <img alt="" className="ml-1 imgs" src="../../img/sazul.png"></img>
                                                        <img alt="" className="ml-1 imgs" src="../../img/sgray.png"></img>
                                                        <img alt="" className="ml-1 imgs" src="../../img/sgray.png"></img>
                                                    </>
                                                }
                                                {item.level === "C1" &&
                                                    <>
                                                        <img alt="" className="ml-2 imgs" src="../../img/sazul.png"></img>
                                                        <img alt="" className="ml-1 imgs" src="../../img/sazul.png"></img> 
                                                        <img alt="" className="ml-1 imgs" src="../../img/sazul.png"></img>
                                                        <img alt="" className="ml-1 imgs" src="../../img/sazul.png"></img>
                                                        <img alt="" className="ml-1 imgs" src="../../img/sazul.png"></img>
                                                        <img alt="" className="ml-1 imgs" src="../../img/sgray.png"></img>                                    
                                                    </>
                                                }
                                                {item.level === "C2" &&
                                                    <>
                                                        <img alt="" className="ml-2 imgs" src="../../img/sazul.png"></img>
                                                        <img alt="" className="ml-1 imgs" src="../../img/sazul.png"></img>
                                                        <img alt="" className="ml-1 imgs" src="../../img/sazul.png"></img>
                                                        <img alt="" className="ml-1 imgs" src="../../img/sazul.png"></img>
                                                        <img alt="" className="ml-1 imgs" src="../../img/sazul.png"></img>
                                                        <img alt="" className="ml-1 imgs" src="../../img/sazul.png"></img>
                                                    </>
                                                }
                                            </div>                                             
                                            <div id={"idx_" + key + key1} className="none card rsha col-md-11 m-t-20">                             
                                                <div className="d-flex text-center justify-content-center m-b-20">
                                                    <div className="mt-2 mr-4 font-18 grid"> Total Hits
                                                        <div className="text-green bold font-18 grid"> {item.detail_results.correct_count} </div>
                                                    </div>
                                                    <div className="mt-2 ml-4 font-18 grid"> Total Mistakes
                                                        <div className="text-red bold font-18 grid"> {item.detail_results.mistakes_count} </div>
                                                    </div>
                                                </div>
                                                <div className="row nwrap  justify-content-center">
                                                    <div className="bl tab2 bt col-sm-2">Level</div>
                                                    <div className="bl tab2 bt col-sm-7">Question </div>
                                                    <div className="bl tab2 bt col-sm-3">Status</div> 
                                                </div>
                                                {item.questions.map((question, key) => (
                                                    <div className="row nwrap  f-5 justify-content-center">
                                                        <div className="bl tab2  text-center col-sm-2 d-flex  align-items-center ">
                                                            <span className="m-auto">{question.level}</span>
                                                        </div>
                                                        <div className="bl tab2 f-r col-sm-7 d-flex  align-items-center"> {question.grammar}</div>
                                                        <div className="bl  tab2 text-center col-sm-3 d-flex  align-items-center">{question.iscorrect === true ?  <span className="botaobag grid m-auto">CORRECT</span>: <span className="bag grid m-auto">INCORRECT</span> }</div>
                                                    </div> 
                                                ))}
                                            </div>
                                        </>
                                        ))}
                                    </div>
                                </div>  
                            </>
                        ))}
                        <div className="row m-t-50 justify-content-center">
                            <button id="pdf"className="btn-big grad-mains " onClick={() => this.gerarPDF()}> SALVAR RESULTADOS </button>
                        </div>
                    </div>
                </form>
        </Structure>
    );
  }
}
