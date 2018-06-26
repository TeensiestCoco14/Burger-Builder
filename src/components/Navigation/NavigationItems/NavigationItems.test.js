import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";
//enzyme lets us test singular components without loading the entire app
//checkout jest and enzyme documentation for helper functions and documentation

configure({adapter: new Adapter()});

describe("<NavigationItems />", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<NavigationItems />)	
	});

	it("should render two <NavigationItem /> elements if not authenticated", () => {
		expect(wrapper.find(NavigationItem)).toHaveLength(2); //include utility functions from jest and enzyme
	});

	it("should render three <NavigationItem /> elements if authenticated", () => {
		wrapper.setProps({isAuthenticated: true});
		expect(wrapper.find(NavigationItem)).toHaveLength(3); //include utility functions from jest and enzyme
	});

	it("should an exact logout button", () => {
		wrapper.setProps({isAuthenticated: true});
		expect(wrapper.contains(<NavigationItem link = "/logout">Logout</NavigationItem>)).toEqual(true); //include utility functions from jest and enzyme
	});
});