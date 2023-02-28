import React from "react";
import { NavLink as Link } from "react-router-dom";

import Header from "./header";

function AreaReport(props) {
    return (
        <div id="AreaReport">
            <Header navblocks={props.navblocks} current={2} />
            <section>Area Report</section>
        </div>
    );
}

export default AreaReport;
