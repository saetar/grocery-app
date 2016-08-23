var React = require('react');
var ReactNative = require('react-native');

var Component = React.Component;
var View = ReactNative.View;
var Text = ReactNative.Text;
var StyleSheet = ReactNative.StyleSheet;
var TouchableHighlight = ReactNative.TouchableHighlight;

var RightArrow = require('./../../util-components/RightArrow');
var DetailView = require('./detail/DetailView');

class List extends Component {

	 _handleBackPress () {
    this.props._handleBackPress();
  }

  _handleNextPress () {
    this.props._handleNextPress();
  }

  constructor (props) {
  	super(props);
  	var created = new Date(this.props.createDate);
  	this.state = {
  		created: created.toDateString(),
  	}
  }

	render () {
		return (
			<TouchableHighlight onPress={ () => this._handleNextPress() } >
				<View style={ styles.titleWrapper } >
					<View style={ styles.topPart } >
						<Text style={ styles.title } >
							{ this.props.title }
						</Text>
						<Text style={ styles.store } >
							{ this.props.store }
						</Text>
						<Text style={ styles.date } >
							{ this.state.created } <RightArrow />
						</Text>
					</View>
					<View style={ styles.bottomPart } >
						<Text style={ styles.text }>
							{ this.props.details }
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