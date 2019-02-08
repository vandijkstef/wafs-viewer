(function() {
	document.addEventListener('DOMContentLoaded', () => {
	
		const wrapper = document.createElement('div');
		fetch('/feedback.json')
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				processData(data, wrapper);
				document.body.appendChild(wrapper);
			})
	});
	
	function processData(data, target) {
		data.forEach((studentData) => {
			minor.addStudent(new Student(studentData));
			// student.RenderUpdate(target);
			// console.log(student);
		});
		minor.getStudentsBy('level', false).forEach((student) => {
			student.RenderUpdate(target);
		});
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
	
	class Student {
	
		constructor(data) {
			// TODO: I should fix the headers in parsing, the module seems to provide a way to do this, but is acting up
			this.DOM = {};
			this.name = data['Student'];
			this.level = data['Niveau'];
			this.repo = data['Repo'];
	
			if (!data['XML HTTP'] && !data['Fetch/Promise']) {
				this.apiStyle = undefined;
			} else {
				(data['XML HTTP']) ? this.apiStyle = false : this.apiStyle = true;
			}

			if (data['README']) this.writer = true;
			if (data['Async/Await']) this.async = true;
			if (data['Templ. Engine']) this.templator = true;
			if (data['Modules']) this.modular = true;
			if (data['Clean global']) this.noglobe = true;
		}
	
		RenderUpdate(target) {
			// Create wrapper if needed
			if (!this.DOM.wrapper) {
				this.DOM.wrapper = document.createElement('div');
				this.DOM.wrapper.dataset.level = this.level;
				target.appendChild(this.DOM.wrapper);
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
			(this.noglobe) ? this.DOM.wrapper.classList.add('noglobe'): this.DOM.wrapper.classList.remove('noglobe');

			// Create name if needed
			if (!this.DOM.name) {
				this.DOM.name = document.createElement('a');
				this.DOM.wrapper.appendChild(this.DOM.name);
			}
			this.DOM.name.innerText = this.name;
			this.DOM.name.href = this.repo;
		
		}

	}
})();