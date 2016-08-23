var React = require('react');
var ReactNative = require('react-native');

var Button = require('react-native-button');

var StyleSheet = ReactNative.StyleSheet;
var View = ReactNative.View;
var TextInput = ReactNative.TextInput;
var Text = ReactNative.Text;

var DataLoader = require('./../../../../../data/DataLoader');

class AddItem extends React.Component{
	constructor (props) {
		super(props);
		this.state = {
			name: '',
			price: '',
			category: '',
			notes: '',
			date: new Date(),
			nameChanged: false,
			priceChanged: false,
			notesChanged: false,
			categoryChanged: false,
		};
		this._onNameChange = this._onNameChange.bind(this);
		this._submitItemToList = this._submitItemToList.bind(this);
	}

	_onNameChange (text) {
		this.setState({
			name: text,
			nameChanged: true,
		});
	}

	_onNotesChange (text) {
		this.setState({
			notes: text,
			notesChanged: true,
		});
	}

	_onCategoryChange (text) {
		this.setState({
			category: text,
			categoryChanged: true,
		});
	}

	_onPriceChange (text) {
		this.setState({
			price: text,
			priceChanged: true,
		});
	}

	_submitItemToList () {
		var _this = this;
		DataLoader.addItemToList(this.props.listId, this.state, function (data) {
			_this.props.groceryListAdded(data);
		});
	}

	render () {
		return (
			<View style={ styles.addScreenWrapper } >
				<TextInput
					autoCapitalize='words'
					autoFocus={ true }
					onChangeText={ (text) => this._onNameChange(text) }
					style={ [styles.input, styles.titleInput] }
					value={ this.state.name }
					placeholder='Name' /> 

				<Text>$</Text><TextInput
					onChangeText={ (text) => this._onPriceChange(text) }
					style={ [styles.input, styles.storeInput] }
					value={ this.state.price }
					placeholder='Price'
					keyboardType='numbers-and-punctuation' />

				<TextInput
					onChangeText={ (text) => this._onCategoryChange(text) }
					style={ [styles.input, styles.storeInput] }
					value={ this.state.category } 
					editable={ true }
					placeholder='Category' />

				<TextInput
					onChangeText={ (text) => this._onNotesChange(text) }
					style={ [styles.input, styles.detailInput] }
					value={ this.state.notes } 
					numberOfLines={ 2 }
					multiline={ true }
					editable={ true }
					placeholder='Add notes here' />
				<Button 
					containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'white'}}
                   style={{fontSize: 20, color: 'green'}}
					onPress={ () => this._submitItemToList() } >
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

module.exports = AddItem;