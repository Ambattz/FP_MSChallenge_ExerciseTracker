import React from "react";
import { Component } from "react";
import "../Styles/Home.css";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import Completed from "./Completed";
import Pending from "./Pending";
import Exercises from "./Exercises";
import Modal from "./modal";

class Home extends Component {
  state = {
    exercises: [],
    list: [
      { name: "Jumping Rope", cal: 14 },
      { name: "Running Up Hills", cal: 13 },
      { name: "Cycling Intervals", cal: 7 },
      { name: "Running", cal: 12 },
      { name: "Battle Ropes", cal: 6 },
    ],
    exercise: "",
    time: 0,
    addExercise: false,
    completed: [],                              //completed exercises details
    pending: [],                                // pending exercises details
    calorie: 0,
  };
  // function which displays the pop up modal and also closes the modal popup
  onAddExercise = () => {
    // write your code
    this.setState({ addExercise: !this.state.addExercise });
  };
  // function which calls on change
  onChangeHandler = async (e) => {
    // write your code
    if (e.target.name === "exercise") {
      this.setState({ exercise: e.target.value });
    }
    else {
      this.setState({ time: e.target.value });
    }
  };
  // adding new exercise
  onAdd = async () => {
    // write your code
    if (this.state.exercise !== null && this.state.time !== 0) {
      this.setState(prevState => ({
        exercises: [...prevState.exercises,
        {
          name: this.state.exercise,
          time: this.state.time,
        }],
        exercise: "",
        time: 0
      }));
      this.setState({ addExercise: !this.state.addExercise });
      window.alert("Exercise added successfully");
    } else { (window.alert("Select a exercise and duration")); }



  };
  // deleting exercise
  ondelete = (id) => {
    // write your code
    let temp_state = this.state.exercises;
    temp_state.splice(id, 1);
    this.setState({
      exercises: temp_state
    });
    window.alert("deleted")

  };
  // moving to complete from exercises
  toComplete = (id) => {
    // write your code
    let temp_state = this.state.exercises;
    let item = temp_state[id]
    this.setState(prevState => ({
      completed: [...prevState.completed, item],
    }));
    temp_state.splice(id, 1);
    this.setState({
      exercises: temp_state
    });
    window.alert("Moved to completed")
  };
  // moving to pending from exercises
  toPending = (id) => {
    // write your code
    let temp_state = this.state.exercises;
    let item = temp_state[id]
    this.setState(prevState => ({
      pending: [...prevState.pending, item],
    }));
    temp_state.splice(id, 1);
    this.setState({
      exercises: temp_state
    });
    window.alert("Moved to pending")

  };
  // moving exercise from pending to complete
  pendingToComplete = (id) => {
    // write your code
    let temp_state = this.state.pending;
    let item = temp_state[id]
    this.setState(prevState => ({
      completed: [...prevState.completed, item],
    }));
    temp_state.splice(id, 1);
    this.setState({
      pending: temp_state
    });
    window.alert("Moved to completed")
  };
  // editing exercise duration
  onEditHandler = (id) => {
    // write your code
    let temp_state = [...this.state.exercises];
    temp_state[id].time = this.state.time;
    this.setState({ exercises: temp_state })
    this.setState({ time: 0 });
  };
  render() {
    return (
      <div className="wrapper">
        <div className="container">
          <header>Exercise Tracker</header>
        </div>
        <div className="content">
          <div className="btn">
            <button onClick={this.onAddExercise}>Add Exercises</button>
          </div>
          <div className="result">
            Total Calories burnt : {this.state.calorie}
          </div>
          <div className="add-exercise">
            {this.state.addExercise ? (
              <Modal close={this.onAddExercise}>
                <div className="add-box">
                  <div className="box">
                    <select
                      name="exercise"
                      onChange={(e) => this.onChangeHandler(e)}
                    >
                      <option>Select an exercise </option>
                      {this.state.list.map((q, index) => (
                        <option key={index}>{q.name}</option>
                      ))}
                    </select>
                    <br />
                    <select
                      name="time"
                      onChange={(e) => this.onChangeHandler(e)}
                    >
                      <option>Select duration(min)</option>
                      <option>5</option>
                      <option>15</option>
                      <option>30</option>
                      <option>45</option>
                      <option>60</option>
                    </select>
                    <br />
                    <button id="add-btn" onClick={this.onAdd}>
                      ADD
                    </button>
                  </div>
                </div>
              </Modal>
            ) : (
              ""
            )}
          </div>
          <div className="link-wrapper">
            <div className="links">
              <div>
                <NavLink to="/exercises">Exercises</NavLink>
              </div>
              <div>
                <NavLink to="/completed">Completed</NavLink>
              </div>
              <div>
                <NavLink to="/pending">Pending</NavLink>
              </div>
            </div>
          </div>
          <hr></hr>
          <div className="details">
            <Switch>
              <Route
                path="/exercises"
                exact
                render={() => (
                  <Exercises
                    list={this.state.exercises}
                    delete={this.ondelete}
                    complete={this.toComplete}
                    pending={this.toPending}
                    edit={this.onEditHandler}
                    change={this.onChangeHandler}
                    time={this.state.time}
                  ></Exercises>
                )}
              ></Route>
              <Route
                path="/completed"
                exact
                render={() => (
                  <Completed
                    list={this.state.completed}
                    pending={this.toPending}
                  ></Completed>
                )}
              ></Route>
              <Route
                path="/pending"
                exact
                render={() => (
                  <Pending
                    list={this.state.pending}
                    complete={this.pendingToComplete}
                  ></Pending>
                )}
              ></Route>
              <Route
                path="/"
                render={() => <Redirect to="/exercises"></Redirect>}
              ></Route>
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
