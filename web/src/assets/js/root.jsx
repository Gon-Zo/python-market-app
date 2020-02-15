import React from "react";
import AppSideBar from "./component/AppSideBar";
import Main from "./view";

export default () => {
    return (
        <div className="d-flex" id="wrapper">
            <AppSideBar/>
            <Main/>
        </div>
    )
}
