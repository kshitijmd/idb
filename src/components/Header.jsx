import React from "react";
import { Link, withRouter } from "react-router-dom";
import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import Divider from "material-ui/Divider";
import MenuItem from "material-ui/MenuItem";
import { Tabs, Tab } from "material-ui/Tabs";

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
	navLinkContainer: {
		position: "absolute",
		left: "200px",
		width: "50%",
		marginTop: "auto",
	},
};

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = { open: false };
		this.routes = ["about", "artists", "albums", "tracks", "playlists"];
	}

	handleToggle = () => this.setState({ open: !this.state.open });

	handleClose = () => this.setState({ open: false });

	handleActive = path => this.props.history.push(path);

	render() {
		const basepath = this.props.location.pathname.split("/")[1];

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
				>
					<div style={styles.navLinkContainer}>
						<Tabs tabItemContainerStyle={styles.tabsItemContainer} value={basepath}>
							{this.routes.map(route => {
								return (
									<Tab
										label={capitalize(route)}
										onActive={() => this.handleActive("/" + route)}
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
					<Link style={styles.links} to="/about">
						<MenuItem onClick={this.handleClose}>About</MenuItem>
					</Link>
					<Divider />
					<Link style={styles.links} to="/albums">
						<MenuItem onClick={this.handleClose}>Albums</MenuItem>
					</Link>
					<Divider />
					<Link style={styles.links} to="/artists">
						<MenuItem onClick={this.handleClose}>Artists</MenuItem>
					</Link>
					<Divider />
					<Link style={styles.links} to="/tracks">
						<MenuItem onClick={this.handleClose}>Tracks</MenuItem>
					</Link>
					<Divider />
					<Link style={styles.links} to="/playlists">
						<MenuItem onClick={this.handleClose}>Playlists</MenuItem>
					</Link>
				</Drawer>
			</div>
		);
	}
}

export default withRouter(Header);
