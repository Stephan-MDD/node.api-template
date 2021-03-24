import * as yargs from 'yargs';

export function getArgs() {
	return yargs
		.option('exclude', {
			alias: 'e',
			array: true,
			demand: false,
			description: 'exclude files',
		})
		.option('include', {
			alias: 'i',
			array: true,
			demand: false,
			description: 'include files',
		})
		.option('target', {
			alias: 't',
			string: true,
			demand: false,
			description: 'create test for service',
		})
		.option('override', {
			alias: 'o',
			default: false,
			boolean: true,
			demand: false,
			description: 'override existing files',
		}).argv;
}

export function animatedLoader() {
	const loaderElements: string[] = ['▉', '▊', '▋', '▌', '▍', '▎', '▏', '▎', '▍', '▌', '▋', '▊', '▉'];

	return setInterval(() => {
		const content: string = `\rcreating files \x1b[34m${loaderElements.join(' ')}\x1b[0m`;
		process.stdout.write(content);

		const element: string = loaderElements.pop();
		loaderElements.unshift(element);
	}, 100);
}

export function handleCasing(arg: string) {
	const items: string[] = arg.split('-');

	const pascalCase = items.reduce((acc: string, cur: string) => {
		const res = cur.charAt(0).toUpperCase() + cur.slice(1).toLowerCase();
		return acc + res;
	}, '');

	const camelCase = items.reduce((acc: string, cur: string, index: number) => {
		let res: string;

		if (index === 0) {
			res = cur.toLowerCase();
		} else {
			res = cur.charAt(0).toUpperCase() + cur.slice(1).toLowerCase();
		}

		return acc + res;
	}, '');

	return { pascalCase, camelCase };
}
