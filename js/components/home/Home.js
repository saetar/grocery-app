var React = require('react');
var ReactNative = require('react-native');

var ScrollView = ReactNative.ScrollView;
var StyleSheet = ReactNative.StyleSheet;
var ListView = ReactNative.ListView;
var View = ReactNative.View;
var HomeList = require('./HomeList');
var DataLoader = require('./../../data/DataLoader');
var DetailView = require('./list/detail/DetailView');
var Item = require('./list/Item');
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

	toggleMenuOpen () {
		this.setState({
			menuOpen: !this.state.menuOpen,
		});
	}

	updateMenuState(isOpen) {
    this.setState({ 
    	menuOpen: isOpen,
    });
  }

	constructor (props) {
		super(props);
		this.refreshList = this.refreshList.bind(this);
		this.refreshList( () => {} );
		this._handleNextPress = this._handleNextPress.bind(this);
		this._handleBackPress = this._handleBackPress.bind(this);
		this.toggleMenuOpen = this.toggleMenuOpen.bind(this);
		this.state = {
			data: [],
			menuOpen: false,
		};
	}

	render () {	
		const menu = <Menu 
				menuOpen={ this.state.menuOpen } 
				_updateCredentials={ this.props._updateCredentials }
				_updateUser={ this._updateUser }
				user={ this.props.user } />;
		if (this.state.data.length === 0) {
			if (this.props.user) {
				return (
					<SideMenu
						menu={ menu }
						isOpen={ this.state.menuOpen }
						onChange={ (menuOpen) => this.updateMenuState(menuOpen) } >
						<NoListsYet />
					</SideMenu>
				);
			} else {
				return (
					<LoadingScreen />
				);
			}
		}
		else {
			return (
				<SideMenu 
					menu={ menu } 
					isOpen={ this.state.menuOpen } 
					onChange={ (menuOpen) => this.updateMenuState(menuOpen) } >
					<HomeList 
						_handleNextPress={ this._handleNextPress }
						_handleBackPress={ this._handleBackPress }
						data={ this.state.data } 
						onRefresh={ this.refreshList } />
				</SideMenu>
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