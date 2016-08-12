var React = require('react');
var ReactNative = require('react-native');
var View = ReactNative.View;
var Text = ReactNative.Text;
var StyleSheet = ReactNative.StyleSheet;

class DetailView extends React.Component {
	render() {
		return (
			<View style={ styles.wrapper } >
				<Text style={ styles.store } >
					{ this.props.store }
				</Text>
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
	store: {
		fontWeight: '100',
		fontSize: 30,
	},
});

module.exports = DetailView;