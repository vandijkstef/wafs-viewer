// Class example
class Example {
	constructor(name) {
		// Do stuff on new
		// Implicitly returns this
		this.name = name;
	}

	// Add your functions here

	WhatIsThis() {
		return this.name;
	}
}







// Oldschool
function OldXample(name) {
	this.name = name;
}

OldXample.prototype.WhatIsThis = function() {
	return this.name;
}