import React, { Component } from 'react';
import ReactNative from 'react-native';

import Button from 'react-native-button';

var StyleSheet = ReactNative.StyleSheet;
var View = ReactNative.View;
var TextInput = ReactNative.TextInput;

import DataLoader from './../../../data/DataLoader';

class AddScreen extends Component {
	constructor (props) {
		super(props);
		this.state = {
			store: '',
			title: '',
			total: 0,
			details: '',
			date: new Date(),
			storeChanged: false,
			titleChanged: false,
			totalChanged: false,
			detailsChanged: false,
			dateChanged: false,
		};
		this._onTitleChange = this._onTitleChange.bind(this);
		this._submitGroceryList = this._submitGroceryList.bind(this);
	}

	_onTitleChange (text) {
		this.setState({
			title: text,
			titleChanged: true,
		});
	}

	_onDetailChange (text) {
		this.setState({
			details: text,
			detailsChanged: true,
		});
	}

	_onStoreChange (text) {
		this.setState({
			store: text,
			storeChanged: true,
		});
	}

	getTitleInput () {
		if (this.state.titleChanged) {
			return (
				<TextInput
					autoCapitalize='words'
					autoFocus={ true }
					onChangeText={ (text) => this._onTitleChange(text) }
					style={ [styles.input, styles.titleInput] }
					value={ this.state.title } />
			);
		}
	}

	_submitGroceryList () {
		var title = this.state.title,
				store = this.state.store,
			details = this.state.details;
			_this 	= this;

		DataLoader.postGroceryList(this.props.user.userId, title, store, details, function (data) {
			_this.props.groceryListAdded(data);
		});
	}

	render () {
		return (
			<View style={ styles.addScreenWrapper } >
				<TextInput
					autoCapitalize='words'
					autoFocus={ true }
					onChangeText={ (text) => this._onTitleChange(text) }
					style={ [styles.input, styles.titleInput] }
					value={ this.state.title }
					placeholder='Title' />

				<TextInput
					onChangeText={ (text) => this._onStoreChange(text) }
					style={ [styles.input, styles.storeInput] }
					value={ this.state.store }
					placeholder='Store' />

				<TextInput
					onChangeText={ (text) => this._onDetailChange(text) }
					style={ [styles.input, styles.detailInput] }
					value={ this.state.details }
					numberOfLines={ 2 }
					multiline={ true }
					editable={ true }
					placeholder='Enter details here...' />
				<Button
					containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'white'}}
                   style={{fontSize: 20, color: 'green'}}
					onPress={ () => this._submitGroceryList() } >
					Submit
				</Button>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	addScreenWrapper: {
		marginTop: 70,
		padding: 10,
	},
	input: {
		borderColor: 'dimgray',
		minHeight: 30,
		borderWidth: 1,
		borderRadius: 4,
		margin: 5,
		padding: 5,
		color: 'dimgray'
	},
	titleInput: {
		fontWeight: 'bold',
	},
	storeInput: {
	},
	detailInput: {
		height: 80,
	},
	submitButton: {
		fontSize: 20,
		color: 'red',
	},
});

module.exports = AddScreen;
