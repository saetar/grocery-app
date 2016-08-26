var React = require('react');
var ReactNative = require('react-native');

var ScrollView = ReactNative.ScrollView;
var StyleSheet = ReactNative.StyleSheet;
var ListView = ReactNative.ListView;
var View = ReactNative.View;
var HomeList = require('./HomeList');
var DataLoader = require('./../../data/DataLoader');
var DetailView = require('./list/detail/DetailView');
var List = require('./list/List');
var LoadingScreen = require('./../util-components/LoadingScreen');
var SideMenu = require('react-native-side-menu');
var Menu = require('./Menu');
var NoListsYet = require('./../util-components/NoListsYet');
var SortingUtils = require('./../../utils/SortingUtils');


class Home extends React.Component {

	_handleBackPress () {
		this.props.navigator.pop();
		this.refreshList( () => {} )
	}

	_handleNextPress (nextRoute) {
		this.props.navigator.push(nextRoute);
	}	

	refreshList (cb) {
		if (this.initial) {
			this.setState({
				refreshing: true,
				intial: false,
			});
		}
		DataLoader.fetchUserLists(this.props.user.fbId,
		  (responseJson) => {
				this.setState({
					data: responseJson,
					refreshing: false,
				}, () => {
					cb();
				});
			});
	}  

	componentDidMount () {
		this.refreshList( () => {} );
	}

	constructor (props) {
		super(props);
		this.state = {
			data: [],
			refreshing: false,
			initial: true,
		};
		this.refreshList = this.refreshList.bind(this);
		// this.refreshList( () => {} );
		this._handleNextPress = this._handleNextPress.bind(this);
		this._handleBackPress = this._handleBackPress.bind(this);
	}

	render () {	
		if (this.state.refreshing) {
			return (
				<LoadingScreen />
			)
		}
		if (this.state.data.length === 0) {
			if (this.props.user) {
				return (					
					<NoListsYet />					
				);
			} else {
				return (
					<LoadingScreen />
				);
			}
		}
		else if (this.state.data.length) {
			return (
				<HomeList 
					ref="home"
					_handleNextPress={ this._handleNextPress }
					_handleBackPress={ this._handleBackPress }
					data={ this.state.data.sort(SortingUtils.sortByCreateDate) } 
					onRefresh={ this.refreshList } />
			);
		}
	}

}

const styles = StyleSheet.create({
	loading: {

	},
	loadingText: {

	},
});

module.exports = Home;