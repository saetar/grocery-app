import React from 'react';
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
			console.log("IMAGE URL", this.props.fbUser.picture.data.url);
			return (
				<View style={ styles.menuWrapper }>
					<Text style={ styles.text } >
						Hello, { this.props.user.firstName } { this.props.user.lastName }
					</Text>
					<Image 
						style={ styles.picture }
						source={ {uri: this.props.fbUser.picture.data.url} } />
					<FBLogin 
						style={ styles.logoutButton } 						
						onLogout={ () => _this.logout() }	/>
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
		paddingTop: 60,
		flex: 1,
    width: window.width,
    height: window.height,
    padding: 20,
    borderWidth: 1,
    borderColor: 'lightgray',
    backgroundColor: 'gray',
	},
	text: {
		color: 'white',
		fontSize: 20,
		alignSelf: 'center',
	},
	picture: {
		height: 50,
		width: 50,
		alignSelf: 'center',
		margin: 10,
	},
	logoutButton: {
		alignSelf: 'center',
	},
});

module.exports = Menu;