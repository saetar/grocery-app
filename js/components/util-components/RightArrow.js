import React from 'react';
var ReactNative = require('react-native');

var StyleSheet = ReactNative.StyleSheet;
var Image = ReactNative.Image;

var Source = require('./../../img/right-arrow.png');

class RightArrow extends React.Component {
	
	render() {
		return (
			<Image 
				source={ Source } 
				style={ styles.image } />
		);
	}
}

const styles = StyleSheet.create({
	image: {
		marginTop: 5,
		height: 15,
		width: 15,
	},
});

module.exports = RightArrow