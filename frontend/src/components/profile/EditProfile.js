import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextFieldGroup from '../common/TextFieldGroup'
import InputGroup from '../common/InputGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import Loading from '../Loading'
import { createProfile, getCurrentProfile } from '../../actions/profileActions'
import { Link, withRouter } from 'react-router-dom'

class EditProfile extends Component {
	constructor(props) {
		super(props)

		this.state = {
			displaySocialInput: false,
			profileData: {
				handle: '',
				workPlace: '',
				website: '',
				location: '',
				status: '',
				bio: '',
				social: {
					twitter: '',
					facebook: '',
					linkedin: '',
					instagram: ''
				}
			},
			errors: {},
			loading: false
		}

		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
		this.onSocialsChange = this.onSocialsChange.bind(this)
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors })
		}

		if (nextProps.profile.profile) {
			this.setState({ profileData: nextProps.profile.profile })
		}
		this.setState({ loading: false })
	}

	componentDidMount() {
		this.setState({ loading: true })
		this.props.getCurrentProfile()
	}

	async onSubmit(e) {
		e.preventDefault()
		this.setState({ loading: true })

		const profileData = {
			handle: this.state.profileData.handle,
			workPlace: this.state.profileData.workPlace,
			website: this.state.profileData.website,
			location: this.state.profileData.location,
			status: this.state.profileData.status,
			bio: this.state.profileData.bio,
			twitter: this.state.profileData.social.twitter,
			facebook: this.state.profileData.social.facebook,
			linkedin: this.state.profileData.social.linkedin,
			instagram: this.state.profileData.social.instagram
		}

		await this.props.createProfile(profileData, this.props.history)
	}

	onChange(e) {
		const profile = this.state.profileData
		this.setState({
			profileData: {
				...profile,
				[e.target.name]: e.target.value
			}
		})
	}

	onSocialsChange(e) {
		const profile = this.state.profileData
		const social = this.state.profileData.social
		this.setState({
			profileData: {
				...profile,
				social: {
					...social,
					[e.target.name]: e.target.value
				}
			}
		})
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
							<Link className='btn btn-light' to='/dashboard'>
								Back to Dashboard
							</Link>
							<p className='lead text-center'>Edit your Profile</p>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder='Profile Handle'
									value={this.state.profileData.handle || ''}
									name='handle'
									onChange={this.onChange}
									error={errors.handle}
									info='Enter a unique handle for accessing your profile '
								/>
								<TextFieldGroup
									placeholder='Your Medical Career Status'
									value={this.state.profileData.status || ''}
									name='status'
									onChange={this.onChange}
									error={errors.status}
									info='Ex: Medical Doctor, Pharmacist, Professor, Nurse, Student e.t.c '
								/>
								<TextFieldGroup
									placeholder='Work Place'
									value={this.state.profileData.workPlace || ''}
									name='workPlace'
									onChange={this.onChange}
									error={errors.workPlace}
									info='Work Place or School (Students)'
								/>
								<TextFieldGroup
									placeholder='Website'
									value={this.state.profileData.website || ''}
									name='website'
									onChange={this.onChange}
									error={errors.website}
									info='Personal or Work website'
								/>
								<TextFieldGroup
									placeholder='Location'
									value={this.state.profileData.location || ''}
									name='location'
									onChange={this.onChange}
									error={errors.location}
									info='Ex. Lagos, Nigeria'
								/>
								<TextAreaFieldGroup
									placeholder='Bio'
									value={this.state.profileData.bio || ''}
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
											value={this.state.profileData.social.twitter || ''}
											name='twitter'
											icon='fab fa-twitter'
											onChange={this.onSocialsChange}
											error={errors.twitter}
										/>
										<InputGroup
											placeholder='Facebook Profile Url'
											value={this.state.profileData.social.facebook || ''}
											name='facebook'
											icon='fab fa-facebook'
											onChange={this.onSocialsChange}
											error={errors.facebook}
										/>
										<InputGroup
											placeholder='Linkedin Profile Url'
											value={this.state.profileData.social.linkedin || ''}
											name='linkedin'
											icon='fab fa-linkedin'
											onChange={this.onSocialsChange}
											error={errors.linkedin}
										/>
										<InputGroup
											placeholder='Instagram Profile Url'
											value={this.state.profileData.social.instagram || ''}
											name='instagram'
											icon='fab fa-instagram'
											onChange={this.onSocialsChange}
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

EditProfile.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	createProfile: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
	withRouter(EditProfile)
)
