const csv = require('csv-parser');
const fs = require('fs');

const dataDir = 'data';
const inFile = 'fdbk';
const outFile = 'feedback';

const studentResults = [];

fs.createReadStream(`./${dataDir}/${inFile}.csv`)
	.pipe(csv())
	.on('data', (student) => {
		studentResults.push(student);
	})
	.on('end', () => {
		fs.writeFileSync(`./${dataDir}/${outFile}.json`, JSON.stringify(studentResults));
	});