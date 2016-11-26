import React, { Component } from 'react';
import ReactNative, { StyleSheet, View, Image, Text } from 'react-native';

import { FBLogin, FBLoginManager } from 'react-native-facebook-login';

class Login extends React.Component {

	login (data) {
		console.log("Data in Login", data);
		this.props._updateCredentials(data.credentials);
	}

	logout () {
		this.props._updateCredentials(null);
	}

	onLoginNotFound (data) {
		console.log("Login not found", data);
	}

	onError (error) {
		console.log("ERROdkfsR", error);
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
					<FBLogin
						onError={ (error) => _this.onError(error) }
						onLogin={ (data) => _this.login(data) }
						onLogout={ () => _this.logout() }
						onLoginFound={ (data) => _this.login(data) }
						onLoginNotFound={ (data) => _this.onLoginNotFound(data) }
						style={ styles.fblogin }	/>
						<Image
							style={ styles.login }
							source={ require('./../img/cutesnail.png') }
							resizeMode={ Image.resizeMode.stretch } >
						</Image>
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
	fblogin: {
		margin: 10,
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
