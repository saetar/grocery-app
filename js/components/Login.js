var React = require('react');
var ReactNative = require('react-native');

var StyleSheet = ReactNative.StyleSheet;
var View = ReactNative.View;
var Image = ReactNative.Image;
var Text = ReactNative.Text;

var {FBLogin, FBLoginManager} = require('react-native-facebook-login');

class Login extends React.Component {

	login (data) {
		this.props._updateCredentials(data.credentials);
	}

	logout () {
		this.props._updateCredentials(null);
	}

	onLoginNotFound () {
		console.log("Login not found");
	}

	onError (error) {
		console.log(error);
	}

	constructor (props) { 
		super(props);		
	}

	render () {
		var _this = this;
		return (			
			<Image 
				style={ styles.loginWrapper }
				source={ require('./../img/background.jpg') } >
				<View style={ styles.wrapper } >
					<Text style={ styles.title } >
						Log in with Facebook
					</Text>
					<FBLogin 
						onLogin={ (data) => _this.login(data) } 
						onLogout={ () => _this.logout() } 
						onLoginFound={ (data) => _this.login(data) } 
						onLoginNotFound={ () => _this.onLoginNotFound() }	/>
				</View>
			</Image>
		);
	}
}

const styles = StyleSheet.create({
	loginWrapper: {
		marginTop: 0,
		alignItems: 'center',
    justifyContent:'center',	
    width: null,
    height: null,
    flex: 1,
	},
	wrapper: {
		marginTop: 60,
		height: 550,
		width: 300,
		backgroundColor: 'rgba(80, 80, 80, 0.5)',
		alignItems: 'center',
    justifyContent:'center',	
	},
	title: {
		fontWeight: '200',
		fontSize: 32,
		color: 'white',
	},
});

module.exports = Login;