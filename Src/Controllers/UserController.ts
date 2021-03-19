/// libraries
import { Router, Request, Response } from 'express';

/// modules
import HttpCodes from './HttpCodes';
import UserRoles from './UserRoles';
import { authenticate, restrict } from './AuthController';

/// content
const route: string = '/user';
const router: Router = Router();

router.get('/', restrict(UserRoles.Editor), async (req: Request, res: Response) => {
	// user service -> get users
	res.send(req.body.username);
});

router.get('/:id', authenticate, async (req: Request, res: Response) => {
	// user service -> get users
	res.send(req.params.id);
});

// create user
router.post('/', authenticate, async (req: Request, res: Response) => {
	// user service -> add user
	res.status(HttpCodes.Created);
});

// update user
router.put('/:id', authenticate, async (req: Request, res: Response) => {
	// user service -> update user
	res.status(HttpCodes.NoContent);
});

// update user
router.delete('/:id', authenticate, async (req: Request, res: Response) => {
	// user service -> delete user
	res.status(HttpCodes.NoContent);
});

export default { router, route };
