import React, { Component } from "react";

class Completed extends Component {
  render() {
    return (
      <div className="ex-wrapper">
        {this.props.list.length !== 0 ? (
          <div className="ex-wrapper">
            {this.props.list.map((q, index) => (
              <div key={index} className="content-wrapper">
                <div className="ex-container">
                  <div className="name">
                    <h2>{q.name}</h2>
                    <h4>Duration : {q.time} min</h4>
                  </div>
                  <div className="operations">
                    <div className="cal" id="rslt">
                      Calorie burnt : {q.cal}
                    </div>
                  </div>
                </div>
                <label>Completed on {q.date}</label>
                <br></br>
              </div>
            ))}
          </div>
        ) : (
          <div id="nothing">Nothing here</div>
        )}
      </div>
    );
  }
}
export default Completed;
