import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextFieldGroup from '../common/TextFieldGroup'
import InputGroup from '../common/InputGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import Loading from '../Loading'
import { createProfile } from '../../actions/profileActions'
import { withRouter } from 'react-router-dom'

class CreateProfile extends Component {
	constructor(props) {
		super(props)

		this.state = {
			displaySocialInput: false,
			handle: '',
			workPlace: '',
			website: '',
			location: '',
			status: '',
			bio: '',
			twitter: '',
			facebook: '',
			linkedin: '',
			instagram: '',
			errors: {},
			loading: false
		}

		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors, loading: false })
		}
	}

	async onSubmit(e) {
		e.preventDefault()
		this.setState({ loading: true })
    
    const profileData = {
      handle: this.state.handle,
      workPlace: this.state.workPlace,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      instagram: this.state.instagram
    }

    await this.props.createProfile(profileData, this.props.history)
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	render() {
		const { errors, displaySocialInput, loading } = this.state
		return (
			<div className='create-profile'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-8 m-auto'>
							{loading && <Loading />}
							{/* <h4 className='display-4 text-center'> Create your Profile</h4> */}
							<p className='lead text-center'>
								Create a Professional Medical Profile
							</p>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder='Profile Handle'
									value={this.state.handle}
									name='handle'
									onChange={this.onChange}
									error={errors.handle}
									info='Enter a unique handle for accessing your profile '
								/>
								<TextFieldGroup
									placeholder='Your Medical Career Status'
									value={this.state.status}
									name='status'
									onChange={this.onChange}
									error={errors.status}
									info='Ex: Medical Doctor, Pharmacist, Professor, Nurse, Student e.t.c '
								/>
								<TextFieldGroup
									placeholder='Work Place'
									value={this.state.workPlace}
									name='workPlace'
									onChange={this.onChange}
									error={errors.workPlace}
									info='Work Place or School (Students)'
								/>
								<TextFieldGroup
									placeholder='Website'
									value={this.state.website}
									name='website'
									onChange={this.onChange}
									error={errors.website}
									info='Personal or Work website'
								/>
								<TextFieldGroup
									placeholder='Location'
									value={this.state.location}
									name='location'
									onChange={this.onChange}
									error={errors.location}
									info='Ex. Lagos, Nigeria'
								/>
								<TextAreaFieldGroup
									placeholder='Bio'
									value={this.state.bio}
									name='bio'
									onChange={this.onChange}
									error={errors.bio}
									info='Tell us little about yourself'
								/>

								<div className='mb-3'>
									<div
										onClick={() => {
											this.setState(prevState => ({
												displaySocialInput: !prevState.displaySocialInput
											}))
										}}
										className='btn btn-light'
									>
										Add social network links
									</div>
									<span className='text-muted p-2'>Optional</span>
								</div>
								{displaySocialInput && (
									<div>
										<InputGroup
											placeholder='Twitter Profile Url'
											value={this.state.twitter}
											name='twitter'
											icon='fab fa-twitter'
											onChange={this.onChange}
											error={errors.twitter}
										/>
										<InputGroup
											placeholder='Facebook Profile Url'
											value={this.state.facebook}
											name='facebook'
											icon='fab fa-facebook'
											onChange={this.onChange}
											error={errors.facebook}
										/>
										<InputGroup
											placeholder='Linkedin Profile Url'
											value={this.state.linkedin}
											name='linkedin'
											icon='fab fa-linkedin'
											onChange={this.onChange}
											error={errors.linkedin}
										/>
										<InputGroup
											placeholder='Instagram Profile Url'
											value={this.state.instagram}
											name='instagram'
											icon='fab fa-instagram'
											onChange={this.onChange}
											error={errors.instagram}
										/>
									</div>
								)}
								<input
									type='submit'
									value='submit'
                  className='btn btn-info btn-block mt-4'
                  disabled={loading}
								/>
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

CreateProfile.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	createProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors
})

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile))
 