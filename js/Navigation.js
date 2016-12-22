import React from 'react';
var ReactNative = require('react-native');

var SideMenu = require('react-native-side-menu');

var Component = React.Component;
var View = ReactNative.View;
var NavigatorIOS = ReactNative.NavigatorIOS;

var Home = require('./components/home/Home');
var Login = require('./components/Login');
var Boring = require('./Boring');
var AddScreen = require('./components/home/add/AddScreen');
var DataLoader = require('./data/DataLoader');
var Menu = require('./components/home/Menu');

class NavBar extends Component {

	getLoginRoute () {
		var _this = this;
		return ({
			component: Login,
			title: 'Login',
			rightButtonTitle: '',
			passProps: { _updateCredentials: _this._updateCredentials },
		});
	}

	getAddListScreenRoute () {
	//	if (this.state.user && this.state.user.fbId) {
			return ({
				component: AddScreen,
				title: 'Add New List',
				rightButtonTitle: '',
				passProps: {
					user: this.state.user,
					groceryListAdded: this._groceryListAdded,
				}
			});
		// }
		// return null;
	}

	_groceryListAdded = (data) => {
		this.refs.nav.pop();
	}

	getHomeRoute () {
		var _this = this;
		return ({
			component: Home,
			title: 'Home',
			rightButtonTitle: '+',
			onRightButtonPress: this._handleRightButtonPress,
			onLeftButtonPress:  () => {
				this.setState({
					menuOpen: !this.state.menuOpen,
				});
			},
			leftButtonTitle: 'Menu',
			passProps: {
				credentials: _this.state.credentials,
				user: _this.state.user,
				_updateUser: _this._updateUser,
				_updateCredentials: _this._updateCredentials,
			}
		});
	}

	getFBUser (cb) {
		DataLoader.getFBUserInformation(
			this.state.credentials.token,
			(user) => cb(user));
	}

	_updateUser (user) {
		var _this = this;
		this.setState({
			user: user,
		}, () => {
			if (user) {
				_this.refs.nav.replace(_this.getHomeRoute());
			} else {
				_this.refs.nav.replace(_this.getLoginRoute());
			}
		});
	}

	 submitUser (user, credentials) {
  	if (user) {
  		var _this = this;
			var names = user.name.split(' ');
			var firstName = names[0];
			var lastName = names[names.length - 1];
			var email = user.email;
			var fbId = user.id;
			var token = credentials.token;
			DataLoader.loginOrAddUser(firstName, lastName, fbId, email, token,
				(user) => {
					console.log("user", user);
					_this._updateUser(user);
				});
		}
  }

	_updateCredentials (credentials) {
		var _this = this;
		if (credentials == null || credentials.error) {
			this.refs.nav.replace(this.getLoginRoute());
		}
		else {
			this.setState({
				credentials: credentials,
			}, () => {
				_this.getFBUser( (user) => {
					_this.setState({
						fbUser: user,
					});
					_this.submitUser(user, credentials);
				});
			});
		}
	}

	_handleRightButtonPress = () => {
		_this = this;
		_this.refs.nav.push(this.getAddListScreenRoute());
	}

	updateMenuState(isOpen) {
    this.setState({
    	menuOpen: isOpen,
    });
  }


	toggleMenuOpen () {
		this.setState({
			menuOpen: !this.state.menuOpen,
		});
	}

	constructor (props) {
		super(props);
		var _this = this;
		this._updateCredentials = this._updateCredentials.bind(this);
		this._updateUser = this._updateUser.bind(this);
		this.state = {
			credentials: null,
			user: null,
			fbUser: null,
			initialRoute: this.getLoginRoute(),
			picture: null,
			menuOpen: false,
		}
	}

  render() {
  	const menu = <Menu
				menuOpen={ this.state.menuOpen }
				_updateCredentials={ this._updateCredentials }
				_updateUser={ this._updateUser }
				user={ this.state.user }
				fbUser={ this.state.fbUser } />;
    return (
    	<SideMenu
						menu={ menu }
						isOpen={ this.state.menuOpen }
						onChange={ (menuOpen) => this.updateMenuState(menuOpen) } >
	      <NavigatorIOS
	        initialRoute={ this.state.initialRoute }
	        ref='nav'
	        style={{flex: 1}}
	        rightButtonTile='' />
	    </SideMenu>
    );
  }
}

module.exports = NavBar;
