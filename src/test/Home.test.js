import React from "react";
import { shallow } from "enzyme";
import Home from "../Components/Home";
import Adapter from "enzyme-adapter-react-16";
import { configure } from "enzyme";
configure({ adapter: new Adapter() });

describe("Tesing Home", () => {
  test("Home content", () => {
    const component = shallow(<Home />);
    expect(component.find("header").text()).toBe("Exercise Tracker");
    expect(component.find("NavLink").length).toBe(3);
    expect(component.find("Route").length).toBe(4);
    expect(component.find("NavLink").at(0).props().to).toEqual("/exercises");
    expect(component.find("NavLink").at(1).props().to).toEqual("/completed");
    expect(component.find("NavLink").at(2).props().to).toEqual("/pending");
    expect(component.find("Route").length).toBe(4);
    expect(component.find("Route").at(0).props().path).toEqual("/exercises");
    expect(component.find("Route").at(0).props().render).toEqual(
      expect.any(Function)
    );
    expect(component.find("Route").at(1).props().path).toEqual("/completed");
    expect(component.find("Route").at(1).props().render).toEqual(
      expect.any(Function)
    );
    expect(component.find("Route").at(2).props().path).toEqual("/pending");
    expect(component.find("Route").at(2).props().render).toEqual(
      expect.any(Function)
    );
    expect(component.find("Route").at(3).props().path).toEqual("/");
    expect(component.find("Route").at(3).props().render).toEqual(
      expect.any(Function)
    );
    expect(component.find("button").length).toBe(1);
  });
  test("Display add exercise", () => {
    const component = shallow(<Home />);
    expect(component.state().addExercise).toEqual(false);
    const spy = jest.spyOn(component.instance(), "onAddExercise");
    spy();
    expect(component.state().addExercise).toEqual(true);
  });
  test("Adding execise", async () => {
    const date = new Date().toDateString();

    const event = {
      target: {
        name: "exercise",
        value: "pushup",
      },
    };
    const event2 = {
      target: {
        name: "time",
        value: 5,
      },
    };
    const component = shallow(<Home />);
    component.setState({ list: [{ name: "pushup", cal: 13 }] });

    const spy = jest.spyOn(component.instance(), "onAddExercise");
    spy();
    jest.spyOn(window, "alert").mockImplementation(() => {});
    component.find("Modal").find("select").at(0).simulate("change", event);
    await component
      .find("Modal")
      .find("select")
      .at(1)
      .simulate("change", event2);

    expect(component.state().exercise).toBe("pushup");
    expect(component.state().time).toBe(5);
    await component.find("Modal").find("button").simulate("click");

    expect(component.state().exercises).toStrictEqual([
      { name: "pushup", date: date, time: 5, cal: 13 },
    ]);
    expect(window.alert).toBeCalledWith("Exercise added successfully");
  });
  test("Adding invalid exercises", async () => {
    const event = {
      target: {
        name: "exercise",
        value: "Select an Exercise",
      },
    };
    const component = shallow(<Home />);
    const spy = jest.spyOn(component.instance(), "onAddExercise");
    spy();
    jest.spyOn(window, "alert").mockImplementation(() => {});
    component.find("Modal").find("select").at(0).simulate("change", event);
    await component.find("Modal").find("button").simulate("click");
    expect(window.alert).toBeCalledWith("Select a Exercise and duration");
  });
  test("Deleting", async () => {
    const component = shallow(<Home />);
    const date = new Date().toDateString();
    component.setState({
      exercises: [{ name: "pushup", date: date, time: 5, cal: 13 }],
    });
    jest.spyOn(window, "alert").mockImplementation(() => {});
    await component.instance().ondelete("pushup");
    expect(component.state().exercises).toStrictEqual([]);
    expect(window.alert).toBeCalledWith("deleted");
  });
  test("Moving to completed", async () => {
    const component = shallow(<Home />);
    const date = new Date().toDateString();
    const obj = { name: "pushup", date: date, time: 5, cal: 13 };
    component.setState({ exercises: [obj], completed: [] });
    jest.spyOn(window, "alert").mockImplementation(() => {});
    await component.instance().toComplete("pushup", 5, 13);
    expect(component.state().completed).toStrictEqual([
      { name: "pushup", date: date, time: 5, cal: 65 },
    ]);
    expect(component.state().exercises).toStrictEqual([]);
    expect(component.state("calorie")).toBe(65);
    expect(window.alert).toBeCalledWith("Moved to completed");
  });
  test("Moving to pending", async () => {
    const component = shallow(<Home />);
    const date = new Date().toDateString();
    component.setState({
      exercises: [{ name: "pushup", date: date, time: 5, cal: 13 }],
      pending: [],
    });
    jest.spyOn(window, "alert").mockImplementation(() => {});
    await component.instance().toPending("pushup", 5, 13);
    expect(component.state().pending).toStrictEqual([
      { name: "pushup", date: date, time: 5, cal: 13 },
    ]);
    expect(component.state().exercises).toStrictEqual([]);
    expect(window.alert).toBeCalledWith("Moved to pending");
  });
  test("Moving pending to completed", async () => {
    const component = shallow(<Home />);
    const date = new Date().toDateString();
    component.setState({
      completed: [],
      pending: [{ name: "pushup", date: date, time: 5, cal: 13 }],
    });
    jest.spyOn(window, "alert").mockImplementation(() => {});
    await component.instance().pendingToComplete("pushup", 5, 13);
    expect(component.state().completed).toStrictEqual([
      { name: "pushup", date: date, time: 5, cal: 65 },
    ]);
    expect(component.state().pending).toStrictEqual([]);
    expect(window.alert).toBeCalledWith("Moved to completed");
  });
  test("Testing duration edit function",()=>{
    const component=shallow(<Home/>)
    component.setState({time:5,exercises:[{name:"pushup",time:2,cal:13}]})
    component.instance().onEditHandler("pushup")
    expect(component.state('exercises')).toStrictEqual([{name:"pushup",time:5,cal:13}])
  })
  test("Testing alert message on successfull edit",async()=>{
    const component=shallow(<Home/>)
    component.setState({time:5,exercises:[{name:"pushup",time:2,cal:13}]})
    jest.spyOn(window,'alert').mockImplementationOnce(()=>{})
    await component.instance().onEditHandler("pushup")
    expect(window.alert).toBeCalledWith("Duration edited successfully")


  })
  test("Testing alert message on unsuccessfull edit",async()=>{
    const component=shallow(<Home/>)
    component.setState({time:"Select a duration(min)",exercises:[{name:"pushup",time:2,cal:13}]})
    jest.spyOn(window,'alert').mockImplementationOnce(()=>{})
    await component.instance().onEditHandler("pushup")
    expect(window.alert).toBeCalledWith("Please select a duration")
  })
});
