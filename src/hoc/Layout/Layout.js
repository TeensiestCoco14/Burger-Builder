import React, {Component} from "react";
import {connect} from "react-redux";
import Auxillary from "../Auxillary/Auxillary";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";


class layout extends Component {

	state = {
		showSideDrawer: false
	}


	sideDrawerClosedHandler = () => {
		this.setState({showSideDrawer: false});
	}

	sideDrawerToggleHandler = () => {
		this.setState((prevState) => {
			return {showSideDrawer: !prevState.showSideDrawer};
		});
	}


	render() {
		return (
			<Auxillary>
				<Toolbar 
					drawerToggleClicked = {this.sideDrawerToggleHandler}
					isAuth = {this.props.isAuthenticated}/>
				<SideDrawer 
					open = {this.state.showSideDrawer} 
					closed = {this.sideDrawerClosedHandler} 
					isAuth = {this.props.isAuthenticated}/>
				<main className={classes.Content}>
					{this.props.children}
				</main>
			</Auxillary>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null
	};
};

export default connect(mapStateToProps)(layout);