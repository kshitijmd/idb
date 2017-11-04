import React from "react";
import CardGridList from "./CardGridList";
import * as musicApi from "../services/api/musicApi";

export default class TrackGrid extends React.Component {
	render() {
		return <CardGridList routerBaseUrl="tracks" modelApiFn={musicApi.getTracks} />;
	}
}
