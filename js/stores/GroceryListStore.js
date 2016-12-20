
var GroceryListStore = {
	user: {
		credentials: {},
	},

	lists: {

	},

	loggedOut: function() {
		this.user = {
			credentials: {},
		};
		this.lists = {};
	},
}

module.exports = GroceryListStore;
