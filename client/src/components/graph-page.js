import React from "react";
import { NavLink as Link } from "react-router-dom";

import Header from "./header";

function GraphPage(props) {
    return (
        <div id="graph-page">
            <Header navblocks={props.navblocks} current={1} />
            <section>Graph</section>
        </div>
    );
}

export default GraphPage;
