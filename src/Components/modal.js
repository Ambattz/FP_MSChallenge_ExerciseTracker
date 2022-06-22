import React, { Component } from "react";
import "../Styles/modal.css";

class Modal extends Component {
  render() {
    return (
      <div>
        <div className="bg"></div>
        <div className="pop">
          <button className="close1" onClick={() => this.props.close()}>
            X
          </button>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Modal;
