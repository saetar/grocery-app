var React = require('react');
var ReactNative = require('react-native');

var Component = React.Component;
var View = ReactNative.View;
var Text = ReactNative.Text;
var StyleSheet = ReactNative.StyleSheet;
var TouchableHighlight = ReactNative.TouchableHighlight;

var RightArrow = require('./../../../util-components/RightArrow');
// var DetailView = require('./detail/DetailView');

class List extends Component {

	 _handleBackPress () {
    this.props._handleBackPress();
  }

  _handleNextPress () {
    this.props._handleNextPress();
  }

  constructor(props) {
  	super(props);
  	this._handleNextPress.bind(this);
  	this._handleBackPress.bind(this);
  }

	render () {
		return (
			<TouchableHighlight onPress={ () => this._handleNextPress() } >
				<View style={ styles.titleWrapper } >
					<View style={ styles.topPart } >
						<Text style={ styles.title } >
							{ this.props.item.name }
						</Text>
						<Text style={ styles.store } >
							${ this.props.item.price.toFixed(2) } <RightArrow />
						</Text>						
					</View>
				</View>
			</TouchableHighlight>
		);
	}
}

const styles = StyleSheet.create({
	titleWrapper: {
		padding: 10,
		borderBottomWidth: 1,
		borderColor: 'dimgrey',
		minHeight: 70,
	},
	topPart: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	title: {
		fontWeight: '700',
	},
	store: {
		fontWeight: '200',
	},
	date: {
		color: 'dimgrey',
	},
	bottomPart: {
		marginTop: 5,
	},
	text: {
		textAlign: 'left',
		fontWeight: '100',
		color: 'dimgrey',
	}
});

module.exports = List;