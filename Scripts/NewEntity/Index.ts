import * as fs from 'fs';

const colors = {
	reset: '\x1b[0m', // reset
	red: '\x1b[31m', // error
	green: '\x1b[32m', // success
	yellow: '\x1b[33m', // warning
	blue: '\x1b[34m',
	magenta: '\x1b[35m',
	cyan: '\x1b[36m',
};

const argument = process.argv[2];

if (!argument) {
	console.log(colors.red, 'No argument declared', colors.reset);
	console.log(colors.magenta, 'No argument declared', colors.reset);
	process.exit();
}

console.clear();
const entity = argument.charAt(0).toUpperCase() + argument.slice(1).toLowerCase();
console.log(colors.blue, 'Initiating resource creation for', colors.cyan, entity, colors.reset);

const targets: string[] = []; //['Controller', 'Service']; //, 'Model', 'Service', 'Test'];

for (const target of targets) {
	// remove trailing 's' ! Test !

	fs.readFile(`${__dirname}/${target}Template`, (err, bytes) => {
		if (err) throw err;

		let data = bytes.toString();
		data = data.replace(/__target__/g, entity);
		data = data.replace(/__target_lower__/g, entity.toLowerCase());

		// adds Controller
		fs.writeFile(`Src/${target}s/${entity}${target}.ts`, data, (err) => {
			if (err) clean();
		});
	});

	/*
	const appendContent = `export { default as ${controllerName} } from './${controllerName}';`;
	
	fs.appendFile(`Src/${target}s/Index.ts`, appendContent, (err) => {
		if (err) clean()
		console.log('Added to Index.ts');
	});
	*/
}

function clean() {}

console.log();
console.log(colors.green, 'Successfully Created Resources:', colors.reset);
console.log(colors.cyan, `• Src/Controllers/${entity}Controller.ts`, colors.reset);
console.log(colors.cyan, `• Src/Models/${entity}.ts`, colors.reset);
console.log(colors.cyan, `• Src/Services/${entity}Service.ts`, colors.reset);
console.log(colors.cyan, `• Src/Test/${entity}Service.test.ts`, colors.reset);
console.log();

console.log(colors.yellow, `${entity}Service.ts will throw:`, colors.magenta, "Error('Not Implemented')", colors.reset);
console.log();
