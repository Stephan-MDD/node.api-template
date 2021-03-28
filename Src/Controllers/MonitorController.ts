/// libraries
import { Router, Request, Response } from 'express';

/// modules
import { HttpCodes, UserRoles } from '../Enums';
import { Authenticate, Exception } from '../Middleware';
import { MonitorService } from '../Services';

/// content
const route: string = '/monitor';
const router: Router = Router();

const getAll = Exception.catcher(async (req: Request, res: Response) => {
	const { entry, exit } = req.query;

	// data format: yyyy-mm-ddThh-mm-ss (Minimized ISO Format)
	let entryDate: Date | null = new Date(String(entry));
	let exitDate: Date | null = new Date(String(exit));

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

	const monitorDTOs /*: MonitorDTO[] */ = await MonitorService.getRequests(entryDate, exitDate);
	res.locals.response = monitorDTOs;
	res.locals.status = HttpCodes.Accepted;
});

router.get('/', Authenticate(UserRoles.Editor), getAll);

export default { router, route };
