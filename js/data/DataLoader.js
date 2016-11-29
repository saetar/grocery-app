import querystring from 'querystring';
import DummyData from './dummy_data';

var DataLoader = {
	baseUrl: "http://localhost:8080",
	fbUrl: "https://graph.facebook.com/v2.8",

	headers: {
		'Content-Type': 'application/json',
	},

	requestMap: {
		grocerylist: '/grocerylist',
		user: '/user',
		items: '/items'
	},

	getDummyList () {
		return DummyData.list;
	},

	getOrAddUser (firstName, lastName, fbId, cb)	{
		var _this = this;
		this.getUser(fbId, (data) =>{
			if (data.error) {
				_this.addUser(firstName, lastName, fbId, (data) => cb(data));
			}
			else {
				cb(data);
			}
		}, (err) => {
			_this.addUser(firstName, lastName, fbId, (data) => cb(data));
		})
	},

	getUser (fbId, cb, err) {
		var url = this.makeRequestUrl('user', fbId, null);

		var options = {
			method: 'GET',
		};

		this.makeRequest(url, options,
			(responseJson) => {
				cb(responseJson);
			},
			(error) => {
				if (err) {
					err(error);
				}
				console.log(error);
			});
	},

	fetchUserLists (userId, cb) {
		// var url = this.makeRequestUrl('grocerylist', null, null);
		var url = this.baseUrl + '/user/' + userId + '/grocerylist';
		var options = {
			method: 'GET',
		};
		this.makeRequest(url, options,
			(responseJson) => {
				cb(responseJson);
			},
			(error) => {
				console.error(error);
			});
	},

	getList (listId, cb) {
		var url = this.makeRequestUrl('grocerylist', listId, null);

		var options = {
			method: 'GET',
		};

		this.makeRequest(url, options,
			(responseJson) => {
				cb(responseJson);
			},
			(error) => {
				console.error("Error getting list", error);
			});
	},

	getListItems (listId, cb) {
		var url = this.makeRequestUrl('grocerylist', listId, null);
		url += '/items';
		var options = {
			method: 'GET',
		};

		this.makeRequest(url, options,
			(responseJson) => {
				cb(responseJson);
			},
			(error) => {
				console.error("Error getting list items", error);
			});
	},

	deleteList (listId, cb) {
		var url = this.makeRequestUrl('grocerylist', listId, null);

		var options = {
			method: 'DELETE',
		};

		console.log("LOOK HERE", url, options);
		this.makeRequest(url, options,
			(responseJson) => {
				cb(responseJson);
			},
			(error) => {
				console.error("Error deleting list", error);
			});
	},

	addItemToList (listId, item, cb) {
		var url = this.makeRequestUrl('grocerylist', listId, null);
		console.log("URL", url);
		var options = {
			method: 'POST',
			body: JSON.stringify({
				price: parseFloat(item.price),
				name: item.name,
				category: item.category || "",
				listId: listId,
			}),
		};
		console.log("OPTIONS", options);
		this.makeRequest(url, options,
			(responseJson) => {
				console.log("RESPONSE JSON", responseJson);
				cb(responseJson);
			},
			(error) => {
				console.error("Error adding item to list", error);
			});
	},

	deleteItem (itemId, cb) {
		var url = this.makeRequestUrl('items', itemId, null);
		console.log("URL", url);
		var options = {
			method: 'DELETE',
		};
		this.makeRequest(url, options,
			(responseJson) => {
				cb(responseJson);
			},
			(error) => {
				console.error("Error deleting item", error);
			});
	},

	addUser (firstName, lastName, fbId, cb) {
		var url = this.makeRequestUrl('user', null, null);

		var options = {
			body: JSON.stringify({
				firstName: firstName,
				lastName: lastName,
				fbId: fbId,
			}),
			method: 'POST',
		};
		var _this = this;
		this.makeRequest(url, options,
			(responseJson) => {
				cb(responseJson);
			},
			(error) => {
				console.error(error);
			});
	},

	postGroceryList (userId, title, store, details, cb) {
		var url = this.makeRequestUrl('grocerylist', null, null);

		var options = {
			body: JSON.stringify({
				title: title,
				store: store,
				details: details,
				userId: userId,
			}),
			method: 'POST',
		}
		console.log("DATTTAAA", options.body);
		this.makeRequest(url, options,
			(responseJson) => {
				cb(responseJson);
			},
			(error) => {
				console.error(error);
			});
	},

	getFBUserInformation (fbToken, cb) {
		var url = this.makeFBRequestUrl(
			['me'],
			null,
			{
				fields: ['id','name','picture'],
				access_token: fbToken,
			}
		);
		var options = {
			method: 'GET',
		}
		this.makeRequest(url, options,
			(responseJson) => {
				cb(responseJson);
			},
			(error) => {
				console.error(error);
			});
	},

	makeFBRequestUrl (nodes, pathVariable, queryParams) {
		var url = this.fbUrl;
		for (var i = 0; i < nodes.length; i++) {
			url += '/' + nodes[i];
		}
		if (pathVariable)
			url += '/' + pathVariable
		if (queryParams) {
			url += '?';
			for (var key in queryParams) {
				if (queryParams.hasOwnProperty(key)){
					if (key == "fields") {
						url += key + '=' + this.makeFBFieldsQueryString(queryParams[key]) + '&' ;
					} else {
						url += key + '=' + queryParams[key] + '&' ;
					}
				}
			}
		}
		return url;
	},

	makeFBFieldsQueryString (fields) {
		var s = "";
		for (var i = 0; i < fields.length - 1; i++) {
			s += fields[i] + "\%2C";
		}
		s += fields[i]
		return s;
	},

	makeRequestUrl (requestName, pathVariable, queryParams) {
		var url = this.baseUrl + this.requestMap[requestName];
		if (pathVariable)
			url += '/' + pathVariable;
		if (queryParams)
			url += + '?' + querystring.stringify(queryParams);
		return url;
	},

	makeRequest (url, options, cb, err) {
		if (!options) {
			options = {
				headers: this.headers,
			}
		}
		else if (!options.headers) {
			options.headers = this.headers;
		}
		return fetch(url, options)
			.then( (response) => response.json() )
			.then( (responseJson) => cb(responseJson) )
			.catch( (error) => err(error) );
	},
}

module.exports = DataLoader;
