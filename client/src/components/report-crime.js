import React from "react";

import Header from "./header";

// CSS
import "./report-crime.css"

class ReportCrime extends React.Component {
  render() {
    return (
      <div id="report-crime">
        <Header />
        <form className="report-form">
          <label className="form-title">Crime Report Form</label>
          <input name=""></input>
        </form>
      </div>
    );
  }
}

export default ReportCrime;
