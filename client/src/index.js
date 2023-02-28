import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Pages
import Home from "./components/home.js";
import GraphPage from "./components/graph-page.js";
import AreaReport from "./components/area-report.js";
import NotFound from "./components/not-found.js";

// CSS
import "./fonts.css";
import "./index.css";

let navblocks = [
  { link: "/", content: "Home", },
  { link: "/graph", content: "Graph", },
  { link: "/area-report", content: "Area Report", },
];

console.log("hello world");

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home navblocks={navblocks} />}></Route>
        <Route exact path="/graph" element={<GraphPage navblocks={navblocks} />}></Route>
        <Route exact path="/area-report" element={<AreaReport navblocks={navblocks} />}></Route>
        <Route exact path="*" element={<NotFound navblocks={navblocks} />}></Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
