import React from "react";
import { useParams } from "react-router-dom";
import Header from "./header";

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class ProcessCrime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {},
    }
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_SERVER_URL + "/get-report/" + encodeURIComponent(this.props.params))
      .then(data => data.json())
      .then(data => this.setState({ info: data, }));
  }

  render() {
    return (
        <div id="process-crime">
            <Header navblocks={this.props.navblocks} current={1} />
            <section className="given-info">
              <div className="title">Information provided</div>
              <table>
                <tbody>
                  <tr>
                    <td>Report ID</td>
                    <td>{this.state.info.ReportID}</td>
                  </tr>
                  <tr>
                    <td>Location</td>
                    <td>{this.state.info.LOCATION}</td>
                  </tr>
                  <tr>
                    <td>Date Occured</td>
                    <td>{this.state.info.DATE_OCC}</td>
                  </tr>
                  <tr>
                    <td>Crime</td>
                    <td>{this.state.info.Crime}</td>
                  </tr>
                  <tr>
                    <td>Description</td>
                    <td>{this.state.info.Description}</td>
                  </tr>
                  <tr>
                    <td>Phone Number</td>
                    <td>{this.state.info.Phone}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{this.state.info.Email}</td>
                  </tr>
                </tbody>
              </table>
            </section>
            <section className="new-info">
              <div className="title">Information needed</div>
            </section>
        </div>
    );
  }
}

export default withParams(ProcessCrime);
