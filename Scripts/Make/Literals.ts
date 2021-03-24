export const colors = {
	reset: '\x1b[0m',
	red: '\x1b[31m',
	green: '\x1b[32m',
	yellow: '\x1b[33m',
	blue: '\x1b[34m',
	magenta: '\x1b[35m',
	cyan: '\x1b[36m',
};

export function yellow(strings: any, ...args: any) {
	const content: string = zip(strings, args);
	return colors.yellow + content + colors.reset;
}

export function red(strings: any, ...args: any) {
	const content: string = zip(strings, args);
	return colors.red + content + colors.reset;
}

export function green(strings: any, ...args: any) {
	const content: string = zip(strings, args);
	return colors.green + content + colors.reset;
}

export function cyan(strings: any, ...args: any) {
	const content: string = zip(strings, args);
	return colors.cyan + content + colors.reset;
}

export function blue(strings: any, ...args: any) {
	const content: string = zip(strings, args);
	return colors.blue + content + colors.reset;
}

export function magenta(strings: any, ...args: any) {
	const content: string = zip(strings, args);
	return colors.magenta + content + colors.reset;
}

// highest length first
function zip(strings: any, args: any) {
	if (args.length === 0) return strings.join('');
	const totalElements: number = strings.length + args.length;

	const elements: string[] = [];
	for (let i = 0; i < totalElements; i++) {
		if (i % 2 === 0) elements.push(strings[i]);
		else elements.push(args[Math.floor(i / 2)]);
	}

	return elements.join('');
}
