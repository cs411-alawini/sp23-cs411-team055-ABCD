import React from "react";
import { NavLink as Link } from "react-router-dom";

import Header from "./header";

function AreaReport(props) {
    return (
        <div id="AreaReport" style={{backgroundColor: "#f5f5f5"}}>
            <Header navblocks={props.navblocks} current={2} />
            <section style={{padding: "20px"}}>
                <h2>Area Report</h2>
            </section>
        </div>
    );
}

export default AreaReport;
