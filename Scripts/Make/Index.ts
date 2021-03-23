import { promises as fs } from 'fs';

import { getArgs, colors, animatedLoader } from './Utilities';

const args = getArgs();
const argument: string = String(args._[0]);
const feedWidth: number = process.stdout.columns;
const feedHeight: number = process.stdout.rows;

if (argument === 'undefined') {
	console.log(`${colors.red}No argument declared`, colors.reset);
	console.log(`Documentation: ${colors.blue}yarn make ${colors.cyan}--help`, colors.reset);
	console.log();
	process.exit();
}

const entity = argument.charAt(0).toUpperCase() + argument.slice(1).toLowerCase();

const targets = [
	{ directory: 'Controllers', templateSuffix: 'Controller', suffix: 'Controller' },
	{ directory: 'Models', templateSuffix: 'Model', suffix: '' },
	{ directory: 'Services', templateSuffix: 'Service', suffix: 'Service', option: 'useDefault' },
	{ directory: 'Test', templateSuffix: 'Test', suffix: 'Service.test', option: 'ignoreIndex' },
];

console.clear();
const loader = animatedLoader();
console.log(`${colors.blue}Initiating resource creation for`, `${colors.cyan}${entity}`, colors.reset);
console.log();

(async () => {
	const fileTasks = targets.map(async ({ directory, suffix, templateSuffix, option }) => {
		const filePath: string = `Src/${directory}/${entity}${suffix}.ts`;
		const indexPath: string = `Src/${directory}/Index.ts`;

		try {
			const _bytes: Buffer = await fs.readFile(filePath);
			// return // handle exists?
		} catch (error) {
			console.log("File doesn't exist");
			// if file exist log warning with override command
		}

		try {
			const bytes = await fs.readFile(`${__dirname}/Templates/Template${templateSuffix}`);
			let data = bytes.toString();
			data = data.replace(/__target__/g, entity);
			data = data.replace(/__target_lower__/g, entity.toLowerCase());

			// await fs.writeFile(filePath, data);
		} catch (error) {
			console.log(error);
			// call clean function;
			throw error;
		}

		if (option === 'ignoreIndex') return { created: filePath };

		try {
			const method = option === 'useDefault' ? `{ default as ${entity}${suffix} }` : `* as ${entity}${suffix}`;
			// await fs.appendFile(indexPath, `export ${method} from './${entity}${suffix}';`);
			return { created: filePath, modified: indexPath };
		} catch (error) {
			console.log(error);
			// call clean function;
		}
	});

	const res = await Promise.all(fileTasks);
	const { created, modified } = res.reduce(
		(acc: any, cur: any) => {
			if (cur.created) acc.created.push(cur.created);
			if (cur.modified) acc.modified.push(cur.modified);
			return acc;
		},
		{ created: [], modified: [] }
	);

	clearInterval(loader);
	console.log(`${colors.green}Successfully Created Resources:`, colors.reset);
	created.forEach((item: string) => console.log(`${colors.cyan}• ${item}`, colors.reset));
	console.log();

	console.log(`${colors.green}Successfully Modified Index Files:`, colors.reset);
	modified.forEach((item: string) => console.log(`${colors.cyan}• ${item}`, colors.reset));
	console.log();

	console.log(`${colors.yellow}Warning:`, colors.reset);
	console.log(`${colors.reset}${entity}Service.ts will throw:`, `${colors.magenta}Error('Not Implemented')`, colors.reset);
	console.log();
})();

// remove generated files
function clean() {}
