import { promises as fs } from 'fs';

import { getArgs, handleCasing, colors, animatedLoader } from './Utilities';

const args = getArgs();

// for later loading implementation
const feedWidth: number = process.stdout.columns;
const feedHeight: number = process.stdout.rows;

if (args._[0] === undefined) {
	console.log(`${colors.red}No argument declared`, colors.reset);
	console.log(`Documentation: ${colors.blue}yarn make ${colors.cyan}--help`, colors.reset);
	console.log();
	process.exit();
}

const target = handleCasing(String(args._[0]));

let targets = [
	{ alias: 'c', directory: 'Controllers', templateSuffix: 'Controller', suffix: 'Controller' },
	{ alias: 'm', directory: 'Models', templateSuffix: 'Model', suffix: '' },
	{ alias: 's', directory: 'Services', templateSuffix: 'Service', suffix: 'Service', option: 'useDefault' },
	{ alias: 't', directory: 'Test', templateSuffix: 'Test', suffix: 'Service.test', option: 'ignoreIndex' },
];

if (args.include) {
	targets = targets.filter(({ alias }) => {
		return args.include.includes(alias);
	});
} else if (args.exclude) {
	targets = targets.filter(({ alias }) => {
		return !args.exclude.includes(alias);
	});
}

// console.clear();
const loader = animatedLoader();
console.log(`${colors.blue}Initiating resource creation for`, `${colors.cyan}${target.pascalCase}`, colors.reset);
console.log();

(async () => {
	const fileTasks = targets.map(async ({ directory, suffix, templateSuffix, option }) => {
		const filePath: string = `Src/${directory}/${target.pascalCase}${suffix}.ts`;
		const indexPath: string = `Src/${directory}/Index.ts`;

		// tries to load file before creating
		// if it exits a 'override' must be applied
		// if not the file is written
		try {
			await fs.readFile(filePath);

			if (args.override) {
				// override file
			} else {
				// log warning
				console.log(`${colors.yellow}${filePath} exists`, colors.reset);
				console.log(`Use:${colors.blue} [-o, --override]${colors.reset} to override`);
				console.log();
				return {};
			}
		} catch (error) {
			// write file here
		}

		await createFile(target, templateSuffix);

		if (option === 'ignoreIndex') return { created: filePath };

		// await updateIndex()

		try {
			const method = option === 'useDefault' ? `{ default as ${target.pascalCase}${suffix} }` : `* as ${target.pascalCase}${suffix}`;

			// await fs.appendFile(indexPath, `export ${method} from './${target.pascalCase}${suffix}';`);
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

	if (created.length != 0) {
		console.log(`${colors.green}Successfully Created Resources:`, colors.reset);
		created.forEach((item: string) => console.log(`${colors.cyan}• ${item}`, colors.reset));
		console.log();

		console.log(`${colors.green}Successfully Modified Index Files:`, colors.reset);
		modified.forEach((item: string) => console.log(`${colors.cyan}• ${item}`, colors.reset));
		console.log();

		if (true /** if service is created */) {
			console.log(`${colors.yellow}Warning:`, colors.reset);
			console.log(`${target.pascalCase}Service.ts will throw:`, `${colors.magenta}Error('Not Implemented')`, colors.reset);
			console.log();
		}
	} else {
		console.log(`${colors.red}No ${colors.magenta}${target.pascalCase} ${colors.red}files was created`, colors.reset);
		console.log();
	}
})();

// remove generated files
function clean() {}

async function createFile(target: any, templateSuffix: string) {
	try {
		const bytes = await fs.readFile(`${__dirname}/Templates/Template${templateSuffix}`);
		let data = bytes.toString();
		data = data.replace(/__target__/g, target.pascalCase);
		data = data.replace(/__target_lower__/g, target.camelCase);

		// await fs.writeFile(filePath, data);
	} catch (error) {
		console.log(error);
		// call clean function;
		throw error;
	}
}
