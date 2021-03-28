/// libraries
import { Router } from 'express';

/// modules
import { UserRoles } from '../Enums';
import { Authenticate } from '../Middleware';
import { UserController } from '../Controllers';

/// content
const route: string = '/user';
const router: Router = Router();

// get all user
router.get('/', Authenticate(UserRoles.Editor), UserController.getAll);

// get user
router.get('/:email', Authenticate(), UserController.getSingle);

// create user
router.post('/', UserController.addSingle);

// update user
router.put('/:email', Authenticate(), UserController.updateSingle);

// delete user
router.delete('/:email', Authenticate(), UserController.deleteSingle);

export default { router, route };
