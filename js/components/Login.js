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
						Make buying groceries easy and sustainable
					</Text>
					<Image 
						style={ styles.login }
						source={ require('./../img/cutesnail.png') }
						resizeMode={ Image.resizeMode.stretch } >
					</Image>
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
		// alignItems: 'center',
    // justifyContent:'center',	
    width: null,
    height: null,
    flex: 1,
	},
	wrapper: {
		marginTop: 60,
		height: 580,
		width: 340,
		margin: 15,
		backgroundColor: 'rgba(80, 80, 80, 0.5)',
		alignItems: 'center',
    // justifyContent:'center',	
	},
	login: {
		// fontWeight: '200',
		// fontSize: 32,
		// color: 'white',
		height: 200,
		width: 300,
		margin: 20,
	},
	title: {
		marginTop: 30,
		fontWeight: '400',
		fontSize: 30,
		color: 'white',
		justifyContent: 'center',
	}
});

module.exports = Login;