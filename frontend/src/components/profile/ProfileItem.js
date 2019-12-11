import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import isEmpty from '../../validation/is-empty'

class ProfileItem extends Component {
	render() {
		const { profile } = this.props
		return (
			<div className='card card-body bg-light mb-3'>
				<div className='row'>
					<div className='col-3'>
						<img src={profile.user.avatar} alt='' className='rounded-circle' />
					</div>
					<div className='col-8'>
						<h3>{profile.user.name}</h3>
						<p>
							{profile.status}{' '}
							{isEmpty(profile.workPlace) ? null : (
								<span> at <strong>{profile.workPlace}</strong></span>
							)}
						</p>
						<p>
							{isEmpty(profile.location) ? null : (
								<span>{profile.location}</span>
							)}
						</p>
						<Link to={`profile/${profile.handle}`} className='btn btn-info'>
							{' '}
							View Profile
						</Link>
					</div>
				</div>
			</div>
		)
	}
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileItem
