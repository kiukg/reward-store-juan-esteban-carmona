import React from "react"


const  ModalAlert =(props)=>{
    
    const {visible,result,message,title}= props.properties;
    return(
        <div className={visible?"modalAlert":"modalAlertHidden"}>
        <div className={result?"successAlertTitle":"errorAlertTitle"}>{title}</div>
        <div className={result?"successAlertBody":"errorAlertBody"}>
          <div className={result?"successAlertText":"errorAlertText"}>{message}</div>
            <button className={result?"successAlertButton":"errorAlertButton"} onClick={props.close}>Close</button>
        </div>
      </div>
    )

}

export default ModalAlert;