import React, { Component } from "react";
import { Toolbar} from "react-onsenui";

export default class HeaderToolbar extends Component<any, any> {
 
    constructor(props: any) {
        super(props);      
        
    }

    render() {
        return (
            <Toolbar key="menuBar" className="headerBar" id="homeHeaderToolbar">
                <div className="left">
                    <img alt="header logo" src="toolbarlogo.png" className="header-logo" id="imgToolbar"/>
                </div>
                <div className="right">                  
                </div>
            </Toolbar>
        );
    }

}
