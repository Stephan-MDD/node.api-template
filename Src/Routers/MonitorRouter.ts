/// libraries
import { Router } from 'express';

/// modules
import { UserRoles } from '../Enums';
import { Authenticate } from '../Middleware';
import { MonitorController } from '../Controllers';

/// content
const route: string = '/monitor';
const router: Router = Router();

router.get('/', Authenticate(UserRoles.Editor), MonitorController.getAll);

export default { router, route };
