import React from "react";
import { shallow } from "enzyme";
import Pending from "../Components/Pending";
import Adapter from "enzyme-adapter-react-16";
import { configure } from "enzyme";
configure({ adapter: new Adapter() });

describe("Testing Pending Component", () => {
  test("testing props", () => {
    const mockList = [
      { name: "pushup", date: new Date().toDateString(), time: 5, cal: 13 },
    ];
    const mockFn = jest.fn();
    const component = shallow(
      <Pending list={mockList} complete={mockFn}></Pending>
    );
    component.find("button").simulate("click", mockList[0].name);
    expect(mockFn).toBeCalledWith(mockList[0].name, 5, 13);
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
    const component = shallow(<Pending {...myProps} />);
    expect(component.find("#nothing").text()).toBe("Nothing here");
  });
});
