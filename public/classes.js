// Clicking on a result will render a detailed result.
// Click on that result again will get you back to the overview
// The only global variables are the object literals that hold 
class App {
	constructor(settings) {
		console.log('App: Init', this);
		this.settings = settings;
		this.api = new API(settings.url);
		this.router = new Router(this);
		// TODO: Setup Hashchange/HistoryAPI URL listening
		// router.handle(); // Reload the current page, or the homepage if no id and data is present
	}
}

class Router {
	constructor(app) {
		this.api = app.api;
		// window.addEventListener('hashchange', this.Handle);
		this.Handle();
	}

	Handle() {
		this.Overview(); return;
		if (window.location.hash) {
			this.Detail(window.location.hash.replace('#', ''));
		} else {
			this.Overview();
		}
	}

	Overview() {		
		console.log('Routes: overviews');
		this.api.Call()
			.then(function(data) {
				console.log(data);
				const thingies = data.map((entry) => {
					return new Thingy(entry);
				})
				console.log(thingies);
				// render.overview(data);
			})
			.catch(function(error) {
				console.log(error);
			})
	}

	Detail(id) {
		console.log('Routes: detail');
		this.api.Call(id)
			.then(function(data) {
				render.detail(data);
			})
			.catch(function(error) {
				
			})
	}
}

class Thingy {
	constructor(entry) {
		this.DOM = document.createElement('a');
		this.DOM.innerText = entry.title;
		this.DOM.dataset.id = entry.id;
		this.DOM.href = `#${entry.id}`;
		document.body.appendChild(this.DOM);
	}
}

class API extends XMLHttpRequest {
	constructor(url) {
		super();
		this.url = url;
	}

	Call(id = false) {
		return new Promise((resolve, reject) => {
			let apiUrl = this.url;
			if (id !== false) {
				apiUrl += id;
			}
			this.open('GET', apiUrl);
			this.addEventListener('load', () => {
				const data = this.Parse(this.response);
				resolve(data);
			});
			this.addEventListener('error', () => {
				reject('Oops!');
			});
			this.send();
		})
	}

	Parse(stringData) {
		let data;
		try {
			data = JSON.parse(stringData);
		} catch(err) {
			return err;
		}
		return data; // This line will never be executed if we already returned an error
	}
}

const render = { // This would be your templating engine, please only loop your data. Any processing should be done in routes
	overview: function(data) {
		document.body.innerHTML = '';
		const wrapper = document.createElement('div');
		data.forEach(function(entry) {
			// Create elements, use transparency, whatever you settled for
			const item = document.createElement('a');
			item.innerText = entry.title;
			item.dataset.id = entry.id;
			item.href = `#${entry.id}`;
			// item.addEventListener('click', router.handle);
			wrapper.appendChild(item);
		})
		document.body.appendChild(wrapper);
		// window.location.reload();
	},
	detail: function(data) {
		document.body.innerHTML = '';
		const item = document.createElement('h1');
		item.innerText = data.title;
		// item.addEventListener('click', router.handle);
		document.body.appendChild(item);
		// window.location.reload();
	}
}

new App({
	url: 'https://jsonplaceholder.typicode.com/todos/'
});