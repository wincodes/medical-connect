import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../actions/profileActions'
import Loading from '../Loading'
import { Link  } from 'react-router-dom'

class Dashboard extends Component {
	// constructor() {
	// 	super()
	// }

	componentDidMount() {
		this.props.getCurrentProfile()
	}

	render() {
		const { user } = this.props.auth
		const { profile, loading } = this.props.profile

		let dashboardContent

		if (profile == null || loading) {
			dashboardContent = <Loading />
		} else {
			if (Object.keys(profile).length > 0) {
				dashboardContent = <h4>Display Profile</h4>
			} else {
				//logged in user has no profile
				dashboardContent = (
					<div>
						<p className='lead text-muted'>Welcome { user.name }</p>
             <p>You have not Setup your Profile</p>
             <Link to="/create-profile"  className="btn btn-lg btn-info"> Create Profile</Link>
					</div>
				)
			}
		}
		return (
			<div className='dashboard'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-12'>
							<h1 className='display-4'>Dashboard</h1>
							{dashboardContent}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

Dashboard.propTypes = {
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard)
