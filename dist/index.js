'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _apolloServerExpress = require('apollo-server-express');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _middleware = require('graphql-voyager/middleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import schema from './schema/schema';
var _require = require('graphql-tools'),
    makeExecutableSchema = _require.makeExecutableSchema;
// Function that calls expres - Express is running!


var app = (0, _express2.default)();

var books = [];

// The GraphQL schema in string form
var typeDefs = '\n  schema {\n\tquery: all_queries\n  }\n  \n  type all_queries {\n\tcryptoProfiles: [Find_Coin_Profiles]\n\tcryptoSocial(ticker: String): find_Coin_Social\n\tcoinProfileCompare(ticker: String): Find_Coin_Profiles\n\tcoinSocialCompare(ticker: String): find_Coin_Social\n\ticoListings: [Fetch_ICO]\n\ticoDetails(id: Int): [ico_details]\n\ticoWrappup(name: String, token: String, id: Int): ico_details\n\ticoStatus(type: String): [find_ICO_list]\n\ticoWatchDetails(type: String, name: String): find_ICO_list\n\tcoinNews(type: String, symbol: String, page: Int): [cryptonews]\n\tCoinMarketCap: [CoinMarketCap_Parent]\n\tcmc_coin(symbol: String): CoinMarketCap_Parent\n  }\n  \n  \n  type CoinMarketCap_Parent {\n\tavailable_supply: Float\n\tid: String\n\tlast_updated: Float\n\tmarket_cap_usd: Float\n\tname: String\n\tpercent_change_1h: Float\n\tpercent_change_24h: Float\n\tpercent_change_7d: Float\n\tprice_btc: Float\n\tprice_usd: Float\n\trank: Int\n\tsymbol: String\n\ttotal_supply: Float\n  }\n  \n  type content_mentions {\n\tcode: String\n\ttitle: String\n\tslug: String\n\turl: String\n  }\n  \n  type cryptonews {\n\tdomain: String\n\tsource: [source_info]\n\ttitle: String\n\tpublished_at: String\n\tslug: String\n\tcurrencies: [content_mentions]\n\tid: Int\n\tcreated_at: String\n\turl: String\n  }\n  \n  type Facebook_Stats {\n\tPoints: Float\n\tis_closed: String\n\tlikes: Int\n\tlink: String\n\tname: String\n\ttalking_about: Int\n  }\n  \n  type Fetch_ICO {\n\tid: ID\n\tname: String\n\tdesc: String\n\tlogo: String\n\tpremiium: Int\n\traised: Int\n\trating: Float\n\turl: String\n  }\n  \n  type Find_Coin_Profiles {\n\tAlgorithm: String\n\tCoinName: String\n\tFullName: String\n\tFullyPremined: String\n\tId: Int\n\tImageUrl: String\n\tName: String\n\tPreMinedValue: String\n\tProofType: String\n\tSortOrder: String\n\tSponsored: String\n\tSymbol: String\n\tTotalCoinSupply: Float\n\tTotalCoinsFreeFloat: String\n\tUrl: String\n\tCoinMarketCap(Name: String, Symbol: String, CoinName: String): CoinMarketCap_Parent\n\tCoincapProfile(Name: String): find_profiles_coincap\n  }\n  \n  type find_Coin_Social {\n\tCodeRepository: Repository\n\tCryptoCompare: site_stats\n\tFacebook: Facebook_Stats\n\tGeneral: General_Stats\n\tReddit: Reddit_Stats\n\tTwitter: Twitter_Stats\n  }\n  \n  type find_ICO_list {\n\tname: String\n\tdescription: String\n\tend_time: String\n\ticowatchlist_url: String\n\timage: String\n\tstart_time: String\n\ttimezone: String\n\twebsite_link: String\n\tall_time_roi: String\n\tcoin_symbol: String\n\tprice_usd: Float\n  }\n  \n  type find_profiles_coincap {\n\taltCap: String\n\tbitnodesCount: Float\n\tbtccap: Float\n\tbtcPrice: Float\n\tcap24hrChange: Float\n\tdisplay_name: String\n\tdom: Float\n\tid: String\n\tmarket_cap: Int\n\tprice: Float\n\tprice_usd: Float\n\tstatus: String\n\tsupply: Float\n\ttotalCap: Float\n\ttype: String\n\tusdVolume: Float\n\tvolume: Float\n\tvolumeAlt: Float\n\tvolumeBtc: Float\n\tvolumeTotal: Float\n  }\n  \n  type General_Stats {\n\tCoinName: String\n\tName: String\n\tPoints: Int\n\tType: String\n  }\n  \n  type ico_categories {\n\tid: Int\n\tname: String\n  }\n\n  type ico_dates {\n\ticoEnd: String\n\ticoStart: String\n\tpreIcoEnd: String\n\tpreIcoStart: String\n  }\n  \n  type ico_details {\n\tid: ID\n\tname: String\n\tabout: String\n\tintro: String\n\tlogo: String\n\trating: Float\n\tratingProduct: Float\n\tratingProfile: Float\n\tratingTeam: Float\n\tratingVision: Float\n\ttagline: String\n\tteamIntro: String\n\turl: String\n\tcategories: [ico_categories]\n\texchanges: [ico_exchanges]\n\tfinance: ico_finance\n\tlinks: ico_links\n\tmilestones: [ico_milestones]\n\tratings: [ico_ratings]\n\tteam: [ico_team]\n\tdates: ico_dates\n  }\n  \n  type ico_exchanges {\n\tcurrency: String\n\tid: ID\n\tname: String\n\tprice: Float\n\troi: String\n  }\n  \n  type ico_finance {\n\taccept: String\n\tbonus: String\n\tdistributed: String\n\thardcap: String\n\tminimum: String\n\tprice: String\n\traised: Float\n\tsoftcap: String\n\ttoken: String\n\ttokens: String\n\ttokentype: String\n  }\n  \n  type ico_links {\n\tbitcointalk: String\n\tdiscord: String\n\tfacebook: String\n\tgithub: String\n\tmedium: String\n\treddit: String\n\tslack: String\n\ttelegram: String\n\ttwitter: String\n\twhitepaper: String\n\twww: String\n\tyoutube: String\n  }\n  \n  type ico_milestones {\n\tcontent: String\n\ttitle: String\n  }\n \n  type ico_ratings {\n\tagree: Int\n\tdate: String\n\tname: String\n\tphoto: String\n\tproduct: Int\n\tprofile: Int\n\treview: String\n\tteam: Int\n\ttitle: String\n\tvision: Int\n\tweight: String\n  }\n  \n  type ico_team {\n\tgroup: String\n\tiss: Float\n\tlinks: String\n\tphoto: String\n\ttitle: String\n  }\n  \n  type Reddit_Stats {\n\tPoints: Int\n\tactive_users: Int\n\tcomments_per_day: Float\n\tcomments_per_hour: Float\n\tcommunity_creation: Float\n\tlink: String\n\tname: String\n\tposts_per_day: Float\n\tposts_per_hour: Float\n\tsubscribers: Int\n  }\n  \n  type Repository {\n\tList: [Repository_list]\n\tPoints: Int\n  }\n  \n  type Repository_list {\n\tclose_issues: Int\n\tclosed_pull_issues: Int\n\tclosed_total_issues: Int\n\tcreated_at: Float\n\tfork: String\n\tforks: Int\n\tlanguage: String\n\tlast_push: Float\n\tlast_update: Float\n\topen_issues: Int\n\topen_pull_issues: Int\n\topen_total_issues: Int\n\tsize: Int\n\tstars: Int\n\tsubscribers: Int\n\turl: String\n  }\n  \n  type site_similaritems {\n\tFollowingType: Int\n\tFullName: String\n\tId: Int\n\tImageUrl: String\n\tName: String\n\tUrl: String\n  }\n\n  type site_stats {\n\tComments: Int\n\tFollowers: Int\n\tPageViews: Int\n\tPoints: Int\n\tPosts: Int\n\tPageViewsSplit: site_stats_pv\n\tSimilarItems: [site_similaritems]\n  }\n  \n  type site_stats_pv {\n\tAnalysis: Int\n\tCharts: Int\n\tForum: Int\n\tMarkets: Int\n\tOrderbook: Int\n\tOverview: Int\n\tTrades: Int\n  }\n\n  type source_info {\n\tdomain: String\n\ttitle: String\n\tpath: String\n  }\n\n  type Twitter_Stats {\n\tPoints: Int\n\taccount_creation: Int\n\tfavourites: Int\n\tfollowing: Int\n\tlink: String\n\tlists: Int\n\tname: String\n\tstatuses: Int\n  }\n  ';

var Find_Coin_Profiles = function Find_Coin_Profiles() {
	console.log('test resolver');
};

// The resolvers
var resolvers = {
	all_queries: { cryptoProfiles: function cryptoProfiles() {
			return [Find_Coin_Profiles];
		} }
};

// Put together a schema
var schema = makeExecutableSchema({
	typeDefs: typeDefs,
	resolvers: resolvers
});

app.use('*', (0, _cors2.default)({ origin: 'http://localhost:8000' }));

app.use('/graphql', _bodyParser2.default.json(), (0, _apolloServerExpress.graphqlExpress)({ schema: schema }));

app.get('/graphiql', (0, _apolloServerExpress.graphiqlExpress)({ endpointURL: '/graphql' })); // GUI Editor 

app.use('/', (0, _middleware.express)({ endpointUrl: '/graphql' }));

if (process.env.NODE_ENV === 'production') {
	//This will serve production React Enviroment

	app.use(_express2.default.static('client/build'));

	var path = require('path');
	app.get('*', function (req, res) {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

// Setting up heroku - Dynamic Binding
var PORT = process.env.PORT || 5000;
app.listen(PORT);