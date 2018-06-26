import {BurgerBuilder} from "./BurgerBuilder";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
//enzyme lets us test singular components without loading the entire app
//checkout jest and enzyme documentation for helper functions and documentation

configure({adapter: new Adapter()});

describe("<BurgerBuilder />", () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<BurgerBuilder onInitIngredients = {() => {}}/>);
	});

	it("should render <BuildControls /> when recieving ingredients", () => {
		wrapper.setProps({ings: {salad: 0}});
		expect(wrapper.find(BuildControls)).toHaveLength(1);
	})
});