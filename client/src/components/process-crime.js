import React from "react";
import Header from "./header";

class ProcessCrime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      crimeInfo: {},
    }
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_SERVER_URL + "/reports")
      .then(data => data.json())
      .then(data => this.setState({ crimes: data, }));
  }

  render() {
    return (
        <div id="process-crime">
            <Header navblocks={this.props.navblocks} current={1} />
        </div>
    );
  }
}

export default ProcessCrime;
