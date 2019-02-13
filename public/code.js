function init(data) {
	console.log(data);
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
