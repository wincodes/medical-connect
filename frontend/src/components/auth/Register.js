import React, { Component } from 'react'
import { connect } from 'react-redux'
import { registerUser } from '../../actions/authActions'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import Loading from '../Loading'
import TextFieldGroup from '../common/TextFieldGroup'

class Register extends Component {
	constructor() {
		super()

		this.state = {
			name: '',
			email: '',
			password: '',
			password2: '',
			errors: {},
			loading: false
		}

		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard')
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors, loading: false })
		}
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	onSubmit(e) {
		e.preventDefault()
		this.setState({ loading: true })

		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2
		}

		this.props.registerUser(newUser, this.props.history)
	}

	render() {
		const { errors, loading } = this.state

		return (
			<div className='register'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-8 m-auto'>
							{loading && <Loading />}
							<h1 className='display-4 text-center'>Sign Up</h1>
							<p className='lead text-center'>
								Create your Medical Connect Account
							</p>
							<form noValidate onSubmit={this.onSubmit}>
								<TextFieldGroup
									type='text'
									placeholder='Name'
									name='name'
									value={this.state.name}
									onChange={this.onChange}
									error={errors.name}
								/>
								
								<TextFieldGroup
									type='email'
									placeholder='Email Address'
									name='email'
									value={this.state.email}
									onChange={this.onChange}
									error={errors.email}
									info='This site uses Gravatar so if you want a profile image, use	a Gravatar email'
								/>

								<TextFieldGroup
									type='password'
									placeholder='Password'
									name='password'
									value={this.state.password}
									onChange={this.onChange}
									error={errors.password}
								/>

								<TextFieldGroup
									type='password'
									placeholder='Confirm Password'
									name='password2'
									value={this.state.password2}
									onChange={this.onChange}
									error={errors.password2}
								/>
								 
								<input type='submit' className='btn btn-info btn-block mt-4' />
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}
const mapStateToprops = state => ({
	auth: state.auth,
	errors: state.errors
})
export default connect(mapStateToprops, { registerUser })(withRouter(Register))
