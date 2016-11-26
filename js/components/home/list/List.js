import React from 'react';
var ReactNative = require('react-native');

var Component = React.Component;
var View = ReactNative.View;
var Text = ReactNative.Text;
var StyleSheet = ReactNative.StyleSheet;
var TouchableHighlight = ReactNative.TouchableHighlight;

var RightArrow = require('./../../util-components/RightArrow');
var DetailView = require('./detail/DetailView');

Date.prototype.customFormat = function() {
	var sec = 1000;
	var min = sec * 60;
	var hr = min * 60;
	var d = hr * 24;

	var then = this.getTime();
	var now = Date.now();

	console.log("Date here", this.toTimeString());

	if (now - then < d) {
		var hour = ((this.getHours() + this.getTimezoneOffset() / 60) % 24).toString();
		var minutes = this.getMinutes().toString();
		hour = hour.length > 1 ? hour : "0" + hour;
		minutes = minutes.length > 1 ? minutes : "0" + minutes;
		return hour + ":" + minutes;
	}

  var m = (this.getMonth() + 1).toString(); 
  var d = (this.getDate()).toString();

  var mm = m.length > 1 ? m : "0" + m;
  var dd = d.length > 1 ? d : "0" + d;

  var yy = this.getFullYear().toString().substring(2);

  return mm + "/" + dd + "/" + yy;
};

class List extends Component {

	 _handleBackPress () {
    this.props._handleBackPress();
  }

  _handleNextPress () {
    this.props._handleNextPress();
  }

  constructor (props) {
  	super(props);
  	var created = new Date(this.props.list.createDate);
  	this.state = {
  		created: created.customFormat(),
  	}
  }

	render () {
		return (
			<TouchableHighlight onPress={ () => this._handleNextPress() } >
				<View style={ styles.titleWrapper } >
					<View style={ styles.topPart } >
						<Text style={ styles.title } >
							{ this.props.list.title }
						</Text>
						<Text style={ styles.store } >
							{ this.props.list.store }
						</Text>
						<Text style={ styles.date } >
							{ this.state.created } <RightArrow />
						</Text>
					</View>
					<View style={ styles.bottomPart } >
						<Text style={ styles.text }>
							{ this.props.list.details }
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