import React from "react";
import squarex from "../assets/icons/squarex.svg"

const ModalDialogHistory = (props) =>{
    
    const {visible,title, body} = props.properties;
    return (
        
            <div className={visible?`menuModalDialogContainer`:`hidden`}>
                <div className="headerMenu">
                    <div className="headerTitle">{title}</div>
                    <div className="headerToolbar">
                        <img src={squarex} onClick={props.close}></img>
                    </div>
                </div>
                {body}
            </div>
        
    )
}

export default ModalDialogHistory;