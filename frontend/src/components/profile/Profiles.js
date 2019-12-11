import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Loading from '../Loading'
import { getProfiles } from '../../actions/profileActions'
import ProfileItem from './ProfileItem'

class Profiles extends Component {
	componentDidMount() {
		this.props.getProfiles()
	}

	render() {
		const { profiles, loading } = this.props.profile
		let profileItems
		if (profiles === null || loading) {
			profileItems = <Loading />
		} else {
			if (profiles.length > 0) {
				profileItems = profiles.map(profile => (
					<ProfileItem key={profile._id} profile={profile} />
				))
			} else {
				profileItems = <h4> No Profiles Found.. </h4>
			}
		}
		return (
			<div className='create-profile'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-8 m-auto'>
							<p className='lead text-center'>Medical Professionals</p>
							{profileItems}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

Profiles.propTypes = {
	getProfiles: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	profile: state.profile
})

export default connect(mapStateToProps, { getProfiles })(Profiles)
