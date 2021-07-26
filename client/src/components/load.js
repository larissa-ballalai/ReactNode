import React from 'react'

export const load = () => {
    var spinn = document.getElementById("load")
        if(spinn.style.display === "block")
            spinn.style.display = "none"
        else
            spinn.style.display = "block"
}

function Load() {
    return(
        <div id="load" className="none">
            <div className="loadfade">
                <div className="loading-spinner"></div>
            </div>
        </div>
    )
}
export default Load