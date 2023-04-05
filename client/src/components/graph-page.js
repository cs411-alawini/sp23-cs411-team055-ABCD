import React from "react";

import Header from "./header";

// CSS
import "./graph-page.css"

// For testing
const _filters = {
    "area": {
        type: "int",
        list: [1, 2, 3, 4, 5, 6],
    },
    "startdate": {
        type: "date",
        list: [],
    },
    "enddate": {
        type: "date",
        list: []
    },
}

class Option extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: "",
        };
    }

    render() {
        let list = this.props.choices.map((value, index) => {
            return <option key={index} value={value}>{value}</option>
        });
        return (
            <div>
                <span>{this.props.name}</span>
                <select name={this.props.name}>
                    {list}
                </select>
            </div>
        )
    }
}

// The options menu on the left side of the page
class Options extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: {},
            display: {
                x: null,
                y: null,
            },
        }
    }

    // TODO: obtain filters from the backend
    componentDidMount() {
        this.setState({
            filter: _filters,
        });
    }

    render() {
        let filters = Object.entries(this.state.filter).map(([key, value], index) => {
            return <Option key={index} name={key} choices={value.list}/>
        });
        let display = [
            <Option key={1} name={"X-axis"} choices={Object.keys(this.state.filter)} />,
            <Option key={2} name={"Y-axis"} choices={Object.keys(this.state.filter)} />,
        ];
        return (
            <section className="options">
                <div className="opt-section">
                    <div className="opt-sec-title">Filter</div>
                    <div className="opt-sec-option">{filters}</div>
                    <div className="opt-sec-title">Display</div>
                    <div className="opt-sec-option">{display}</div>
                </div>
            </section>
        );
    }
}

class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <section className="graph"></section>
        );
    }
}

function GraphPage(props) {
    return (
        <div style={{ backgroundColor: "#f5f5f5", padding: "20px" }}>
            <Header navblocks={props.navblocks} current={1} />
            <div className="contents">
                <Options />
                <Graph />
            </div>
            <section style={{ marginTop: "20px" }}>
                <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>Graph</h2>
            </section>
        </div>
    );
}

export default GraphPage;
