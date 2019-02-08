const csv = require('csv-parser');
const fs = require('fs');

const dataDir = 'data';
const inFile = 'feedin';
const outFile = 'feedback';

const studentResults = [];

fs.createReadStream(`./${dataDir}/${inFile}.csv`)
	.pipe(csv())
	.on('data', (student) => {
		studentResults.push(student);
	})
	.on('end', () => {
		fs.writeFileSync(`./public/${outFile}.json`, JSON.stringify(studentResults));
	});