import * as yargs from 'yargs';

export function getArgs() {
	return yargs
		.option('exclude', {
			alias: 'e',
			default: [],
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

export const colors = {
	reset: '\x1b[0m', // reset
	red: '\x1b[31m', // error
	green: '\x1b[32m', // success
	yellow: '\x1b[33m', // warning
	blue: '\x1b[34m',
	magenta: '\x1b[35m',
	cyan: '\x1b[36m',
};

export function animatedLoader() {
	const loaderElements: string[] = ['▉', '▊', '▋', '▌', '▍', '▎', '▏', '▎', '▍', '▌', '▋', '▊', '▉'];

	return setInterval(() => {
		const content: string = `\rcreating files ${colors.blue}${loaderElements.join(' ')}${colors.reset}`;
		process.stdout.write(content);

		const element: string = loaderElements.pop();
		loaderElements.unshift(element);
	}, 100);
}
