import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Loading from '../Loading'
import { addEducation } from '../../actions/profileActions'

class AddEducation extends Component {
	constructor(props) {
		super(props)
		this.state = {
			degree: '',
			school: '',
			fieldOfStudy: '',
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
      degree: this.state.degree,
			school: this.state.school,
			fieldOfStudy: this.state.fieldOfStudy,
			from: this.state.from,
			to: this.state.to,
			current: this.state.current,
			description: this.state.description
    }

    this.props.addEducation(data, this.props.history)
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
			<div className='add-education'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-8 m-auto'>
							{loading && <Loading />}
							<Link className='btn btn-light' to='/dashboard'>
								Back to Dashboard
							</Link>
							<h4 className='text-center'>Add Educational Qualification</h4>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder='School'
									value={this.state.school}
									name='school' 
									onChange={this.onChange}
									error={errors.school}
									info='School / Institution attended'
								/>
								<TextFieldGroup
									placeholder='Degree Attained'
									value={this.state.degree}
									name='degree'
									onChange={this.onChange}
									error={errors.degree}
									info='Degree e.g MBBS'
								/>
								<TextFieldGroup
									placeholder='Field of Study'
									value={this.state.fieldOfStudy}
									name='fieldOfStudy'
									onChange={this.onChange}
									error={errors.fieldOfStudy}
								/>
								<TextAreaFieldGroup
									placeholder='Description'
									value={this.state.description}
									name='description'
									onChange={this.onChange}
									error={errors.description}
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
										Still Schooling?
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

AddEducation.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	addEducation: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors
})

export default connect(mapStateToProps, { addEducation })(
	withRouter(AddEducation)
)
