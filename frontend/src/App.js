import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser } from './actions/authActions'

import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ReactLoading from 'react-loading';

if (localStorage.jwtToken) {
	setAuthToken(localStorage.jwtToken);

	//decode the jwt token
	const decoded = jwt_decode(localStorage.jwtToken)

	//set current user
	store.dispatch(setCurrentUser(decoded))
}

class App extends Component {
	constructor() {
		super();

		this.state = {
			loading: false
		};
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps) {
			this.setState({ loading: nextProps.loading })
		}
	}

	render() {
		const { loading } = this.state
		let load;

		if (loading) {
			load = <ReactLoading
				className="loading"
				type="spokes"
				color="black"
				height={'15%'}
				width={'15%'}
			/>;
		}

		return (
			<Provider store={store}>
				<Router>
					<div className="App">
						{load}
						<Navbar />
						<div className="router-component">
							<Route exact path="/" component={Landing} />
							<Route exact path="/login" component={Login} />
							<Route exact path="/register" component={Register} />
						</div>
						<Footer />
					</div>
				</Router>
			</Provider>
		)
	}
}

export default App;
