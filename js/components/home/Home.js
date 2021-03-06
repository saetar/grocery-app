import React from 'react';
import ReactNative, { ScrollView, StyleSheet, ListView, View }
 	from 'react-native';
import update from 'react-addons-update';

import HomeList from './HomeList';
import DataLoader from './../../data/DataLoader';
import DetailView from './list/detail/DetailView';
import List from './list/List';
import LoadingScreen from './../util-components/LoadingScreen';
import SideMenu from 'react-native-side-menu';
import Menu from './Menu';
import NoListsYet from './../util-components/NoListsYet';
import SortingUtils from './../../utils/SortingUtils';


class Home extends React.Component {

	_handleBackPress () {
		this.props.navigator.pop();
		this.refreshList( () => { console.log("Tryna refresh") } );
	}

	_handleNextPress (nextRoute) {
		this.props.navigator.push(nextRoute);
	}

	_deletedList (listId) {
    this.setState({
      refreshing: true,
    });
    var _this = this;
    console.log("Yo look here tho", listId);
    console.log("databefore", this.state.data);
    DataLoader.deleteList(listId, () => {
      var newData = _this.state.data.filter( (i) => i.id === listId );
      this.setState({
        data: newData,
        refreshing: false,
      });
    });
    console.log("dataafter", this.state.data);
	}

	refreshList (cb) {
		if (this.initial) {
			this.setState({
				refreshing: true,
				intial: false,
			});
		}
		var _this = this;
		DataLoader.fetchUserLists(this.props.user.userId,
		  (responseJson) => {
				_this.setState({
					data: responseJson.error ? [] : responseJson,
					refreshing: false,
				}, () => {
					cb();
				});
			});
	}

	componentDidMount () {
		this.refreshList( () => {} );
	}

	constructor (props) {
		super(props);
		this.state = {
			data: [],
			refreshing: false,
			initial: true,
		};
		this.refreshList = this.refreshList.bind(this);
    this._deletedList = this._deletedList.bind(this);
		this._handleNextPress = this._handleNextPress.bind(this);
		this._handleBackPress = this._handleBackPress.bind(this);
	}

	render () {
		if (this.state.refreshing) {
			console.log("I want to render loadingscreen");
			return (
				<LoadingScreen />
			)
		}
		if (this.state.data.length === 0) {
			if (this.props.user) {
				console.log("I want to render nolistsyet");
				return (
					<NoListsYet />
				);
			} else {
				console.log("I want to render loadingscreen");
				return (
					<LoadingScreen />
				);
			}
		}
		else if (this.state.data.length) {
			console.log("I want to render homelist");
			return (
				<HomeList
					ref="home"
					_handleNextPress={ this._handleNextPress }
					_handleBackPress={ this._handleBackPress }
					deletedList={ this._deletedList }
					data={ this.state.data.sort(SortingUtils.sortByCreateDate) }
					onRefresh={ this.refreshList } />
			);
		}
		console.log("I'm returning nothing", this.state.data);
	}

}

const styles = StyleSheet.create({
	loading: {

	},
	loadingText: {

	},
});

module.exports = Home;
