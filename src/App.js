import React, { Component } from 'react';
import {Route, withRouter, Redirect, Switch} from "react-router-dom"; //need withRouter if you encounter routing issues due to redux connect
import Layout from "./hoc/Layout/Layout";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";
import {connect} from "react-redux";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder"
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";


//Lazy loading for downloading components only when needed
const asyncCheckout = asyncComponent(() => {
	return import("./containers/Checkout/Checkout");
});

const asyncOrders = asyncComponent(() => {
	return import("./containers/Orders/Orders");
});

const asyncAuth = asyncComponent(() => {
	return import('./containers/Auth/Auth');
});

class App extends Component {

	componentDidMount() {
		this.props.onTryAutoSignup();
	}

	render() {

		let routes = (
			<Switch>
				<Route path = "/" exact component = {BurgerBuilder} />
				<Route path = "/Auth" component = {asyncAuth} />	
				<Redirect to = "/" />
			</Switch>
		);

		if (this.props.isAuthenticated) {
			routes = (
				<Switch>
					<Route path = "/" exact component = {BurgerBuilder} />
					<Route path = "/orders" component = {asyncOrders} />
					<Route path = "/checkout" component = {asyncCheckout} />
					<Route path = "/logout" component = {Logout} />
					<Route path = "/Auth" component = {asyncAuth} />
					<Redirect to = "/" />
				</Switch>
			)
		}
		
		return (
			<div>
				<Layout>
					{routes}
				</Layout>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onTryAutoSignup: () => dispatch(actions.authCheckState())
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
