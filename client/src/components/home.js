import React from "react";
import { NavLink as Link } from "react-router-dom";

import Header from "./header";

function Home(props) {
    return (
        <div id="home">
            <Header navblocks={props.navblocks} current={0} />
            <section>Home</section>
        </div>
    );
}

export default Home;
