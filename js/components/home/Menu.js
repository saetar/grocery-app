var React = require('react');
var ReactNative = require('react-native');

var {FBLogin, FBLoginManager} = require('react-native-facebook-login');

var Text = ReactNative.Text;
var View = ReactNative.View;
var Image = ReactNative.Image;
var StyleSheet = ReactNative.StyleSheet;

class Menu extends React.Component {

	logout () {
		this.props._updateCredentials(null);
	}

	onError (error) {
		console.log(error);
	}

	constructor (props) {
		super(props);
	}

	render () {
		var _this = this;
		if (this.props.menuOpen) {
			return (
				<View style={ styles.menuWrapper }>
					<FBLogin 
						style={ styles.logoutButton } 						
						onLogout={ () => _this.logout() }	/>
					<Text>
						Hello, { this.props.user.firstName } { this.props.user.lastName }
					</Text>
				</View>
			);
		}
		else {
			return null;
		}
	}
}

const styles = StyleSheet.create({
	menuWrapper: {
		marginTop: 60,
		flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: '#CAF6C0',
    padding: 20,
    borderWidth: 1,
    borderColor: 'lightgray',
	},
	logoutButton: {

	},
});

module.exports = Menu;