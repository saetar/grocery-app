import React from 'react';
var Component = React.Component;
var ReactNative = require('react-native');
var StyleSheet = ReactNative.StyleSheet;
var Text = ReactNative.Text;
var View = ReactNative.View;
var TouchableHighlight = ReactNative.TouchableHighlight;
var AsyncStorage = ReactNative.AsyncStorage;

class Boring extends Component {

  constructor(props) {
    super(props);
    this._onTouch = this._onTouch.bind(this);
    this.state = { count: 1 }
  }

  _onTouch() {
    this.setState({
      count: this.state.count + 1
    });
  }

  render() {
    return (
      <View style={ styles.welcome } >
        <Text style={styles.instructions} >
          Current Scene: { this.state.count }
        </Text>
        <TouchableHighlight
          onPress={this._onTouch} >
          <Text style={ styles.instructions } >
            Touch Me!
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    marginTop: 200,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

module.exports = Boring;