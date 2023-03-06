import React from "react";
import { NavLink as Link } from "react-router-dom";

import Header from "./header";

function GraphPage(props) {
    return (
        <div style={{ backgroundColor: "#f5f5f5", padding: "20px" }}>
            <Header navblocks={props.navblocks} current={1} />
            <section style={{ marginTop: "20px" }}>
                <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>Graph</h2>
                
            </section>
        </div>
    );
}

export default GraphPage;
