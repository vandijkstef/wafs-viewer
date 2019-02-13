(function() {
	document.addEventListener('DOMContentLoaded', () => {
	
		const wrapper = document.createElement('div');
		fetch('/feedback.json')
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				// createFilterButtons();
				processData(data, wrapper);
				minor.getStudents().forEach((student) => {
					student.RenderUpdate();
				});
				document.body.appendChild(wrapper);
			})
	});

	function createFilterButtons() {
		const filterWrap = document.createElement('div');
		const sortButton = document.createElement('button');
		
		const writerButton = sortButton.cloneNode();
		writerButton.addEventListener('click', handleSortButton); // Sadly enough, this isn't cloned
		writerButton.innerText = 'Writer'
		writerButton.dataset.sort = writerButton.innerText.toLowerCase();
		filterWrap.appendChild(writerButton);

		document.body.appendChild(filterWrap);
	}
	
	function processData(data, target) {
		data.forEach((studentData) => {
			minor.addStudent(new Student(studentData, target));
		});
	}

	function handleSortButton() {
		const overview = this.parentElement.nextSibling;
		if (overview.dataset.sort === this.dataset.sort) {
			overview.classList.toggle('asc')
		} else {
			overview.classList.remove('asc');
			this.parentElement.nextSibling.dataset.sort = this.dataset.sort;
		}
	}
	
	class Minor {
		constructor() {
			if (!Minor.instance) {
				this.students = [];
				Minor.instance = this;
			}
	
			return Minor.instance;
		}
	
		addStudent(student){
			this.students.push(student);
		}
	
		getStudents() {
			return this.students;
		}
	
		getStudentsBy(tag, asc = true) {
			return this.students.sort((a, b) => {
				if (asc) return a[tag] - b[tag];
				return b[tag] - a[tag];
			});
		}
	
	}
	// Singleton pattern https://www.sitepoint.com/javascript-design-patterns-singleton/
	const minor = new Minor();
	Object.freeze(minor);

	class DOM {
		constructor(target) {
			this.DOM = {
				target: target
			};
		}

		UpdateDOM(content, element) {
			if (element.innerText !== content) {
				element.innerText = content;
			}
		}

		// UpdateDOMKey(key, DOM) {
		// 	if (!DOM[key]) {
		// 		console.warn(`Cannot update non-existant DOM: ${key}`);
		// 		return;
		// 	}
		// 	if (!this[key]) {
		// 		console.warn(`Key '${key}' does not exsist`)
		// 		return;
		// 	} else if (typeof(this[key]) !== 'string' && typeof(this[key]) !== 'number') {
		// 		console.warn(`Key '${key}' not valid`, typeof(key));
		// 		return;
		// 	}
		// 	if (DOM[key].innerText !== this[key]) {
		// 		DOM[key].innerText = this[key];
		// 	}
		// }
	}

	class Person extends DOM {
		constructor(data, target) {
			super(target);
			this.blob = data;
			
			this.name = data.name;
		}
	}
	
	class Student extends Person {
	
		constructor(data, target) {
			data.name = data['Student'];
			super(data, target);

			// TODO: I should fix the headers in parsing, the module seems to provide a way to do this, but is acting up
			this.level = data['Niveau'];
			this.repo = data['Repo'];
	
			if (!data['XML HTTP'] && !data['Fetch/Promise']) {
				this.apiStyle = undefined;
			} else {
				(data['XML HTTP']) ? this.apiStyle = false : this.apiStyle = true;
			}

			// () Parses the variables as being truthy or falsey and returns a boolean
			this.writer = (data['README']);
			this.async = (data['Async/Await']);
			this.templator = (data['Templ. Engine']);
			this.modular = (data['Modules']);
			this.noglobal = (data['Clean global']);
		}
	
		RenderUpdate() {
			// Create wrapper if needed
			if (!this.DOM.wrapper) {
				this.DOM.wrapper = document.createElement('div');
				this.DOM.wrapper.dataset.level = this.level;
				this.DOM.target.appendChild(this.DOM.wrapper);
			}
	
			// Decorate the wrapper
			if (this.apiStyle === undefined) {
				this.DOM.wrapper.classList.add('error');
			} else {
				if (this.apiStyle) this.DOM.wrapper.classList.add('confirm');
			}
			(this.writer) ? this.DOM.wrapper.classList.add('writer') : this.DOM.wrapper.classList.remove('writer');
			(this.async) ? this.DOM.wrapper.classList.add('async'): this.DOM.wrapper.classList.remove('async');
			(this.templator) ? this.DOM.wrapper.classList.add('templator'): this.DOM.wrapper.classList.remove('templator');
			(this.modular) ? this.DOM.wrapper.classList.add('modular'): this.DOM.wrapper.classList.remove('modular');
			(this.noglobal) ? this.DOM.wrapper.classList.add('noglobal'): this.DOM.wrapper.classList.remove('noglobal');

			// Create name if needed
			if (!this.DOM.name) {
				this.DOM.name = document.createElement('a');
				this.DOM.wrapper.appendChild(this.DOM.name);
			}
			this.UpdateDOM(this.name, this.DOM.name);
			this.DOM.name.href = this.repo;
		
		}

	}

})();