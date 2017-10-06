import React from "react";
import { Link, withRouter } from "react-router-dom";
import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import Divider from "material-ui/Divider";
import MenuItem from "material-ui/MenuItem";
import { Tabs, Tab } from "material-ui/Tabs";
import Radium from "radium";

const styles = {
	appBar: {
		flexWrap: "auto",
	},
	links: {
		textDecoration: "none",
		color: "inherit",
	},
	tabsItemContainer: {
		height: "64px",
	},
	navTabsContainer: {
		position: "absolute",
		left: "175px",
		width: "50%",
		marginTop: "auto",
		"@media (max-width: 720px)": {
			display: "none",
		},
	},
	drawer: {
		"@media (max-width: 719px)": {
			display: "none",
		},
	},
};

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = { open: false, width: "0", height: "0" };
		this.routes = ["about", "artists", "albums", "tracks", "playlists"];
	}

	componentDidMount = () => {
		this.updateWindowDimensions();
		window.addEventListener("resize", this.updateWindowDimensions);
	};

	componentWillUnmount = () => {
		window.removeEventListener("resize", this.updateWindowDimensions);
	};

	updateWindowDimensions = () => {
		this.setState({ width: window.innerWidth, height: window.innerHeight });
	};

	handleToggle = () => this.setState({ open: !this.state.open });

	handleClose = () => this.setState({ open: false });

	handleActive = path => this.props.history.push(path);

	render() {
		const basepath = this.props.location.pathname.split("/")[1];
		const useHamburgerMenu = this.state.width <= 720;

		return (
			<div>
				<AppBar
					title={
						<Link style={styles.links} to="/">
							Playlistr
						</Link>
					}
					style={styles.appBar}
					onLeftIconButtonTouchTap={this.handleToggle}
					showMenuIconButton={useHamburgerMenu}
				>
					<div style={styles.navTabsContainer}>
						<Tabs tabItemContainerStyle={styles.tabsItemContainer} value={basepath}>
							{this.routes.map(route => {
								return (
									<Tab
										label={route}
										onActive={() => this.handleActive("/" + route)} // infinite loop without lambda(???)
										value={route}
										key={route}
									/>
								);
							})}
						</Tabs>
					</div>
				</AppBar>

				<Drawer
					docked={false}
					open={this.state.open}
					onRequestChange={open => this.setState({ open })}
				>
					{this.routes.map(route => {
						return (
							<div key={route}>
								<Link to={"/" + route} style={styles.links}>
									<MenuItem
										onClick={this.handleClose}
										primaryText={capitalize(route)}
									/>
								</Link>
								<Divider />
							</div>
						);
					})}
				</Drawer>
			</div>
		);
	}
}

// makes props.history and props.location available
// radium for media queries and :hover
export default withRouter(Radium(Header));
