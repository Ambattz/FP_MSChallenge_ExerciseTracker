import React from "react";
import { shallow, mount } from "enzyme";
import Exercises from "../Components/Exercises";
import Adapter from "enzyme-adapter-react-16";
import { configure } from "enzyme";
configure({ adapter: new Adapter() });

describe("Testing Exercises Component", () => {
  test("testing props", async () => {
    const mockList = [
      { name: "pushup", date: new Date().toDateString(), time: 5, cal: 13 },
    ];
    const mockFn = jest.fn();
    const mockFn2 = jest.fn();
    const mockFn3 = jest.fn();
    const myProps = {
      list: mockList,
      complete: mockFn,
      delete: mockFn2,
      pending: mockFn3,
    };
    const component = shallow(<Exercises {...myProps}></Exercises>);
    component.find("button").at(0).simulate("click", mockList[0].name);
    expect(mockFn2).toBeCalledWith(mockList[0].name);
    component.find("button").at(2).simulate("click", mockList[0].name);
    expect(mockFn).toBeCalledWith(mockList[0].name, 5, 13);
    component.find("button").at(3).simulate("click", mockList[0].name);
    expect(mockFn3).toBeCalledWith(mockList[0].name, 5, 13);
  });
  test("passing empty prop as list", () => {
    const mockList = [];
    const mockFn = jest.fn();
    const mockFn2 = jest.fn();
    const myProps = {
      list: mockList,
      complete: mockFn,
      delete: mockFn2,
    };
    const component = shallow(<Exercises {...myProps} />);
    expect(component.find("#nothing").text()).toBe("Nothing here");
  });
  test("Testing pop up when editing",()=>{
    const mockFn = jest.fn();
    const mockFn2 = jest.fn();
    const mockFn3 = jest.fn();
    const mockFn4=jest.fn()
    const mockList = [
      { name: "pushup", date: new Date().toDateString(), time: 5, cal: 13 },
    ];
    const myProps = {
      list: mockList,
      complete: mockFn,
      delete: mockFn2,
      pending: mockFn3,
      edit:mockFn4,
      time:5
      
    };
    const component=shallow(<Exercises {...myProps}/>)

    component.setState({editMode:false})
    const spy=jest.spyOn(component.instance(),'onEditClick')
    spy()
    expect(component.state('editMode')).toBe(true)
  })
  test("Testing edit funtion call",()=>{
    const mockList = [
      { name: "pushup", date: new Date().toDateString(), time: 5, cal: 13 },
    ];
    const mockFn = jest.fn();
    const myProps={
      list:mockList,
      edit:mockFn
    }
    const component=shallow(<Exercises {...myProps} />)
    component.find("button").at(1).simulate('click')
    component.find("Modal").find("button").simulate('click')
    expect(mockFn).toBeCalled()

  })
  test("Testing change function call",()=>{
    const mockList = [
      { name: "pushup", date: new Date().toDateString(), time: 5, cal: 13 },
    ];
    const mockFn=jest.fn()
    const mockFn2=jest.fn()
    const myProps={
      list:mockList,
      change:mockFn,
      edit:mockFn2
    }
    const event={
      target:{
        name:"time",
        value:5
      }
    }
    const component=shallow(<Exercises {...myProps}/>)
    component.find("button").at(1).simulate('click')
    component.find("Modal").find('select').simulate('change',event)
    component.find("Modal").find("button").simulate('click')
    expect(mockFn).toBeCalled()




  })
});
