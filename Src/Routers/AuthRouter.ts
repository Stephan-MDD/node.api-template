/// libraries
import { Router } from 'express';

/// modules
import { AuthController } from '../Controllers';

/// content
const route: string = '/auth';
const router: Router = Router();

router.post('/login', AuthController.login);

export default { router, route };
