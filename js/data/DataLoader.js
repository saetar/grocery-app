var querystring = require('querystring');
var DummyData = require('./dummy_data');

var DataLoader = {
	baseUrl: "http://localhost:8080",
	fbUrl: "https://graph.facebook.com/v2.7",

	headers: {
		'Content-Type': 'application/json',
	},

	requestMap: {
		grocerylist: '/grocerylist',
		user: '/user'
	},

	getDummyList () {
		return DummyData.list;
	},

	getUser (fbId, cb) {
		var url = this.makeRequestUrl('user', fbId, null);

		var options = {
			method: 'GET',
		};

		this.makeRequest(url, options,
			(responseJson) => {
				cb(responseJson);
			},
			(error) => {
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
				console.error(error);
			});
	},

	deleteList (listId, cb) {
		var url = this.makeRequestUrl('grocerylist', listId, null);

		var options = {
			method: 'DELETE',
		};
		this.makeRequest(url, options,
			(responseJson) => {
				cb(responseJson);
			},
			(error) => {
				console.log(error);
			});
	},

	addItemToList (listId, item, cb) {
		var url = this.makeRequestUrl('grocerylist', listId, null);

		var options = {
			method: 'POST',
			body: JSON.stringify({
				price: item.price,
				name: item.name,
				category: item.category || "",
			}),
		};
		this.makeRequest(url, options,
			(responseJson) => {
				cb(responseJson);
			},
			(error) => {
				console.log(error);
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
				console.log(error);
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
		this.makeRequest(url, options,
			(responseJson) => {
				cb(responseJson);
			},
			(error) => {
				console.log(error);
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
				console.log(error);
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