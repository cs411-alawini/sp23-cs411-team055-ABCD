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
      crimeInfo: []
    }
    this.newInfo = {
      Date_Rptd: { ref: React.createRef(), name: "Date reported", type: "string" },
      DATE_OCC: { ref: React.createRef(), name: "Date occurred", type: "string" },
      TIME_OCC: { ref: React.createRef(), name: "Time occurred", type: "string" },
      Rpt_Dist_No: { ref: React.createRef(), name: "Report district number", type: "int" },
      Crm_Cd: { ref: React.createRef(), name: "Crime code", type: "int" },
      Vict_Age: { ref: React.createRef(), name: "Victim Age", type: "int" },
      Vict_Sex: { ref: React.createRef(), name: "Victim Sex", type: "string" },
      Vict_Descent: { ref: React.createRef(), name: "Victim Descent", type: "string" },
      Premis_Cd: { ref: React.createRef(), name: "Premis code", type: "string" },
      Weapon_Used_Cd: { ref: React.createRef(), name: "Weapon used code", type: "string" },
      Status: { ref: React.createRef(), name: "Status", type: "string" },
      LOCATION: { ref: React.createRef(), name: "Location", type: "string" },
      LAT: { ref: React.createRef(), name: "Latitude", type: "double" },
      LON: { ref: React.createRef(), name: "Longitude", type: "double" },
    }
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_SERVER_URL + "/get-report/" + encodeURIComponent(this.props.params.reportid))
      .then(data => data.json())
      .then(data => { console.log(data); this.setState({ info: data[0], });});
    fetch(process.env.REACT_APP_SERVER_URL + "/get-last-submission/" + encodeURIComponent(this.props.params.reportid))
      .then(data => data.json())
      .then(data => {
        console.log(data);
        if (data.length === 0) {
            console.log(true);
        } else {
            this.setState({crimeInfo : data[0]})
            console.log(this.state.crimeInfo);
        }
        Object.entries(data).forEach(([key, val]) => {
          if (this.newInfo[key] === undefined) return;
          this.newInfo[key].ref.current.value = val;
        });
    });
  }

  onSubmit(event) {
    event.preventDefault();  // Uncomment this line to prevent the page from refreshing
    let data = { ReportID: this.props.params.reportid };
    Object.entries(this.newInfo).forEach(([key, val], index) => {
      data[key] = null;
      if (val.ref === "") {
        // Do nothing
      } else if (val.type === "string") {
        data[key] = val.ref.current.value;
      } else if (val.type === "int") {
        data[key] = parseInt(val.ref.current.value);
      } else if (val.type === "double") {
        data[key] = parseFloat(val.ref.current.value);
      }
    });
    fetch(process.env.REACT_APP_SERVER_URL + "/process-report/" + encodeURIComponent(this.props.params.reportid), {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify(data),
    }).then(res => res.json()).then(data => console.log(data));
    /*
    fetch(process.env.REACT_APP_SERVER_URL + "/get-last-submission/" + encodeURIComponent(this.props.params.reportid))
      .then(data => data.json())
      .then(data => {
        console.log(data);
    });
    */
  }

  delete() {
    console.log("Sending request to delete report...");
    fetch(process.env.REACT_APP_SERVER_URL + "/del-report/" + encodeURIComponent(this.props.params.reportid), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
    }).then((response) => {console.log(response)});
  }

  render() {
    let newInfo = Object.entries(this.newInfo).map(([key, val], index) => {
      return (
        <div key={index}>
          <label className="label">{val.name}</label>
          <input className="input" ref={val.ref} placeholder={val.type}></input>
        </div>
      );
    });
    return (
        <div id="process-crime">
            <Header navblocks={this.props.navblocks} current={1} />
            <div style={{display: "flex", justifyContent: "space-around"}}>
                <div>
                    <br/>
                    <section className="given-info">
                    <div className="title">Information Provided:</div>
                    <table>
                        <tbody>
                        <tr>
                            <td>Report ID: {this.state.info.ReportID}</td>
                        </tr>
                        <tr>
                            <td>Location: {this.state.info.LOCATION}</td>
                        </tr>
                        <tr>
                            <td>Date Occured: {this.state.info.DATE_OCC}</td>
                        </tr>
                        <tr>
                            <td>Crime: {this.state.info.Crime}</td>
                        </tr>
                        <tr>
                            <td>Description: {this.state.info.Description}</td>
                        </tr>
                        <tr>
                            <td>Phone Number: {this.state.info.Phone}</td>
                        </tr>
                        <tr>
                            <td>Email: {this.state.info.Email}</td>
                        </tr>
                        </tbody>
                    </table>
                    </section>
                    <br/>
                    <section className="new-info">
                    <div className="title">Information Needed:</div>
                    <form onSubmit={e => this.onSubmit(e)}>
                        {newInfo}
                        <button className="submit" type="submit">Save</button>
                    </form>
                    <button className="submit" onClick={() => this.delete()}>Mark as resolved</button>
                    </section>
                </div>
                <div>
                    <p>Current Date Reported: {this.state.crimeInfo.Date_Rptd}</p>
                    <p>Current Date Occurred: {this.state.crimeInfo.DATE_OCC}</p>
                    <p>Current Time Occurred: {this.state.crimeInfo.TIME_OCC}</p>
                    <p>Current Report District Number: {this.state.crimeInfo.Rpt_Dist_No}</p>
                    <p>Current Crime Code: {this.state.crimeInfo.Crm_Cd}</p>
                    <p>Current Victim Age: {this.state.crimeInfo.Vict_Age}</p>
                    <p>Current Victim Sex: {this.state.crimeInfo.Vict_Sex}</p>
                    <p>Current Victim Descent: {this.state.crimeInfo.Vict_Descent}</p>
                    <p>Current Premise Code: {this.state.crimeInfo.Premis_Cd}</p>
                    <p>Current Weopon Used Code: {this.state.crimeInfo.Weapon_Used_Cd}</p>
                    <p>Current Status: {this.state.crimeInfo.Status}</p>
                    <p>Current Location: {this.state.crimeInfo.LOCATION}</p>
                    <p>Current Latitude: {this.state.crimeInfo.LAT}</p>
                    <p>Current Longitude: {this.state.crimeInfo.LON}</p>
                </div>
            </div>
        </div>
    );
  }
}

export default withParams(ProcessCrime);
