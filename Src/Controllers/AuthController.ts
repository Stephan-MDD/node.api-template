/// libraries
import { Router, Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

/// modules
import { UserService } from '../Services';
import { ForbiddenError, BadRequestError } from '../Errors/ClientErrors';
import { InternalServerError } from '../Errors/ServerErrors';
import { UserDTO } from '../DTOs/User';
import { HttpCodes } from '../Enums';

/// content
const route: string = '/auth';
const router: Router = Router();

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = req.body;
	if (!email) return next(new BadRequestError('No email received'));
	if (!password) return next(new BadRequestError('No password received'));

	try {
		const userDTO: UserDTO = await UserService.getSingle(email);
		const passwordHash: string = userDTO.password;

		const passwordMatch: boolean = await bcrypt.compare(password, passwordHash);

		if (!passwordMatch) {
			return next(new ForbiddenError('Invalid Login Credentials'));
		}
	} catch (error) {
		next(error);
	}

	const accessTokenSecret: string | undefined = process.env.JWT_SECRET;

	if (!accessTokenSecret) {
		return next(new InternalServerError('No JWT Resource found'));
	}

	const token: string = jwt.sign({ email: req.body.email }, accessTokenSecret);
	res.locals.response = { token };
	res.locals.status = HttpCodes.Accepted;

	next();
});

export default { router, route };
