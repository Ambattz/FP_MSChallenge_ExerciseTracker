import React from "react";
import { shallow } from "enzyme";
import Completed from "../Components/Completed";
import Adapter from "enzyme-adapter-react-16";
import { configure } from "enzyme";
configure({ adapter: new Adapter() });

describe("Testing Completed Component", () => {
  test("testing props", () => {
    const mockList = [
      { name: "pushup", date: new Date().toDateString(), time: 5, cal: 65 },
    ];
    const mockFn = jest.fn();
    const component = shallow(
      <Completed list={mockList} pending={mockFn}></Completed>
    );
    expect(component.find("#rslt").text()).toBe("Calorie burnt : 65");
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
    const component = shallow(<Completed {...myProps} />);
    expect(component.find("#nothing").text()).toBe("Nothing here");
  });
});
