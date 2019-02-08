document.addEventListener('DOMContentLoaded', () => {

	const wrapper = document.createElement('div');
	console.log(minor);
	fetch('/data/feedback.json')
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
	minor.getStudentsBy('level', true).forEach((student) => {
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
const minor = new Minor();
Object.freeze(minor);

class Student {

	constructor(data) {
		// TODO: I should fix the headers in parsing, the module seems to provide a way to do this, but is acting up

		this.name = data['Student'];
		this.level = data['Niveau'];
		this.repo = data['Repo'];

		if (data['XML HTTP'] === '' && data['Fetch/Promise'] === '') {
			this.apiStyle = undefined;
		} else {
			(data['XML HTTP']) ? this.apiStyle = false : this.apiStyle = true;
		}
	}

	Render(target) {
		const wrapper = document.createElement('div');
		wrapper.dataset.level = this.level;

		if (this.apiStyle === undefined) {
			wrapper.classList.add('error');
		} else {
			if (this.apiStyle) wrapper.classList.add('confirm');
		}

		const name = document.createElement('p');
		name.innerText = this.name;
		wrapper.appendChild(name);

		


		target.appendChild(wrapper);

	}
}