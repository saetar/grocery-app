var React = require('react');
var ReactNative = require('react-native');

var Component = React.Component;
var View = ReactNative.View;
var NavigatorIOS = ReactNative.NavigatorIOS;

var Home = require('./components/home/Home');
var Login = require('./components/Login');
var Boring = require('./Boring');
var AddScreen = require('./components/home/add/AddScreen');
var DataLoader = require('./data/DataLoader');

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
		if (this.state.user && this.state.user.fbId) {
			return ({
				component: AddScreen,
				title: 'Add New List',
				rightButtonTitle: '',
				passProps: {
					fbId: this.state.user.fbId,
					groceryListAdded: this._groceryListAdded,
				}
			});
		}
		return null;
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
			onLeftButtonPress: 
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

	 submitUser (user) {
  	if (user) {
  		var _this = this;
			var names = user.name.split(' ');
			var firstName = names[0];
			var lastName = names[names.length - 1];
			var fbId = user.id;
			DataLoader.addUser(firstName, lastName, fbId, 
				(user) => _this._updateUser(user));
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
					_this.submitUser(user);
				});
			});
		}
	}

	_handleRightButtonPress = () => {
		_this = this;
		_this.refs.nav.push(this.getAddListScreenRoute());
	}

	constructor (props) {
		super(props);
		var _this = this;
		this._updateCredentials = this._updateCredentials.bind(this);
		this._updateUser = this._updateUser.bind(this);
		this.state = {
			credentials: null,
			user: null,
			initialRoute: this.getLoginRoute(),
			picture: null,
		}
	}

  render() {
    return (
	      <NavigatorIOS
	        initialRoute={ this.state.initialRoute }
	        ref='nav'
	        style={{flex: 1}}
	        rightButtonTile='' />
    );
  }
}

module.exports = NavBar;
