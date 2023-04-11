import React from "react";
import Header from "./header";

class ProcessCrimes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      crimes: [],
    }
    /* Each crime object should have the following format:
     * {
     *   reportid: int
     *   daterpt: string
     *   dateocc: string
     *   location: string
     *   crime: string
     *   description: string
     *   fname: string
     *   lname: string
     *   phone: string
     *   email: string
     * }
     */
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_SERVER_URL + "/reports")
      .then(data => data.json())
      .then(data => this.setState({ crimes: data, }));
  }

  render() {
    this.crimes.map((crime, index) => {
      return (
        <tr key={index}>
          <td>{crime.reportid}</td>
          <td>{crime.daterpt}</td>
          <td>{crime.dateocc}</td>
          <td>{crime.crime}</td>
          <td>{crime.description}</td>
        </tr>
      )
    });
    // Not accessible to public
    // Therefore no header
    return (
      <div id="process-crimes">
        <section>List of crimes reported</section>
        <div>
          <table>
            <tr>
              <td>Report ID</td>  {/* TODO: link to `/process-crime/:reportid` page */}
              <td>Date reported</td>
              <td>Date occurred</td>
              <td>Crime type</td>
              <td>Description</td>  {/* This should be a short description within one line. Use '...' if content too long */}
            </tr>
          </table>
        </div>
      </div>
    );
  }
}
