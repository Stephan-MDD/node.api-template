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
	console.log(`${colors.red}No argument declared`, colors.reset);
	console.log(`documentation: ${colors.blue}yarn make ${colors.cyan}--help`, colors.reset);
	process.exit();
}

const entity = argument.charAt(0).toUpperCase() + argument.slice(1).toLowerCase();

const targets = [
	{ directory: 'Controllers', templateSuffix: 'Controller', suffix: 'Controller' },
	{ directory: 'Models', templateSuffix: 'Model', suffix: '' },
	{ directory: 'Services', templateSuffix: 'Service', suffix: 'Service', option: 'importAll' },
	{ directory: 'Test', templateSuffix: 'Test', suffix: 'Service.test', option: 'ignoreIndex' },
];

console.clear();
const loader = animatedLoader();
console.log(`${colors.blue}Initiating resource creation for`, `${colors.cyan}${entity}`, colors.reset);
console.log();

(async () => {
	const fileTasks = targets.map(async ({ directory, suffix, templateSuffix, option }) => {
		try {
			const bytes = await fs.readFile(`${__dirname}/Templates/Template${templateSuffix}`);
			let data = bytes.toString();
			data = data.replace(/__target__/g, entity);
			data = data.replace(/__target_lower__/g, entity.toLowerCase());

			const filePath: string = `Src/${directory}/${entity}${suffix}.ts`;
			const indexPath: string = `Src/${directory}/Index.ts`;
			// await fs.writeFile(filePath, data);

			if (option === 'ignoreIndex') return { created: filePath };

			if (option === 'importAll') {
				const appendContent = `export * as ${entity}${suffix} from './${entity}${suffix}';`;

				// await fs.appendFile(indexPath, appendContent);
				return { created: filePath, modified: indexPath };
			}

			const appendContent = `export { default as ${entity}${suffix} } from './${entity}${suffix}';`;
			// await fs.appendFile(indexPath, appendContent);
			return { created: filePath, modified: indexPath };
		} catch (error) {
			console.log(error);
			// call clean function;
		}
	});

	const res = await Promise.all(fileTasks);
	const { created, modified } = res.reduce(
		(acc: any, cur) => {
			if (cur.created) acc.created.push(cur.created);
			if (cur.modified) acc.modified.push(cur.modified);
			return acc;
		},
		{ created: [], modified: [] }
	);

	clearInterval(loader);
	console.log(`${colors.green}Successfully Created Resources:`, colors.reset);
	created.forEach((item) => console.log(`${colors.cyan}• ${item}`, colors.reset));
	console.log();

	console.log(`${colors.green}Successfully Modified Index Files:`, colors.reset);
	modified.forEach((item) => console.log(`${colors.cyan}• ${item}`, colors.reset));
	console.log();

	console.log(`${colors.yellow}Warning:`, colors.reset);
	console.log(`${colors.reset}${entity}Service.ts will throw:`, `${colors.magenta}Error('Not Implemented')`, colors.reset);
	console.log();
})();

// remove generated files
function clean() {}
