/// libraries
import { Router, Request, Response } from 'express';

/// modules
import { UserRoles } from '../Enums';
import { authenticate } from './AuthController';
import { MonitorService } from '../Services';

/// content
const route: string = '/monitor';
const router: Router = Router();

router.get('/request', authenticate(UserRoles.Editor), async (req: Request, res: Response) => {
	const { entry, exit } = req.query;

	// data format: yyyy-mm-ddThh-mm-ss (Minimized ISO Format)
	let entryDate: Date = new Date(String(entry));
	let exitDate: Date = new Date(String(exit));

	/** Query Options
	 * entry: Data -> filter from
	 * exit: Data -> filter to
	 * group: string -> [months, week, day, hours, ...] group enums
	 * sort: string -> [amount, sessions, ...] order enums
	 * order: string -> asc, desc
	 *
	 * returns array containing grouped request data
	 */

	// validates date parsing
	if (entryDate.toString() === 'Invalid Date') entryDate = null;
	if (exitDate.toString() === 'Invalid Date') exitDate = null;

	console.log('entryDate::', entryDate);
	console.log('exitDate::', exitDate);

	const { status, ...response } = await MonitorService.getRequests(entryDate, exitDate);
	res.status(status).json(response);
});

export default { router, route };
