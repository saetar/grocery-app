var React = require('react');
var ReactNative = require('react-native');

var StyleSheet = ReactNative.StyleSheet;
var ListView = ReactNative.ListView;
var RefreshControl = ReactNative.RefreshControl;
var View = ReactNative.View;

var AddItem = require('./list/detail/add/AddItem');
var List = require('./list/List');
var DetailView = require('./list/detail/DetailView');

class HomeList extends React.Component {
	getListItemView (item, sectionId) {	
		const nextRoute = {
			component: DetailView,
			title: item.title,
			passProps: {
				list: item,
				_handleBackPress: this.props._handleBackPress,
			},
			rightButtonTitle: 'Add',
			onRightButtonPress: () => this._handleRightButtonPress(item.id),
		}
		return (
			<List
				_handleNextPress={ () => this.props._handleNextPress(nextRoute) }
				_handleBackPress={ () => this.props._handleBackPress() }
				list={ item } 
				index={ sectionId } 
				key={ sectionId } />
		);
	}

	groceryListItemAdded (data) {
		this.props._handleBackPress();
		this.onRefresh();
	}

	onRefresh () {
		var _this = this;
		this.setState({ refreshing: true, });
		this.props.onRefresh( () => {
			_this.setState({
				refreshing: false,
				dataSource: this.state.dataSource.cloneWithRows( this.props.data ),
			}, () => {
			});
		});
	}

	_handleRightButtonPress (id) {
		this.props._handleNextPress({
			component: AddItem,
			title: 'Add an item',
			passProps: {
				listId: id,				
				groceryListItemAdded: this.groceryListItemAdded,
			},
		});
	}

	constructor (props) {
		super(props);
		var dataSource = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});
		this.state = {
			dataSource: dataSource.cloneWithRows( this.props.data ),
			refreshing: false,
		}
		this.onRefresh = this.onRefresh.bind(this);
		this._handleRightButtonPress = this._handleRightButtonPress.bind(this);
		this.groceryListItemAdded = this.groceryListItemAdded.bind(this);
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