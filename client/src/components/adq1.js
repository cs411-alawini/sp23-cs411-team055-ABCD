import React from "react";
import Header from "./header";

class ADQ1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        weaponData: [],
        inputData: ""
    }
    /* Each crime object should have the following format:
     * {
     *   reportid: int
     *   daterpt: string
     *   
     * }
     */
  }

  handleSubmit(event) {
    event.preventDefault();
    alert(JSON.stringify(this.state.inputData));
    fetch("http://localhost:3001/weaponsData", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({inputValue: this.state.inputData}),
    }).then(data => data.json())
      .then(data => { console.log(data); this.setState({ weaponData: data, });});
  }

  render() {
    return (
      <div id="process-crimes">
        <Header navblocks={this.props.navblocks} current={1} />
        <section>Weaopon Data</section>
        <br/>
        <form onSubmit={ e => this.handleSubmit(e) }>
            <input type="text" onChange={(e) => {this.setState({ inputData: e.target.value })}}></input>
            <button>Enter Area</button>
        </form>
        <div>
          <table>
            <thead>
              <tr>
                <td>Weapon</td>
                <td>Percentage</td>
              </tr>
            </thead>
            <tbody>
                {
                    this.state.weaponData.map((weapon) => {
                        console.log(weapon)
                        return (
                        <tr>
                            <td>{weapon.Weapon_Desc}</td>
                            <td>{weapon.percentage}</td>
                        </tr>
                        )
                    })
                }      
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ADQ1;

/*
{
    this.state.weaponData.map((weapon) => {
        console.log(weapon)
        return (
        <tr>
            <td>{weapon.Weapon_Desc}</td>
            <td>{weapon.percentage}</td>
        </tr>
        )
    })
} 
*/