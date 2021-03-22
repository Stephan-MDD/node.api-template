import { promises as fs } from 'fs';
import yargs from 'yargs';

import { colors, animatedLoader } from './Utilities';

const feedWidth: number = process.stdout.columns;
const feedHeight: number = process.stdout.rows;
const argument: string = process.argv[2]; // handle with yargs

/**
 * yarn make [test, controller, service, model] || -c --create name
 * exclude -> -e --exclude [test, controller, service, model]
 * include -> -i --include [test, controller, service, model]
 * target -> -t --target serviceName (test only) -d --default (optional)
 * override -> -o --override
 * help -> -h --help
 *
 * if file exist log warning with override command
 */

if (!argument) {
	console.log(colors.red, 'No argument declared', colors.reset);
	console.log(colors.magenta, 'No argument declared', colors.reset);
	process.exit();
}

const entity = argument.charAt(0).toUpperCase() + argument.slice(1).toLowerCase();
// const targets: string[] = ['Controller', 'Service']; //, 'Model', 'Service', 'Test'];

const targets = [
	{ directory: 'Controllers', templateSuffix: 'Controller', suffix: 'Controller' },
	//{ directory: 'Models', templateSuffix: 'Model', suffix: '' },
	//{ directory: 'Services', templateSuffix: 'Service', suffix: 'Service' },
	//{ directory: 'Test', templateSuffix: 'Test', suffix: 'Service.test' },
];

console.clear();
const loader = animatedLoader();
console.log(`${colors.blue}Initiating resource creation for`, `${colors.cyan}${entity}`, colors.reset);

console.log();
console.log(`${colors.green}Successfully Created Resources:`, colors.reset);

(async () => {
	const fileTasks = targets.map(async ({ directory, suffix, templateSuffix }) => {
		try {
			const bytes = await fs.readFile(`${__dirname}/Templates/Template${templateSuffix}`);
			let data = bytes.toString();
			data = data.replace(/__target__/g, entity);
			data = data.replace(/__target_lower__/g, entity.toLowerCase());

			// adds Controller
			await fs.writeFile(`Src/${directory}/${entity}${suffix}.ts`, data);

			const appendContent = `export { default as ${entity}${suffix} } from './${entity}${suffix}';`;
			await fs.appendFile(`Src/${directory}/Index.ts`, appendContent);

			console.log(`${colors.cyan}• Src/${directory}/${entity}${suffix}.ts`, colors.reset);
		} catch (error) {
			console.log(error);
			// call clean function;
		}
	});

	await Promise.all(fileTasks);
	clearInterval(loader);

	function clean() {}

	console.log();
	console.log(`${colors.yellow}Warning:`, colors.reset);
	console.log(`${colors.reset}${entity}Service.ts will throw:`, `${colors.magenta}Error('Not Implemented')`, colors.reset);
	console.log();
})();
