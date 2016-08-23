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

class Home extends React.Component {

	_handleBackPress () {
		this.props.navigator.pop();
	}

	_handleNextPress (nextRoute) {
		this.props.navigator.push(nextRoute);
	}	

	refreshList (cb) {
		DataLoader.fetchUserLists(this.props.user.fbId,
		  (responseJson) => {
				this.setState({
					data: responseJson,
				}, () => {
					cb();
				});
			});
	}  

	constructor (props) {
		super(props);
		this.refreshList = this.refreshList.bind(this);
		this.refreshList( () => {} );
		this._handleNextPress = this._handleNextPress.bind(this);
		this._handleBackPress = this._handleBackPress.bind(this);
		this.state = {
			data: [],
		};
	}

	render () {	
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
		else {
			return (
				<HomeList 
					_handleNextPress={ this._handleNextPress }
					_handleBackPress={ this._handleBackPress }
					data={ this.state.data } 
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