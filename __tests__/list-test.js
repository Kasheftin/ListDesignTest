import { shallow, mount } from "enzyme";
import { observable } from "mobx";
import React from "react";
import App from "../js/app.jsx";

describe("App",() => {
	it("has empty items list, items lists increases after pressing on the first button in .ldt-controls",() => {
		const wrapper = mount(<App />);
		expect(wrapper.find(".ldt-list__rows").children().length).toBe(0);
		wrapper.find(".ldt-controls button").at(0).simulate("click");
		expect(wrapper.find(".ldt-list__rows").children().length).toBe(1);
	});
});