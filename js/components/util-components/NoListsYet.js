var React = require('react');
var ReactNative = require('react-native');

var StyleSheet = ReactNative.StyleSheet;
var View = ReactNative.View;
var Text = ReactNative.Text;

class NoListsYet extends React.Component {

	render () {
		return (
			<View style={ styles.wrapper } >
				<Text style={ styles.text } >
					You don't have any lists. Click the top right button to start a list!
				</Text>
			</View>
		);
	}

}

const styles = StyleSheet.create({
	wrapper: {
		marginTop: 60,
		padding: 10,
	},
	text: {
		fontWeight: '200',
		fontSize: 20,
	},
});

module.exports = NoListsYet;