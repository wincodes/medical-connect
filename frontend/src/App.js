import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authActions'

import './App.css'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Dashboard from './components/dashboard/dashboard'
import PrivateRoute from './components/common/PrivateRoute'
import CreateProfile from './components/create-profile/CreateProfile'

if (localStorage.jwtToken) {
	setAuthToken(localStorage.jwtToken)

	//decode the jwt token
	const decoded = jwt_decode(localStorage.jwtToken)

	//set current user
	store.dispatch(setCurrentUser(decoded))

	const currentTime = Date.now() / 1000
	if (decoded.exp < currentTime) {
		//logout user
		store.dispatch(logoutUser())

		//redirect to login
		window.location.href = '/login'
	}
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className='App'>
						<Navbar />
						<div className='router-component'>
							<Route exact path='/' component={Landing} />
							<Route exact path='/login' component={Login} />
							<Route exact path='/register' component={Register} />
							<Switch>
								<PrivateRoute exact path='/dashboard' component={Dashboard} />
							</Switch>
							<Switch>
								<PrivateRoute exact path='/create-profile' component={CreateProfile} />
							</Switch>
						</div>
						<Footer />
					</div>
				</Router>
			</Provider>
		)
	}
}

export default App
