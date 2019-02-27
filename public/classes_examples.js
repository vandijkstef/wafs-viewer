class Form {
	constructor(form) {
		this.DOM = form;
		this.DOM.addEventListener('submit', this.Handle);
	}

	Handle(e) {
		e.preventDefault();
		console.log('Handling!', this);
	}
}

class APIForm extends Form {
	constructor(form) {
		super(form);

		this.DOM.APIForm = this;
		this.api = new API();
	}

	Handle(e) {
		super.Handle(e);

		this.APIForm.api.Call()
			.then((data) => {
				console.log(data);
			})
			.catch((error) => {
				console.log(error);
			})
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

const personal = new Form(document.querySelector('form#personal'));
const likes = new APIForm(document.querySelector('form#likes'));

console.log(personal, likes);