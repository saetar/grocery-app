var React = require('react');
var ReactNative = require('react-native');

var StyleSheet = ReactNative.StyleSheet;
var ListView = ReactNative.ListView;
var RefreshControl = ReactNative.RefreshControl;
var View = ReactNative.View;


var Item = require('./list/Item');
var DetailView = require('./list/detail/DetailView');

class HomeList extends React.Component {
	getListItemView (item, sectionId) {	
		const nextRoute = {
			component: DetailView,
			title: item.title,
			passProps: {
				store: item.store,
				total: item.total,
				date: item.date,
				title: item.title,
			},
			rightButtonTitle: '',
		}
		return (
			<Item
				_handleNextPress={ () => this.props._handleNextPress(nextRoute) }
				_handleBackPress={ () => this.props._handleBackPress() }
				title={ item.title }
				store={ item.store } 
				index={ sectionId } 
				key={ sectionId }
				total={ item.total }
				details={ item.details }
				createDate={ item.createDate } />
		);
	}

	onRefresh () {
		this.setState({ refreshing: true, });
		this.props.onRefresh( () => {
			this.setState({
				refreshing: false,
				dataSource: this.state.dataSource.cloneWithRows( this.props.data ),
			}, () => {
				console.log(this.state);
				console.log("Yo this is my data brah", this.props.data);
			});
		});
	}

	constructor (props) {
		super(props);
		// var dataSource = new ListView.DataSource(Data.list);
		var dataSource = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});
		this.state = {
			dataSource: dataSource.cloneWithRows( this.props.data ),
			refreshing: false,
		}
		this.onRefresh = this.onRefresh.bind(this);
	}

	render () {		
		return (
			<ListView 
				style={ styles.listViewList }
				dataSource={ this.state.dataSource } 
				renderRow={ (item, sectionId) => this.getListItemView(item, sectionId) }
				refreshControl={
					<RefreshControl
						refreshing={ this.state.refreshing }
						onRefresh={ () => this.onRefresh() } />
				} />
		);
	}
}

const styles = StyleSheet.create({
	listViewList: {
		flex: 1,
		marginTop: 65,
	},
});

module.exports = HomeList;