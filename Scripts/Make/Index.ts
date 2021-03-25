import { promises as fs } from 'fs';

import { getArgs, handleCasing, animatedLoader } from './Utilities';
import { cyan, red, green, yellow, blue, magenta } from './Literals';

const args = getArgs();

// for later loading implementation
const feedWidth: number = process.stdout.columns;
const feedHeight: number = process.stdout.rows;

if (args._[0] === undefined) {
	console.log(red`No argument declared`);
	console.log(`Documentation:`, blue`yarn make`, cyan`--help`);
	console.log();
	process.exit();
}

const target = handleCasing(String(args._[0]));

let targets = [
	{ alias: 'c', directory: 'Controllers', templateSuffix: 'Controller', suffix: 'Controller' },
	{ alias: 'm', directory: 'Entities', templateSuffix: 'Entity', suffix: '' },
	{ alias: 's', directory: 'Services', templateSuffix: 'Service', suffix: 'Service', option: 'useDefault' },
	{ alias: 't', directory: 'Test', templateSuffix: 'Test', suffix: 'Service.test', option: 'ignoreIndex' },
];

if (args.include) {
	targets = targets.filter(({ alias }) => {
		const includeArgs: any = args.include;
		return includeArgs.includes(alias);
	});
} else if (args.exclude) {
	targets = targets.filter(({ alias }) => {
		const excludeArgs: any = args.include;
		return !excludeArgs.includes(alias);
	});
}

console.clear();
const loader = animatedLoader();
console.log(blue`Initiating resource creation for`, cyan`${target.pascalCase}`);
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
				console.log(yellow`${filePath} exists`);
				console.log('Use:', cyan`[-o, --override]`, 'to override');
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
		console.log(green`Successfully Created Resources:`);
		created.forEach((item: string) => console.log(cyan`• ${item}`));
		console.log();

		console.log(green`Successfully Modified Index Files:`);
		modified.forEach((item: string) => console.log(cyan`• ${item}`));
		console.log();

		if (true /** if service is created */) {
			console.log(yellow`Warning:`);
			console.log(`${target.pascalCase}Service.ts will throw:`, magenta`Error('Not Implemented')`);
			console.log();
		}
	} else {
		console.log(red`No`, magenta`${target.pascalCase}`, red`files was created`);
		console.log();
	}
})();

// remove generated files
function clean() {}

async function createFile(target: any, templateSuffix: string) {
	try {
		const bytes = await fs.readFile(`${__dirname}/Templates/Template${templateSuffix}`);
		let data = bytes.toString();
		data = data.replace(/__PascalCase__/g, target.pascalCase);
		data = data.replace(/__camelCase__/g, target.camelCase);
		data = data.replace(/__SNAKE_CASE__/g, target.snakeCase);

		// await fs.writeFile(filePath, data);
	} catch (error) {
		console.log(error);
		// call clean function;
		throw error;
	}
}
