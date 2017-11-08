import React from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import Divider from "material-ui/Divider";
import MenuItem from "material-ui/MenuItem";
import { Tabs, Tab } from "material-ui/Tabs";
import SearchBar from "material-ui-search-bar";
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
		left: "125px",
		width: "50%",
		marginTop: "auto",
		"@media (max-width: 850px)": {
			display: "none",
		},
	},
	drawer: {
		"@media (min-width: 850px)": {
			display: "none",
		},
	},
	searchBarContainer: {
		marginRight: "10px",
		width: "37%",
		"@media (max-width: 1030px)": {
			width: "33%",
		},
		"@media (max-width: 850px)": {
			width: "70%",
			position: "absolute",
			left: "175px",
		},
		"@media (max-width: 615px)": {
			width: "60%",
			position: "absolute",
			left: "175px",
		},
		"@media (max-width: 485px)": {
			width: "50%",
			position: "absolute",
			left: "175px",
		},
	},
	searchBar: {
		width: "100%",
		marginTop: "8px",
	},
};

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = { open: false, width: "0", height: "0", dataSource: [] };
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
		const useHamburgerMenu = this.state.width <= 850;

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

					<div style={styles.searchBarContainer}>
						<SearchBar
							dataSource={this.state.dataSource}
							onChange={value =>
								this.setState({
									dataSource: [value, value + value, value + value + value],
								})}
							onRequestSearch={() => {
								this.props.history.push({
									pathname: "/search",
									search: "?query=" + this.state.dataSource[0]
								}) 
							}}
							style={styles.searchBar}
							hintText={"Search for your favorite music!"}
						/>
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

Header.propTypes = {
	history: PropTypes.object,
	location: PropTypes.object,
};

// makes props.history and props.location available
// radium for media queries and :hover
export default withRouter(Radium(Header));
