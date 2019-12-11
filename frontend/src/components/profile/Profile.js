import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Loading from '../Loading'
import Header from './ProfileViews/Header'
import About from './ProfileViews/About'
import Credentials from './ProfileViews/Credentials'
import { getProfileByHandle } from '../../actions/profileActions'

class Profile extends Component {
	componentDidMount() {
		if (this.props.match.params.handle) {
			this.props.getProfileByHandle(this.props.match.params.handle)
		}
	}

	render() {
		const { loading, profile } = this.props.profile
		let ProfileContent
		if (profile === null || loading) {
			ProfileContent = <Loading />
		} else {
			ProfileContent = (
				<div>
					<div className='row'>
						<div className='col-md-6'>
							<Link to='/profiles' className='btn btn-light mb-3 float-left'>
								Back to Profiles
							</Link>
						</div>
						<div className='col-md-6'></div>
					</div>
					<Header profile={profile} />
					<About profile={profile} />
					<Credentials profile={profile} />
				</div>
			)
		}
		return (
			<div className='create-profile'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-12 m-auto'>{ProfileContent}</div>
					</div>
				</div>
			</div>
		)
	}
}

Profile.propTypes = {
	profile: PropTypes.object.isRequired,
	getProfileByHandle: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	profile: state.profile
})

export default connect(mapStateToProps, { getProfileByHandle })(Profile)
