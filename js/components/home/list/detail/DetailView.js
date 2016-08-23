var React = require('react');
var ReactNative = require('react-native');

var Button = require('react-native-button');

var View = ReactNative.View;
var Text = ReactNative.Text;
var StyleSheet = ReactNative.StyleSheet;
var ListView = ReactNative.ListView;
var RefreshControl = ReactNative.RefreshControl;
var Image = ReactNative.Image;

var ListItem = require('./ListItem');
var DataLoader = require('./../../../../data/DataLoader');

class DetailView extends React.Component {

	_deleteGroceryList(cb) {
		DataLoader.deleteList(this.props.id, cb);
	}

	updateData(data) {
		var dataSource = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});
		this.setState({
			refreshing: false,
			datasource: dataSource.cloneWithRows(data["_2"]),
		});
	}

	componentDidMount() {
		this._getGroceryList();
	}

	_getGroceryList() {
		this.setState({
			refreshing: true,
		});
		var _this = this;
		DataLoader.getList(this.props.id, (data) => {
			_this.updateData(data);
		});
	}

	getListItem (item, sectionId) {
		var _this = this;
		return (
			<ListItem
				_handleBackPress={ _this.props.navigator.pop() }
				item={ item } />
		);
	}

	constructor (props) {
		super(props);
		this._deleteGroceryList = this._deleteGroceryList.bind(this);
		this._getGroceryList = this._getGroceryList.bind(this);
		this.updateData = this.updateData.bind(this);
		this.getListItem = this.getListItem.bind(this);
		this.state = {
			refreshing: false,
			datasource: null,
		};
	}

	render() {
		if (!this.state.datasource) {
			return (
				<View style={ styles.wrapper } >
					<Text style={ styles.store } >
						{ this.props.store }
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
		return (
			<View style={ styles.wrapper } >
				<Text style={ styles.store } >
					{ this.props.store }
				</Text>
				<ListView 
					style={ styles.listViewList }
					dataSource={ this.state.datasource } 
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