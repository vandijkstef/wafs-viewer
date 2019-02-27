class Minor {
	constructor() {
		this.students = [];
	}

	AddStudent(student) {
		this.students.push(student);
	}
}

class Person {
	constructor(data) {
		this.name = data['Student'];
	}

	SayHi() {
		console.log('Hi');
	}
}

class Student extends Person {
	constructor(data) {
		// this.name --> undefined
		super(data); // -> new Person(data)
		// this.name --> Naam bevatten
	}

	SayHi() {
		super.SayHi();
		console.log('Yo');
	}
}

class Teacher extends Person {
	constructor(data) {
		this.name = data['Student'];
	}
}

const minor = new Minor();
function init(data) {
	data.forEach((studentData) => {
		minor.AddStudent(new Student(studentData));
	})

	console.log(minor);


	// let students = [];
	// data.forEach((student) => {
	// 	students.push({
	// 		name: student['Student']
	// 	});
	// })
	// console.log(students);
}



// Minor
	// Does it actually work?
// Student
// Extends
	// Extended?

fetch('/feedback.json')
	.then((res) => {
		return res.json();
	})
	.then((data) => {
		init(data);
	});
