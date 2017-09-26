import React from "react";
import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import Divider from "material-ui/Divider";
import MenuItem from "material-ui/MenuItem";

export default class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = { open: false };
	}

	handleToggle = () => this.setState({ open: !this.state.open });

	handleClose = () => this.setState({ open: false });

	render() {
		return (
			<div>
				<AppBar title="Playlistr" onLeftIconButtonTouchTap={this.handleToggle} />
				<Drawer
					docked={false}
					width={200}
					open={this.state.open}
					onRequestChange={open => this.setState({ open })}
				>
					<MenuItem onClick={this.handleClose}>Menu Item</MenuItem>
					<Divider />
					<MenuItem onClick={this.handleClose}>Menu Item 2</MenuItem>
					<Divider />
				</Drawer>
			</div>
		);
	}
}
