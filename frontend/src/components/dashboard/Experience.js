import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { deleteExperience } from '../../actions/profileActions'

class Experience extends Component {
	constructor(props) {
		super(props)
  }
  
  onDeleteClick(id){
    this.props.deleteExperience(id)
  }

	render() {
		const experience = this.props.experience.map(exp => (
			<tr key={exp._id}>
				<td>{exp.organization}</td>
				<td>{exp.title}</td>
				<td>
					<Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{' '}
					{exp.to === null ? (
						'Present'
					) : (
						<Moment format='YYYY/MM/DD'>{exp.to}</Moment>
					)}
				</td>
				<td>
					<button className='btn btn-danger' onClick={this.onDeleteClick.bind(this, exp._id)}>Delete</button>
				</td>
			</tr>
		))
		return (
			<div>
				<h4 className='mb-4'>Work Experience</h4>
				<table className='table'>
					<thead>
						<tr>
							<th>Work Place</th>
							<th>Job Title</th>
							<th>Duration</th>
							<th></th>
						</tr>
					</thead>
					<tbody>{experience}</tbody>
				</table>
			</div>
		)
	}
}

Experience.propTypes = {
	deleteExperience: PropTypes.func.isRequired
}

export default connect(null, { deleteExperience })(Experience)
