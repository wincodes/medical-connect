import React, { Component } from 'react'
import Moment from 'react-moment'

class Credentials extends Component {
	render() {
		const { experience, education } = this.props.profile
		return (
			<div className='row'>
				<div className='col-md-6'>
					<h3 className='text-center text-info'>Experience</h3>
					<ul className='list-group'>
						{experience.map(exp => (
							<li key={exp._id} className='list-group-item'>
								<h4>{exp.organization}</h4>
								<p>
									<Moment format='MMMM YYYY'>{exp.from}</Moment> -{' '}
									{exp.to === null ? (
										'Present'
									) : (
										<Moment format='MMMM YYYY'>{exp.to}</Moment>
									)}
								</p>
								<p>
									<strong>Position:</strong> {exp.title}
								</p>
								{exp.description && (
									<p>
										<strong>Description:</strong> {exp.description}
									</p>
								)}
							</li>
						))}
					</ul>
				</div>
				<div className='col-md-6'>
					<h3 className='text-center text-info'>Education</h3>
					<ul className='list-group'>
						{education.map(edu => (
							<li key={edu._id} className='list-group-item'>
								<h4>{edu.school}</h4>
								<p>
									<Moment format='MMMM YYYY'>{edu.from}</Moment> -{' '}
									{edu.to === null ? (
										'Present'
									) : (
										<Moment format='MMMM YYYY'>{edu.to}</Moment>
									)}
								</p>
								<p>
									<strong>Degree: </strong>
									{edu.degree}
								</p>
								<p>
									<strong>Field Of Study: </strong>
									{edu.fieldOfStudy}
								</p>
								{edu.description && (
									<p>
										<strong>Description:</strong> {edu.description}
									</p>
								)}
							</li>
						))}
					</ul>
				</div>
			</div>
		)
	}
}

export default Credentials
