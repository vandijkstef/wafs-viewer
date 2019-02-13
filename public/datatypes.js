// const a = undefined;
const b = null;
const c = false;
const d = 42;
const e = 'some text';
const f = {
	text: 'some more text'
}

const g = () => {
	return 'even more text';
}
const h = class {};
const i = new h();

// Presentation stuff
if (typeof(document) !== 'undefined') {

	const waiters = document.querySelectorAll('.wait');
	waiters.forEach((waiter) => {
		waiter.style.display = 'none';
	});
	window.onkeyup = function(e) {
		const key = e.keyCode;
		if (key == 191) {
			const leavers = document.querySelectorAll('li:not(.wait)');
			leavers.forEach((leaver) => {
				leaver.style.display = 'none';
			})
			const waiters = document.querySelectorAll('.wait');
			let thing = 0;
			if (waiters[thing].style.display === 'list-item') {
				thing++;
			}
			waiters[thing].style.display = 'list-item';
			
		}
	}
	
} else {
	console.log(typeof(a));
}