import React, {Component} from "react";
import Auxillary from "../../hoc//Auxillary/Auxillary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from "react-redux";
import * as burgerBuilderActions from "../../store/actions/index";

export class BurgerBuilder extends Component {
	//constructor(props) {
		//super(props);
	//	this.state = {state stuff}
//	} This style also works to initialize state

	state = {
		purchasing: false,
	}

	componentDidMount() {
		this.props.onInitIngredients();
	}

	updatePurchaseState(ingredients) {
		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		return sum > 0
	}

	purchaseHandler = () => {
		if (this.props.isAuthenticated) {
			this.setState({purchasing: true});
		} else {
			this.props.onSetAuthRedirectPath("/checkout");
			this.props.history.push("/auth");
		}
	}

	purchaseCancelHandler = () => {
		this.setState({purchasing: false});
	}

	purchaseContinueHandler = () => {
		this.props.onInitPurchase();
		this.props.history.push("/checkout");
	}


	render() {

		const disableInfo = {
			...this.props.ings
		}
		for (let key in disableInfo) {
			disableInfo[key] = disableInfo[key] <= 0;
		}

		let orderSummary = null;

		let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

		if (this.props.ings) {
			burger = (
					<Auxillary>
						<Burger ingredients = {this.props.ings}/>
						<BuildControls 
							ordered = {this.purchaseHandler}
							price = {this.props.price}
							ingredientAdded = {this.props.onIngredientAdded}
							ingredientRemoved = {this.props.onIngredientRemoved}
							disabled = {disableInfo}
							purchasable = {this.updatePurchaseState(this.props.ings)}
							isAuth = {this.props.isAuthenticated}/>
					</Auxillary>
				);
			orderSummary = <OrderSummary 
							price = {this.props.price}
							ingredients = {this.props.ings}
							purchaseCanceled = {this.purchaseCancelHandler}
							purchaseContinued = {this.purchaseContinueHandler}/>;
		}
		 
		return (
			<Auxillary>
				<Modal 
					modalClosed = {this.purchaseCancelHandler}
					show = {this.state.purchasing}>
					{orderSummary}
				</Modal>
				{burger}
			</Auxillary>
		);
	}
}

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		isAuthenticated: state.auth.token !== null
	};
}

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
		onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
		onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
		onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
		onSetAuthRedirectPath: (path) => dispatch(burgerBuilderActions.setAuthRedirectPath(path))
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));