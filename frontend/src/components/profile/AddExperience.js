import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Loading from '../Loading'
import { addExperience } from '../../actions/profileActions'

class AddExperience extends Component {
	constructor(props) {
		super(props)
		this.state = {
			title: '',
			organization: '',
			location: '',
			from: '',
			to: '',
			current: false,
			description: '',
			errors: {},
			disabled: false,
			loading: false
		}

		this.onSubmit = this.onSubmit.bind(this)
		this.onChange = this.onChange.bind(this)
		this.onCheck = this.onCheck.bind(this)
  }
  
  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({
        errors: nextProps.errors,
        loading: false
      })
    }
  }

	onSubmit(e) {
		e.preventDefault()
		this.setState({ loading: true })
    
    const data = {
      title: this.state.title,
			organization: this.state.organization,
			location: this.state.location,
			from: this.state.from,
			to: this.state.to,
			current: this.state.current,
			description: this.state.description
    }

    this.props.addExperience(data, this.props.history)
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	onCheck(e) {
		this.setState({
			current: !this.state.current,
			disabled: !this.state.disabled
		})
	}

	render() {
		const { errors, loading } = this.state
		return (
			<div className='register'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-8 m-auto'>
							{loading && <Loading />}
							<Link className='btn btn-light' to='/dashboard'>
								Back to Dashboard
							</Link>
							<h4 className='text-center'>Add Work Experience</h4>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder='Organization'
									value={this.state.organization}
									name='organization'
									onChange={this.onChange}
									error={errors.organization}
									info='Hospital, Clinic, School or Other Oganization'
								/>
								<TextFieldGroup
									placeholder='Job Title'
									value={this.state.title}
									name='title'
									onChange={this.onChange}
									error={errors.title}
									info='Title of your Job'
								/>
								<TextFieldGroup
									placeholder='Location'
									value={this.state.location}
									name='location'
									onChange={this.onChange}
									error={errors.location}
									info='Work Location'
								/>
								<TextAreaFieldGroup
									placeholder='Job Description'
									value={this.state.description}
									name='description'
									onChange={this.onChange}
									error={errors.description}
									info='Brief Description of your Job'
								/>

								<h6>Start Date:</h6>
								<TextFieldGroup
									value={this.state.from}
									name='from'
									type='date'
									onChange={this.onChange}
									error={errors.from}
								/>

								<h6>End Date:</h6>
								<TextFieldGroup
									value={this.state.to}
									name='to'
									type='date'
									onChange={this.onChange}
									error={errors.to}
									disabled={this.state.disabled ? 'disabled' : ''}
								/>

								<div className='form-check mb-4'>
									<input
										type='checkbox'
										className='form-check-input'
										name='current'
										value={this.state.current}
										checked={this.state.current}
										onChange={this.onCheck}
										id='current'
									/>
									<label htmlFor='current' className='form-check-label'>
										Still Working Here?
									</label>
								</div>

								<input
									type='submit'
									value='submit'
									className='btn btn-info btn-block	mt-4'
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

AddExperience.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	addExperience: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors
})

export default connect(mapStateToProps, { addExperience })(
	withRouter(AddExperience)
)
