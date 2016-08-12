var React = require('react');
var Component = React.Component;
var ReactNative = require('react-native');
var AppRegistry = ReactNative.AppRegistry;
var StyleSheet = ReactNative.StyleSheet;
var View = ReactNative.View;
var NavBar = require('./js/Navigation');
var Boring = require('./js/Boring');

class GroceryHelper extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavBar />
    );
  }
}

AppRegistry.registerComponent('GroceryHelper', () => GroceryHelper);
