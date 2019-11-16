import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authActions'

import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { css } from '@emotion/core';
import FadeLoader from 'react-spinners/FadeLoader';

if (localStorage.jwtToken) {
	setAuthToken(localStorage.jwtToken);

	//decode the jwt token
	const decoded = jwt_decode(localStorage.jwtToken)

	//set current user
	store.dispatch(setCurrentUser(decoded))

	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		//logout user
		store.dispatch(logoutUser())

		//redirect to login
		window.location.href = '/login';
	}
}
const override = css`
    display: block;
		margin: 0 auto;
    border-color: red;
`;

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className="App">
						<FadeLoader
							className="loading"
							css={override}
							sizeUnit={"px"}
							size={150}
							loading={store.getState().loading.loading}
						/>
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
