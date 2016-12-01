import React, { Component } from 'react';
import ReactNative, { View, Text, StyleSheet, ListView, RefreshControl, Image }
	from 'react-native';

import Button from 'react-native-button';
import Swipeout from 'react-native-swipeout';

import ListItem from './ListItem';
import DataLoader from './../../../../data/DataLoader';
import NoListsYet from './../../../util-components/NoListsYet';

class DetailView extends Component {

	_deleteGroceryList() {
		var _this = this;
		DataLoader.deleteList(this.props.list.id, () => {
			_this.props.deletedList(_this.props.list.id);
			_this.props._handleBackPress();
		});
	}

	_deleteItem (itemId) {
		var _this = this;
		DataLoader.deleteItem(itemId, () => {
			var newData = _this.state.data.map( (i) => i.id === itemId ? null : i ).filter(n => n);
			_this.updateData(newData);
		});
	}

	updateData(data) {
		if (data.error) {
			console.log("data has error");
			this.setState({
				isEmpty: true,
				refreshing: false,
			});
		}
		else if (data.length) {
			console.log("data had length");
			var dataSource = new ListView.DataSource({
				rowHasChanged: (r1, r2) => r1 !== r2
			});
			this.setState({
				refreshing: false,
				datasource: dataSource.cloneWithRows(data),
				data: data,
			});
		}
	}

	componentDidMount() {
		this._getGroceryList();
	}

	_getGroceryList() {
		this.setState({
			refreshing: true,
		});
		console.log("HERE YA DICKHEAD", this.props.list.id);
		var _this = this;
		DataLoader.getListItems(this.props.list.id, (data) => {
			_this.updateData(data);
		});
	}

	nextPress() {

	}

	getListItem (item, sectionId) {
		var _this = this;
		const btns = [
			{
				text: 'Delete',
				backgroundColor: 'red',
				onPress: () => _this._deleteItem(item.id)
			}
		]
		return (
			<Swipeout
				right={ btns }
        autoClose='true'
        backgroundColor= 'transparent' >
				<ListItem
					_handleBackPress={ _this.props._handleBackPress }
					_handleNextPress={ () => _this.nextPress() }
					item={ item } />
			</Swipeout>
		);
	}

	constructor (props) {
		super(props);
		this.state = {
			refreshing: true,
			datasource: null,
			isEmpty: false,
			data: null,
		};
		this._deleteGroceryList = this._deleteGroceryList.bind(this);
		this._getGroceryList = this._getGroceryList.bind(this);
		this.updateData = this.updateData.bind(this);
		this.getListItem = this.getListItem.bind(this);
	}

	render () {
		if (this.state.refreshing) {
			console.log("We refreshing", this.props.list);
			return (
				<View style={ styles.wrapper } >
					<Text style={ styles.store } >
						{ this.props.list.store }
					</Text>
					<Image
						style={ styles.loader }
						source={ require('./../../../../img/loading.gif') } />
					<Button
						onPress={ () => this._deleteGroceryList() }>
						Delete
					</Button>
				</View>
			);
		}
		else if (this.state.isEmpty) {
			console.log("Rendering this shit");
			return (
				<View style={ styles.wrapper } >
					<Text style={ styles.store } >
						{ this.props.list.store }
					</Text>
					<NoListsYet />
					<Button
						onPress={ () => this._deleteGroceryList() } >
						Delete
					</Button>
				</View>
			);
		}
		else {
			console.log("Returning teh bullshit");
			return (
				<View style={ styles.wrapper } >
					<Text style={ styles.store } >
						{ this.props.list.store }
					</Text>
					<ListView
						style={ styles.listViewList }
						dataSource={ this.state.datasource }
						enableEmptySections={ true }
						renderRow={ (item, sectionId) => this.getListItem(item, sectionId) }
						refreshControl={
							<RefreshControl
								refreshing={ this.state.refreshing }
								onRefresh={ () => this._getGroceryList() } />
						} />
					<Button
						onPress={ () => this._deleteGroceryList() }>
						Delete
					</Button>
				</View>
			);
		}
	}
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		marginTop: 70,
		padding: 10,
	},
	loader: {
		width: 100,
		height: 100,
		alignSelf: 'center',
	},
	store: {
		fontWeight: '100',
		fontSize: 30,
	},
});

module.exports = DetailView;
