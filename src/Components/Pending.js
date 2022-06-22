import React, { Component } from "react";

class Pending extends Component {
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
                    <button
                      onClick={(index) => this.props.complete(index)}
                    >
                      Move to complete
                    </button>
                  </div>
                </div>
                <label>Pending from {q.date}</label>
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
export default Pending;
