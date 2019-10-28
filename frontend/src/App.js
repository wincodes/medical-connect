import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
// import ReactLoading from 'react-loading';  

function App() {
	return (
		<Router>
			<div className="App">
				{/* <ReactLoading
				className="loading"
				type="spokes"
				color="white"
				height={'15%'}
				width={'15%'}
			/> */}
				<Navbar />
				<Route exact path="/" component={ Landing } />
					<div className="container router-component">
						<Route exact path="/login" component={ Login } />
						<Route exact path="/register" component={ Register } />
					</div>
				<Footer />
			</div>
		</Router> 
	);
}

export default App;
