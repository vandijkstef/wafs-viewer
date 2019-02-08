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
			// student.Render(target);
			// console.log(student);
		});
		minor.getStudentsBy('level', false).forEach((student) => {
			student.Render(target);
		})
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
	
		Render(target) {
			const wrapper = document.createElement('div');
			wrapper.dataset.level = this.level;
	
			if (this.apiStyle === undefined) {
				wrapper.classList.add('error');
			} else {
				if (this.apiStyle) wrapper.classList.add('confirm');
			}
			
			if (this.writer) wrapper.classList.add('writer');
			if (this.async) wrapper.classList.add('async');
			if (this.templator) wrapper.classList.add('templator');
			if (this.modular) wrapper.classList.add('modular');
			if (this.noglobe) wrapper.classList.add('noglobe');

			const name = document.createElement('a');
			name.innerText = this.name;
			name.href = this.repo;
			wrapper.appendChild(name);
	
			target.appendChild(wrapper);
		}

	}
})();