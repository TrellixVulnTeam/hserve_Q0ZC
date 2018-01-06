import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
//import schema from './schema/schema';
import bodyParser from 'body-parser';
import axios from 'axios';
import cors from 'cors';
import { express as middleware } from 'graphql-voyager/middleware';
const { makeExecutableSchema } = require('graphql-tools');
// Function that calls expres - Express is running!
const app = express();

const books = [];
  
  // The GraphQL schema in string form
  const typeDefs = `
  schema {
	query: all_queries
  }
  
  type all_queries {
	cryptoProfiles: [Find_Coin_Profiles]
	cryptoSocial(ticker: String): find_Coin_Social
	coinProfileCompare(ticker: String): Find_Coin_Profiles
	coinSocialCompare(ticker: String): find_Coin_Social
	icoListings: [Fetch_ICO]
	icoDetails(id: Int): [ico_details]
	icoWrappup(name: String, token: String, id: Int): ico_details
	icoStatus(type: String): [find_ICO_list]
	icoWatchDetails(type: String, name: String): find_ICO_list
	coinNews(type: String, symbol: String, page: Int): [cryptonews]
	CoinMarketCap: [CoinMarketCap_Parent]
	cmc_coin(symbol: String): CoinMarketCap_Parent
  }
  
  
  type CoinMarketCap_Parent {
	available_supply: Float
	id: String
	last_updated: Float
	market_cap_usd: Float
	name: String
	percent_change_1h: Float
	percent_change_24h: Float
	percent_change_7d: Float
	price_btc: Float
	price_usd: Float
	rank: Int
	symbol: String
	total_supply: Float
  }
  
  type content_mentions {
	code: String
	title: String
	slug: String
	url: String
  }
  
  type cryptonews {
	domain: String
	source: [source_info]
	title: String
	published_at: String
	slug: String
	currencies: [content_mentions]
	id: Int
	created_at: String
	url: String
  }
  
  type Facebook_Stats {
	Points: Float
	is_closed: String
	likes: Int
	link: String
	name: String
	talking_about: Int
  }
  
  type Fetch_ICO {
	id: ID
	name: String
	desc: String
	logo: String
	premiium: Int
	raised: Int
	rating: Float
	url: String
  }
  
  type Find_Coin_Profiles {
	Algorithm: String
	CoinName: String
	FullName: String
	FullyPremined: String
	Id: Int
	ImageUrl: String
	Name: String
	PreMinedValue: String
	ProofType: String
	SortOrder: String
	Sponsored: String
	Symbol: String
	TotalCoinSupply: Float
	TotalCoinsFreeFloat: String
	Url: String
	CoinMarketCap(Name: String, Symbol: String, CoinName: String): CoinMarketCap_Parent
	CoincapProfile(Name: String): find_profiles_coincap
  }
  
  type find_Coin_Social {
	CodeRepository: Repository
	CryptoCompare: site_stats
	Facebook: Facebook_Stats
	General: General_Stats
	Reddit: Reddit_Stats
	Twitter: Twitter_Stats
  }
  
  type find_ICO_list {
	name: String
	description: String
	end_time: String
	icowatchlist_url: String
	image: String
	start_time: String
	timezone: String
	website_link: String
	all_time_roi: String
	coin_symbol: String
	price_usd: Float
  }
  
  type find_profiles_coincap {
	altCap: String
	bitnodesCount: Float
	btccap: Float
	btcPrice: Float
	cap24hrChange: Float
	display_name: String
	dom: Float
	id: String
	market_cap: Int
	price: Float
	price_usd: Float
	status: String
	supply: Float
	totalCap: Float
	type: String
	usdVolume: Float
	volume: Float
	volumeAlt: Float
	volumeBtc: Float
	volumeTotal: Float
  }
  
  type General_Stats {
	CoinName: String
	Name: String
	Points: Int
	Type: String
  }
  
  type ico_categories {
	id: Int
	name: String
  }

  type ico_dates {
	icoEnd: String
	icoStart: String
	preIcoEnd: String
	preIcoStart: String
  }
  
  type ico_details {
	id: ID
	name: String
	about: String
	intro: String
	logo: String
	rating: Float
	ratingProduct: Float
	ratingProfile: Float
	ratingTeam: Float
	ratingVision: Float
	tagline: String
	teamIntro: String
	url: String
	categories: [ico_categories]
	exchanges: [ico_exchanges]
	finance: ico_finance
	links: ico_links
	milestones: [ico_milestones]
	ratings: [ico_ratings]
	team: [ico_team]
	dates: ico_dates
  }
  
  type ico_exchanges {
	currency: String
	id: ID
	name: String
	price: Float
	roi: String
  }
  
  type ico_finance {
	accept: String
	bonus: String
	distributed: String
	hardcap: String
	minimum: String
	price: String
	raised: Float
	softcap: String
	token: String
	tokens: String
	tokentype: String
  }
  
  type ico_links {
	bitcointalk: String
	discord: String
	facebook: String
	github: String
	medium: String
	reddit: String
	slack: String
	telegram: String
	twitter: String
	whitepaper: String
	www: String
	youtube: String
  }
  
  type ico_milestones {
	content: String
	title: String
  }
 
  type ico_ratings {
	agree: Int
	date: String
	name: String
	photo: String
	product: Int
	profile: Int
	review: String
	team: Int
	title: String
	vision: Int
	weight: String
  }
  
  type ico_team {
	group: String
	iss: Float
	links: String
	photo: String
	title: String
  }
  
  type Reddit_Stats {
	Points: Int
	active_users: Int
	comments_per_day: Float
	comments_per_hour: Float
	community_creation: Float
	link: String
	name: String
	posts_per_day: Float
	posts_per_hour: Float
	subscribers: Int
  }
  
  type Repository {
	List: [Repository_list]
	Points: Int
  }
  
  type Repository_list {
	close_issues: Int
	closed_pull_issues: Int
	closed_total_issues: Int
	created_at: Float
	fork: String
	forks: Int
	language: String
	last_push: Float
	last_update: Float
	open_issues: Int
	open_pull_issues: Int
	open_total_issues: Int
	size: Int
	stars: Int
	subscribers: Int
	url: String
  }
  
  type site_similaritems {
	FollowingType: Int
	FullName: String
	Id: Int
	ImageUrl: String
	Name: String
	Url: String
  }

  type site_stats {
	Comments: Int
	Followers: Int
	PageViews: Int
	Points: Int
	Posts: Int
	PageViewsSplit: site_stats_pv
	SimilarItems: [site_similaritems]
  }
  
  type site_stats_pv {
	Analysis: Int
	Charts: Int
	Forum: Int
	Markets: Int
	Orderbook: Int
	Overview: Int
	Trades: Int
  }

  type source_info {
	domain: String
	title: String
	path: String
  }

  type Twitter_Stats {
	Points: Int
	account_creation: Int
	favourites: Int
	following: Int
	link: String
	lists: Int
	name: String
	statuses: Int
  }
  `;
  
  const Find_Coin_Profiles = ( ) => {
	  console.log('test resolver');
  }

  // The resolvers
  const resolvers = {
	all_queries: { cryptoProfiles: () => [Find_Coin_Profiles] }
  };
  
  // Put together a schema
  const schema = makeExecutableSchema({
	typeDefs,
	resolvers
  });

app.use('*', cors({ origin: 'http://localhost:8000' }));

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: schema }));

app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // GUI Editor 

app.use('/', middleware({ endpointUrl: '/graphql' }));

if (process.env.NODE_ENV === 'production') {
	//This will serve production React Enviroment

	app.use(express.static('client/build'));

	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

// Setting up heroku - Dynamic Binding
const PORT = process.env.PORT || 5000;
app.listen(PORT);
