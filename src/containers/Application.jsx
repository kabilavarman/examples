import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

// import BreadCrumb from "../components/layouts/BreadCrumb";

class Application extends React.Component {
	render() {
		const {
			component: Component,
			isLoggedIn,
			auth,
			authorizedPages,
			// sidebar: { visible: isOpen },
			...rest
		} = this.props;
		return (
			<Route
				{...rest}
				render={(props) => {
					return (
						<>
							{/* // <div className="main-body"> */}
							{isLoggedIn() ? (
								<React.Fragment>
									{/* <div className={isOpen ? 'content' : 'content open'/}> */}
									{/* <BreadCrumb /> */}
									<Component isLoggedIn={isLoggedIn} auth={auth} {...props} />
									{/* </div> */}
								</React.Fragment>
							) : (
								<Component isLoggedIn={isLoggedIn} auth={auth} {...props} />
							)}
						</>
					);
				}}
			/>
		);
	}
}

export default connect((state) => {
	return {
		sidebar: state.sidebar,
	};
})(Application);
