import React, {Component} from "react";
import Modal from "../../components/UI/Modal/Modal";
import Auxillary from "../Auxillary/Auxillary";


const withErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {

		state = {
			error: null
		};

		componentWillMount() {
			this.reqInterceptor = axios.interceptors.request.use( req => { //saves the interceptors as properties of the compenent
				this.setState({error:null});
				return req;
			});
			this.resInterceptor = axios.interceptors.response.use(res => res, error => {
				this.setState({error: error});
			});
		}

		componentWillUnmount() {
			axios.interceptors.request.eject(this.reqInterceptor); // removes the interceptors when a compenent that uses it unmounts
			axios.interceptors.response.eject(this.resInterceptor);
		}

		errorConfirmedHandler = () => {
			this.setState({error: null});
		}

		render() {
			return (
				<Auxillary>
					<Modal 
						modalClosed = {this.errorConfirmedHandler}
						show = {this.state.error}>
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedComponent {...this.props} />
				</Auxillary>
			);
		}
	}	
}

export default withErrorHandler;