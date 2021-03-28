/// libraries
import { Router, Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

/// namespaces
// import 'enums'
// import 'errors'

/// modules
import { HttpCodes } from '../enums';
import { UserService } from '../Services';
import { ForbiddenError, BadRequestError } from '../Errors/ClientErrors';
import { InternalServerError } from '../Errors/ServerErrors';
import { UserDTO } from '../DTOs/User';
import { Catcher } from '../Middleware';

/// content
const route: string = '/auth';
const router: Router = Router();

router.post(
	'/login',
	Catcher(async (req: Request, res: Response) => {
		const { email, password } = req.body;
		if (!email) throw new BadRequestError('No email received');
		if (!password) throw new BadRequestError('No password received');

		const userDTO: UserDTO = await UserService.getSingle(email);
		const passwordHash: string = userDTO.password;

		const passwordMatch: boolean = await bcrypt.compare(password, passwordHash);

		if (!passwordMatch) {
			throw new ForbiddenError('Invalid Login Credentials');
		}

		const accessTokenSecret: string | undefined = process.env.JWT_SECRET;

		if (!accessTokenSecret) {
			throw new InternalServerError('No JWT Resource found');
		}

		const token: string = jwt.sign({ email: req.body.email }, accessTokenSecret);
		res.locals.response = { token };
		res.locals.status = HttpCodes.Accepted;
	})
);

export default { router, route };
