import React, { Component } from 'react'

class About extends Component {
  render() {
    const { profile } = this.props
    return (
      <div className='row'>
				<div className='col-md-12'>
					<div className='card card-body bg-light mb-3'>
						<h4 className='text-info'>{ profile.user.name }'s Bio</h4>
						<p className='lead'>
							{profile.bio}
						</p>
					</div>
				</div>
			</div>
    )
  }
}

export default  About