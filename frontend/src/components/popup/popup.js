import React from "react";
import './popup.css';

function Popup(props)
{
    const pageHeight = window.innerHeight;
    const pageWidth = window.innerWidth;
    const width = `${pageWidth}px`;
    const height = `${pageHeight}px`;
    const {title,children,w,h} = props;
    
    return(
        <div style={{position:'fixed',top:'0',left:'0',width:width,height:height,backgroundColor:'rgb(0,0,0,0.5)',zIndex:'1000'}}>
            <div style={{width:w,height:h}} className="popup">
                <span>{title}</span>
                <div className="popupcontent">
                    {children}
                </div>
            </div>
        </div>
        
    );
}

export default Popup; 