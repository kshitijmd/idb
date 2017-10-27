import React from "react";
import PageLayout from "./PageLayout";
import { Card, CardTitle, CardText } from "material-ui/Card";
import { Tab, Tabs } from "material-ui/Tabs";

const memberInfo = {
	groupName: "Hackapellas",
	members: [
		{
			name: "Nick Ginther",
			photo_url: "https://i.imgur.com/NqVRUoh.jpg",
			bio:
				"Nick is a 4th year Computer Science senior from San Antonio, TX. He been interested in computers and programming ever since the 5th grade. His CS interests include operating systems, web development, and video game hacking.",
			responsibilities: "front-end",
			commits: 22,
			issues: 16,
			unit_tests: 8,
		},
		{
			name: "Taylor Kline",
			photo_url: "https://avatars2.githubusercontent.com/u/2641739?v=4&s=400",
			bio:
				"Taylor is about to graduate in December 2017. He intends to pursue web development in modern technologies and work from his hammock as much as possibe.",
			responsibilities: "Workflow and documentation",
			commits: 44,
			issues: 7,
			unit_tests: 0,
		},
		{
			name: "Kshitij Delvadiya",
			photo_url:
				"https://raw.githubusercontent.com/kshitijmd/kshitijmd.github.io/master/images/Headshot.png",
			bio:
				"K is from India, Kuwait, Midland TX, Dallas TX and Austin TX. He will join PestRoutes as a software engineer in December 2017. Ask him about his bbq paneer kabobs.",
			responsibilities: "Hosting and API",
			commits: 16,
			issues: 11,
			unit_tests: 0,
		},
		{
			name: "Scott Jackson",
			photo_url: "https://avatars1.githubusercontent.com/u/10877192?v=4&s=460",
			bio:
				"Scott is a Senior Computer Science major from Houston, Texas. After graduation he will be joining Amazon as a SDE in Austin. Outside of his passion for programming, he enjoys thinking longingly about the Corgi he will someday own, and playing guitar and video games.",
			responsibilities: "Fullstack",
			commits: 36,
			issues: 12,
			unit_tests: 0,
		},
		{
			name: "David Letourneau",
			photo_url:
				"https://cs373fall2017davidletourneau.files.wordpress.com/2017/09/cropped-davidletourneau-e1504464848243.jpg",
			bio:
				"David is a graduating senior from Pflugerville, Tx. When he's not writing code, he can be found running around Austin, watching old movies, or arguing about the best flavor of icecream.",
			responsibilities: "API design and documentation",
			commits: 17,
			issues: 10,
			unit_tests: 0,
		},
	],
};

const dataSources = [
	{
		name: "Spotify",
		link: "https://api.spotify.com",
		scrape_desc:
			"The Spotify API requires OAuth for all requests, which is somewhat annoying but Postman makes OAuth extremely simple; it dynamically adds the header to the request. Since the amount of data we needed is small, we manually scraped the API using Postman. Spotify provides all data for all four of our models, with the exception of play count and artist bio.",
	},
	{
		name: "Last.fm",
		link: "http://ws.audioscrobbler.com/2.0/",
		scrape_desc:
			"The Last.fm API does not require authentication in all cases, but it is less nuanced than Spotify's API. It has the option of returning data formatted as JSON or XML, which can be convenient when working with pre-existing frameworks. Last.fm was also manually scraped using Postman.",
	},
];

