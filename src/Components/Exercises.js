import React, { Component } from "react";
import "../Styles/Exercises.css";
import Modal from "./modal";

class Exercises extends Component {
  state = {
    editMode: false,
    index: ""
  };
  // it will get name and time duration of curresponding exercise to be edited and updates in state
  onEditClick = () => {
    // write your code
    if (this.props.time !== 0) {
      this.props.edit(this.state.index);
      window.alert("duration edited successfully")
      this.setState({ editMode: !this.state.editMode });
    } else { (window.alert("Please select a duration")); }



  };
  render() {
    return (
      <>
        <div className="ex-wrapper">
          {
            this.props.list.length !== 0 ? (
              <div className="ex-wrapper">
                {
                  this.props.list.map((q, index) => (
                    <div key={index} className="content-wrapper">
                      <div className="ex-container">
                        <div className="name">
                          <h2>{q.name}</h2>
                          <h4>Duration : {q.time} min</h4>
                        </div>
                        <div className="operations">
                          <button
                            onClick={(e) => { this.props.delete(index) }}>
                            Delete
                          </button>
                          <button
                            onClick={(e) => { this.setState({ editMode: true, index: index }) }}>
                            Edit duration
                          </button>
                          <button
                            onClick={(e) => { this.props.complete(index) }}>
                            Move to complete
                          </button>
                          <button
                            onClick={(e) => { this.props.pending(index) }}>
                            Move to pending
                          </button>
                        </div>
                      </div>
                      <label>Added on {q.date}</label>
                      <br></br>
                    </div>
                  ))}
              </div>
            ) : (
              <div id="nothing">Nothing here</div>
            )}
        </div>
        {this.state.editMode ? (
          <Modal close={() => { this.setState({ editMode: false }) }}>
            <div className="add-box">
              <div className="box">
                <select
                  type="number"
                  name="time"
                  value={this.props.time || "Select a duration(min)"}
                  onChange={(e) => { this.props.change(e) }}>
                  <option>Select a duration(min)</option>
                  <option>5</option>
                  <option>15</option>
                  <option>30</option>
                  <option>45</option>
                  <option>60</option>
                </select>
                <br />
                <button
                  onClick={(e) => { this.onEditClick(e) }}>
                  Edit
                </button>
              </div>
            </div>
          </Modal>
        ) : (
          ""
        )
        }
      </>
    );
  }
}
export default Exercises;
