import React from "react";
import Header from "./header"
import Main from "./main";
 
function BaseQuestion(props) {
    return (    
        <div> 
            <Main />  
                <div className="content-page">
                    <div className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-xl-9">
                                    <Header class={props.color} text={props.name} />                            
                                    <div className="card w">
                                        <div className="card-body"> 
                                            {props.children}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default BaseQuestion