const tools = [
	{
		name: "React",
		description:
			"React is a front-end framework used for client-side page rendering and routing. Anything the user can interact with or see is handled by React. This includes page layouts, styling, navigation, et cetera.",
	},
	{
		name: "Webpack",
		description:
			"Webpack is a build and bundling tool for Javascript. In our project, it is used to compile our React components from multiple separate JSX files into one single vanilla JS file (bundle.js). This single file is then included statically in any request to our website.",
	},
	{
		name: "Prettier",
		description:
			"Prettier keeps the codebase's formatting consistent among all contributers by forcibly re-formatting all code by reading it into an abstract syntax tree and regurgitating it back into the file with an automated formatting.",
	},
	{
		name: "ESLint",
		description:
			"ESLint, a static code analysis tool, is used to catch certain classes of flaws caused by developer error. For example, it enforces that you use all the variables that you declare or import. It is pluggable as well, so it works well with our front-end framework - React. For React, it has its own set of rules. For example, if a component uses any props, these props' types must be declared somewhere in the component definition as PropTypes. ESLint is part of our CI process and gets run every time a new patch is pushed to the central repository.",
	},
	{
		name: "Material UI",
		description:
			"Material UI is a library of React components that we used to build our UI. Specifically, we use it for our navigation bar, navigation drawer, About page tabs, and grids on the grid pages.",
	},
	{
		name: "Flask",
		description:
			"Flask is a back-end framework for Python. We use it to handle requests to the '/api' route and serve the '/' index into our front-end React application. In the future, Flask's built in server will be replaced with a faster dedicated webserver (gunicorn or nginx).",
	},
	{
		name: "Virtualenv",
		description:
			"Virtualenv is a virtual environment tool for Python. We use it to build isolated Python environments for the development of Playlistr. It is mainly used to avoid dependency conflicts between Playlistr's dependencies and the dependencies of any other Python project that may be present on a certain developer's machine.",
	},
	{
		name: "PostgreSQL",
		description:
			"PostgreSQL is a relational database. We use it through the Google Cloud SQL service.",
	},
	{
		name: "SQLAlchemy",
		description:
			"SQLAlchemy is an Object Relational Model library for Python. We use it as an abstraction to operate on data in our database.",
	},
];

const links = {
	github: "https://github.com/mbowen13/idb",
	apiary: "http://docs.kshitijmd.apiary.io/",
	trello: "https://trello.com/b/cU5nD0hW/swe",
	uml: "https://utexas.app.box.com/s/nohry3xvi3u13xyahfkf8mfevcdbm06w",
	report: "https://utexas.box.com/s/yl4nnesb52uiv5xhuhqlh3j1907ogelg",
};

const styles = {
	memberListItem: {
		margin: "1em",
	},
	memberImage: {
		height: "300px",
		width: "auto",
	},
	cardTitle: {
		paddingBottom: 0,
	},
};

// can we pull these from Trello/GitHub/Travis?
const totalCommits = 211;
const totalIssues = 68;
const totalUnitTests = 8;

export default class About extends React.Component {
	render() {
		return (
			<PageLayout>
				<Card>
					<CardTitle title="About" />
					<Tabs>
						<Tab label="Description">
							<CardText>
								<p>
									We aim to provide trivia on music with an emphasis on broad
									musical discovery through the power of playlists. Businesses
									such as 8tracks have built their entire business model around
									playlist creation, and Spotify has swept them away by offering
									playlist creation and much more. Our web application allows
									users to explore the portal of playlists that have been created
									on Spotify as well as cross-reference facts on any song that
									catches their eye.
								</p>
								<p>
									Users of Playlistr can reference information about songs,
									albums, and artists, such as to answer a nagging trivia question
									of {'"'}On which of Pink Floyds albums did Another Brick in the
									Wall appear?{'"'}
								</p>
								<p>
									However, more uniquely, we allow users to cross reference the
									songs, albums, and artists with the playlists on which they
									might appear. Therefore, our application allows for more broad
									musical discovery: a fan of Grimes hit single Oblivion might
									look up this song and discover playlists they enjoy in the
									relatively niche genres of witch house, synthpop, dream pop, and
									ambient music and explore these even more into further branching
									genres.
								</p>
							</CardText>
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
													<img
														style={styles.memberImage}
														src={member.photo_url}
													/>
												</div>
												<div>Name: {member.name}</div>
												<div>Bio: {member.bio}</div>
												<div>
													Responsibilities of the members today:{" "}
													{member.responsibilities}
												</div>
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
									<a href={links.uml}>UML Diagram</a>
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
													<b>{tool.name}</b>
												</div>
												<div>{tool.description}</div>
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
