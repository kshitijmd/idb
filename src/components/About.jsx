import React from "react";
import PageLayout from "./PageLayout";
import { Card, CardTitle, CardText } from "material-ui/Card";
import { Tab, Tabs } from "material-ui/Tabs";

const memberInfo = {
	groupName: "Hackapellas",
	members: [
		{
			name: "Nick Ginther",
			photo_url: "",
			bio: "",
			responsibilities: "",
			commits: 0,
			issues: 0,
			unit_tests: 0,
		},
		{
			name: "Taylor Kline",
			photo_url: "",
			bio: "",
			responsibilities: "",
			commits: 0,
			issues: 0,
			unit_tests: 0,
		},
		{
			name: "Kshitij Delvadiya",
			photo_url: "",
			bio: "",
			responsibilities: "",
			commits: 0,
			issues: 0,
			unit_tests: 0,
		},
		{
			name: "Michael Bowen",
			photo_url: "",
			bio: "",
			responsibilities: "",
			commits: 0,
			issues: 0,
			unit_tests: 0,
		},
		{
			name: "Scott Jackson",
			photo_url: "",
			bio: "",
			responsibilities: "",
			commits: 0,
			issues: 0,
			unit_tests: 0,
		},
	],
};

const dataSources = [
	{
		name: "Spotify",
		link: "",
		scrape_desc: "",
	},
	{
		name: "Last.fm",
		link: "",
		scrape_desc: "",
	},
];

const tools = [
	{
		name: "React",
		description: "Front-end framework.",
		link: "",
	},
	{
		name: "Flask",
		description: "Back-end framework.",
		link: "",
	},
];

const links = {
	github: "https://github.com/mbowen13/SWE-IDB",
	apiary: "",
	trello: "",
	report: "",
};

const styles = {
	memberListItem: {
		margin: "1em",
	},
	cardTitle: {
		paddingBottom: 0,
	},
};

// can we pull these from Trello/GitHub/Travis?
const totalCommits = 0;
const totalIssues = 0;
const totalUnitTests = 0;

export default class About extends React.Component {
	render() {
		return (
			<PageLayout>
				<Card>
					<CardTitle title="About" />
					<Tabs>
						<Tab label="Description">
							<CardText>description, purpose, intended users</CardText>
						</Tab>
						<Tab label="Group Info">
							<CardText>Group Name: {memberInfo.groupName}</CardText>
							<CardText>
								Members:
								<ul>
									{memberInfo.members.map(member => {
										return (
											<li key={member.name} style={styles.memberListItem}>
												<div>
													<img src={member.photo_url} />
												</div>
												<div>Name: {member.name}</div>
												<div>Bio: {member.bio}</div>
												<div>Responsibilities: {member.responsibilities}</div>
												<div>Commits: {member.commits}</div>
												<div>Issues: {member.issues}</div>
												<div>Unit Tests: {member.unit_tests}</div>
											</li>
										);
									})}
								</ul>
							</CardText>
						</Tab>
						<Tab label="Statistics">
							<CardTitle title="Stats" style={styles.cardTitle} />
							<CardText>
								<ul>
									<li>Total commits: {totalCommits}</li>
									<li>Total issues: {totalIssues}</li>
									<li>Total unit tests: {totalUnitTests}</li>
								</ul>
							</CardText>
							<CardTitle title="Links" style={styles.cardTitle} />
							<CardText>
								<div>
									<a href={links.apiary}>Apiary</a>
								</div>
								<div>
									<a href={links.github}>Github</a>
								</div>
								<div>
									<a href={links.trello}>Trello</a>
								</div>
								<div>
									<a href={links.report}>Report.pdf</a>
								</div>
							</CardText>
						</Tab>
						<Tab label="data">
							<CardText>
								<ul>
									{dataSources.map(ds => {
										return (
											<li key={ds.name} style={styles.memberListItem}>
												<div>
													Name: <a href={ds.link}>{ds.name}</a>
												</div>
												<div>Description: {ds.scrape_desc}</div>
											</li>
										);
									})}
								</ul>
							</CardText>
						</Tab>
						<Tab label="tools">
							<CardText>
								<ul>
									{tools.map(tool => {
										return (
											<li key={tool.name} style={styles.memberListItem}>
												<div>
													Name: <a href={tool.link}>{tool.name}</a>
												</div>
												<div>Description: {tool.description}</div>
											</li>
										);
									})}
								</ul>
							</CardText>
						</Tab>
					</Tabs>
				</Card>
			</PageLayout>
		);
	}
}
