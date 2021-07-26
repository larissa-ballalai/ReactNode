import React from "react"
import { Link } from "react-router-dom"
import { actionMenu } from "../scripts/menu"

export default function MenuItem(props) {
    return (
      <div className="menu-a" onClick={() => actionMenu(props.divId) }>
          <span className={"float-right " + props.className}>+</span>
          <img alt="" className="" src={'../../img/' + props.image}  /> &nbsp;
          {props.link && <Link to={'../' + props.link}>{props.name}</Link>}
          {!props.link && <a>{props.name}</a>}
          <div id={props.divId} className="none">
              {props.children}
          </div>
      </div>
    )
}



